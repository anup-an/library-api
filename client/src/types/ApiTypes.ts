import _ from "lodash"

export type Nullable<T> = T | null

export type Success<T> = {
    data: T,
    type: 'success'
}

export type Failure<E> = {
    type: 'failure'
    error: E
}

export type Loading = {
    type: 'loading'
}

export type Unrequested = {type : 'unrequested'}

export const unrequested: Unrequested = { type: 'unrequested' }


export const success = <T>(data: T): Success<T> => ({ type: 'success', data })

export const loading: Loading = { type: 'loading' }

export const failure = <T, E>(error: E): Failure<E> => ({
  type: 'failure',
  error,
})


export type ApiData<T, E> = Success<T> | Failure<E> | Loading | Unrequested

export const isSuccess = <T, E>(data: ApiData<T, E>): boolean => data.type === 'success'

export const isLoading = <T, E>(data: ApiData<T, E>): boolean => data.type === 'loading'

export const isFailure = <T, E>(data: ApiData<T, E>): boolean => data.type === 'failure'

export const extractDataOrNull = <T, E>(data: ApiData<T, E>) => isSuccess(data) ? (data as Success<T>).data : null

export const pickDataOrDefault = <T, E, K>(data: ApiData<T, E>, prop: keyof T, defaultValue: K): K => isSuccess(data) ? (_.get((data as Success<T>).data, prop)) : defaultValue
