import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'

import { IUser } from '@/shared/types/user.types'

export interface IUserEditInput extends Omit<IUser, '_id' | 'createdAt'> {}
