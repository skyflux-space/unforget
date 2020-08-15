import {atom} from 'recoil'
import {Note} from './types'


export const notes = atom<Note[]>({
    key: 'notes',
    default: [],
})