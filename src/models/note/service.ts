import {append, filter, find, map} from 'ramda'
import {v4} from 'uuid'
import {ContentList, Identifiable, Note, ValidNote} from './types'


export const isIdentifiable = (value: any): value is Identifiable => value.id !== undefined


export const isValidNote = (note: Note): note is ValidNote => (
    !!note.content
    && note.content !== ''
    && (
        !Array.isArray(note.content)
        || (
            !!note.content.length
            && note.content.some(({text}) => !!text)
        )
    )
)


export const filterValidNotes
    : (list: Note[]) => ValidNote[]
    = filter(isValidNote) as (list: Note[]) => ValidNote[]

export const getNote
    : (id: string) => (notes: Note[]) => Note | undefined
    = id => find(note => note.id === id)


export const createNote
    : () => Note
    = () => ({id: v4()})


export const addNote
    : (note: Note) => (notes: Note[]) => Note[]
    = note => append(note)


export const replaceNote
    : (note: Note) => (notes: Note[]) => Note[]
    = note => map(e => e.id === note.id ? note : e)


export const removeNote
    : (id: string) => (notes: Note[]) => Note[]
    = id => filter((note: Note) => note.id !== id)


export const saveNotes
    : (notes: Note[]) => void
    = notes => localStorage.setItem('notes', JSON.stringify(filterValidNotes(notes)))


export const restoreNotes: () => Note[] = () => {
    const data = localStorage.getItem('notes')
    return data ? JSON.parse(data) : []
}


export const convertContentToString = (arr: ContentList) => arr.map(e => e.text).join('\n')


export const convertContentToList = (text?: string): ContentList => (text || '')
    .split('\n')
    .filter(text => !!text)
    .map(text => ({text, checked: false}))