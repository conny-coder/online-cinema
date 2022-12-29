import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'

import { IActor } from '@/shared/types/movie.types'

export interface IActorEditInput extends Omit<IActor, '_id'> {}
