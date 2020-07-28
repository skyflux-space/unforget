import {bind, curry} from 'ramda'


export interface SetItem {
    (key: string): (value: string) => void

    (key: string, value: string): void
}

export const setItem: SetItem
    = curry(bind(localStorage.setItem, localStorage))


export interface GetItem {
    (key: string): string
}

export const getItem: GetItem
    = bind(localStorage.getItem, localStorage)
