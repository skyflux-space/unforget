import {always, append, cond, eqProps, filter, find, identity, ifElse, isNil, map, reject, T, whereEq} from 'ramda'
import {v4} from 'uuid'
import {ContentList, ContentType, Identifiable, Note, ValidNote} from './types'


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
    = id => find(whereEq({id}))


export const createNote
    : () => Note
    = () => ({id: v4()})


interface AddNote {
    (note: Note): (notes: Note[]) => Note[]

    (note: Note, notes: Note[]): Note[]
}

export const addNote: AddNote = append


export const replaceNote
    : (note: Note) => (notes: Note[]) => Note[]
    = note => map(ifElse(eqProps('id', note), always(note), identity))


export const removeNote
    : (id: string) => (notes: Note[]) => Note[]
    = id => reject(whereEq({id}))


export const saveNotes
    : (notes: Note[]) => void
    = notes => localStorage.setItem('notes', JSON.stringify(filterValidNotes(notes)))


export const restoreNotes
    : () => Note[]
    = () => ifElse(isNil, always([]), JSON.parse)(localStorage.getItem('notes'))


export const convertContentToString = (arr: ContentList) => arr.map(e => e.text).join('\n')


export const convertContentToList = (text?: string): ContentList => (text || '')
    .split('\n')
    .filter(text => !!text)
    .map(text => ({text, checked: false}))


export const getContentType
    : (content?: string | ContentList) => ContentType | undefined
    = cond([
    [isNil, always(undefined)],
    [Array.isArray, always(ContentType.List)],
    [T, always(ContentType.String)]
])