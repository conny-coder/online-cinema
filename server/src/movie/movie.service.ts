import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateMovieDto } from './update-movie.dto'
import { MovieModel } from './movie.model'
import { Types } from 'mongoose'
import { TelegramService } from 'src/telegram/telegram.service'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
		private readonly telegramService: TelegramService
	) {}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [{ title: new RegExp(searchTerm, 'i') }],
			}

		return this.MovieModel.find(options)
			.select('-updateAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('actors genres parameters.country')
			.exec()
	}

	async bySlug(slug: string) {
		const doc = await this.MovieModel.findOne({ slug })
			.populate('actors genres parameters.country')
			.exec()
		if (!doc) throw new NotFoundException('Movie not found')
		return doc
	}

	async byActor(actorId: Types.ObjectId) {
		const docs = await this.MovieModel.find({ actors: actorId }).exec()
		if (!docs.length) throw new NotFoundException('Movies not found')
		return docs
	}

	async byGenres(genreIds: Types.ObjectId[]) {
		const docs = await this.MovieModel.find({
			genres: { $in: genreIds },
		}).exec()
		if (!docs) throw new NotFoundException('Movies not found')
		return docs
	}

	async getMostPopular() {
		return this.MovieModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres parameters.country')
			.exec()
	}

	async updateCountOpened(slug: string) {
		const updateDoc = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{ $inc: { countOpened: 1 } },
			{ new: true }
		).exec()
		if (!updateDoc) throw new NotFoundException('movie not found')

		return updateDoc
	}

	async byId(_id: string) {
		const movie = await this.MovieModel.findById(_id)

		if (!movie) throw new NotFoundException('movie not found')

		return movie
	}

	async updateRating(id: Types.ObjectId, newRating: number) {
		return this.MovieModel.findByIdAndUpdate(
			id,
			{
				rating: newRating,
			},
			{ new: true }
		).exec()
	}

	async create() {
		const defaultValue: UpdateMovieDto = {
			bigPoster: '',
			slug: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			videoUrl: '',
		}
		const movie = await this.MovieModel.create(defaultValue)
		return movie._id
	}
	async update(_id: string, dto: UpdateMovieDto) {
		// if (!dto.isSendTelegram) {
		// 	await this.sendNotification(dto)
		// 	dto.isSendTelegram = true
		// }

		const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('movie not found')

		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) throw new NotFoundException('movie not found')

		return deleteDoc
	}

	async sendNotification(dto: UpdateMovieDto) {
		await this.telegramService.sendPhoto(
			'https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg'
		)

		const msg = `<b>${dto.title}</b>`

		await this.telegramService.sendMessage(msg, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://okko.tv/movie/free-guy',
							text: 'Go to watch',
						},
					],
				],
			},
		})
	}
}
