import {
    __,
    allPass,
    always,
    any,
    anyPass,
    append,
    assoc,
    both,
    complement,
    cond,
    curryN,
    defaultTo,
    eqProps,
    filter,
    find,
    identity,
    ifElse,
    includes,
    is,
    isEmpty,
    isNil,
    join,
    map,
    o,
    objOf,
    pipe,
    prop,
    propOr,
    propSatisfies,
    reject,
    split,
    T,
    whereEq
} from 'ramda'
import {v4} from 'uuid'
import {Content, ContentList, ContentType, Identifiable, Note, ValidNote} from './types'


export const isIdentifiable = (value: any): value is Identifiable => value.id !== undefined


export const isValidContentList
    : (content?: Content) => boolean
    = allPass([
    is(Array),
    complement(isEmpty),
    any(propSatisfies(both(complement(isNil), complement(isEmpty)), 'text')),
])


export const isValidContentText
    : (content?: Content) => boolean
    = allPass([
    is(String),
    complement(isEmpty),
])


export const isValidNote
    : (note: Note) => note is ValidNote
    = pipe(
    propOr('', 'content'),
    anyPass([isValidContentList, isValidContentText]),
) as (note: Note) => note is ValidNote


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


interface RemoveNotes {
    (notes: Note[]): (allNotes: Note[]) => Note[]

    (notes: Note[], allNotes: Note[]): Note[]
}

export const removeNotes
    : RemoveNotes
    = curryN(2, (notes: Note[], allNotes: Note[]) => reject(includes(__, notes), allNotes))


export const saveNotes
    : (notes: Note[]) => void
    = notes => localStorage.setItem('notes', JSON.stringify(filterValidNotes(notes)))


export const restoreNotes
    : () => Note[]
    = () => ifElse(isNil, always([]), JSON.parse)(localStorage.getItem('notes'))


export const convertContentToString
    : (list: ContentList) => string
    = o(join('\n'), map(prop('text')))


export const convertContentToList
    : (text: string) => ContentList
    = pipe(
    defaultTo(''),
    split('\n'),
    filter(complement(isEmpty)),
    map(pipe(
        objOf('text'),
        assoc('checked', false),
    )),
)


export const getContentType
    : (content?: string | ContentList) => ContentType | undefined
    = cond(
    [
        [is(String), always(ContentType.String)],
        [is(Array), always(ContentType.List)],
        [T, always(undefined)]
    ]
)