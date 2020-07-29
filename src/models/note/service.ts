import {
    allPass,
    always,
    any,
    anyPass,
    append,
    apply,
    applySpec,
    both,
    complement,
    cond,
    converge,
    defaultTo,
    eqProps,
    F,
    filter,
    find,
    flip,
    identity,
    ifElse,
    includes,
    is,
    isEmpty,
    isNil,
    join,
    map,
    objOf,
    pair,
    partial,
    pipe,
    Placeholder,
    prop,
    propEq,
    propOr,
    propSatisfies,
    reject,
    split,
    T,
    trim,
    unary,
    useWith,
    where
} from 'ramda'
import {v4} from 'uuid'
import {Content, ContentList, ContentType, Identifiable, Note, ValidNote} from './types'
import {getItem, setItem} from '../../utils/localStorage'


export interface IsIdentifiable {
    (value: any): value is Identifiable
}

export const isIdentifiable: IsIdentifiable = (
    both(
        is(Object),
        where({id: complement(isNil)})
    )
) as IsIdentifiable


export const isValidContentList: (content?: Content) => boolean = (
    allPass([
        is(Array),
        complement(isEmpty),
        any(propSatisfies(both(complement(isNil), complement(isEmpty)), 'text')),
    ])
)


export const isValidContentText: (content?: Content) => boolean = (
    allPass([
        is(String),
        complement(isEmpty),
    ])
)


export const isValidNote: (note: Note) => note is ValidNote = (
    pipe(
        propOr('', 'content'),
        anyPass([isValidContentList, isValidContentText]),
    )
) as (note: Note) => note is ValidNote


export const filterValidNotes: (list: Note[]) => ValidNote[] = (
    filter(isValidNote) as (list: Note[]) => ValidNote[]
)


export interface GetNote {
    (id: string): (notes: Note[]) => Note | undefined
    (id: string, notes: Note[]): Note | undefined
    (id: Placeholder, notes: Note[]): (id: string) => Note | undefined
}

export const getNote: GetNote = (
    useWith(find, [propEq('id'), identity])
)


export const createNote: () => Note = (
    pipe(v4, objOf('id'))
) as () => Note


export interface AddNote {
    (note: Note): (notes: Note[]) => Note[]
    <T = Note>(note: Placeholder, notes: T[]): (note: T) => T[]
    (note: Note, notes: Note[]): Note[]
}

export const addNote: AddNote = append


export interface ReplaceNote {
    (note: Note): (notes: Note[]) => Note[]
    (note: Note, notes: Note[]): Note[]
    (note: Placeholder, notes: Note[]): (note: Note) => Note[]
}

export const replaceNote: ReplaceNote = (
    useWith(map, [
        pipe(
            converge(pair, [unary(eqProps('id')), always]),
            append(identity),
            apply(ifElse),
        ),
        identity,
    ])
)


export interface RemoveNoteById {
    (id: string): (notes: Note[]) => Note[]
    (id: string, notes: Note[]): Note[]
    (id: Placeholder, notes: Note[]): (id: string) => Note[]
}

export const removeNoteById: RemoveNoteById = (
    useWith(reject, [propEq('id'), identity])
)


export interface RemoveNotes {
    (notes: Note[]): (allNotes: Note[]) => Note[]
    (notes: Note[], allNotes: Note[]): Note[]
    (notes: Placeholder, allNotes: Note[]): (notes: Note[]) => Note[]
}

export const removeNotes: RemoveNotes = (
    useWith(reject, [flip(includes), identity])
)


export const saveNotes: (notes: Note[]) => void = (
    pipe(
        filterValidNotes,
        JSON.stringify,
        setItem('notes')
    )
)


export const restoreNotes: () => Note[] = (
    pipe(
        partial<void>(getItem, ['notes']),
        ifElse(isNil, always([]), JSON.parse)
    )
)

export const convertContentToString: (list: ContentList) => string = (
    pipe(
        map(prop('text')),
        reject(isEmpty),
        join('\n'),
    )
)


export const convertContentToList: (text?: string) => ContentList = (
    pipe(
        defaultTo(''),
        split('\n'),
        map(trim),
        reject(isEmpty),
        map(applySpec({
            text: identity,
            checked: F,
        })),
    )
)


export const getContentType: (content?: string | ContentList) => ContentType | undefined = (
    cond([
        [is(String), always(ContentType.String)],
        [is(Array), always(ContentType.List)],
        [T, always(undefined)]
    ])
)