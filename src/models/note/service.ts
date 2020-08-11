import {
    allPass,
    always,
    any,
    append,
    applySpec,
    assoc,
    both,
    complement,
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
    isNil,
    map,
    nAry,
    of,
    pipe,
    prop,
    propEq,
    propIs,
    propSatisfies,
    reject,
    tryCatch,
    unary,
    useWith,
    when,
} from 'ramda'
import {v4} from 'uuid'
import {Curried} from '../../utils/Curried'
import {getItem, setItem} from '../../utils/localStorage'
import {Identifiable, ListNote, MassMutator, Note, SingleMutator, ValidNote} from './types'
import {isListContent, isValidContent} from '../content'


export const isIdentifiable: (value: any) => value is Identifiable = (
    both(
        is(Object),
        propSatisfies(complement(isNil), 'id'),
    )
) as (value: any) => value is Identifiable


export const isValidNote: (note: Note) => note is ValidNote = (
    allPass([
        propIs(Boolean, 'pinned'),
        pipe(
            prop('content'),
            isValidContent,
        ),
    ])
) as (note: Note) => note is ValidNote


export const filterValidNotes: (list: Note[]) => ValidNote[] = (
    filter(isValidNote)
) as (list: Note[]) => ValidNote[]


export const getNote: Curried<string, Note[], Note | undefined> = useWith(find, [propEq('id'), identity])


export const createNote: () => Note = (
    applySpec({
        id: nAry(0, v4),
        pinned: F,
    })
) as () => Note


export const addNote: SingleMutator = append


export const replaceAll: MassMutator = (
    useWith(map, [
        converge(ifElse, [
            unary(useWith(flip(any), [identity, eqProps('id')])),
            unary(useWith(flip(find), [identity, eqProps('id')])),
            always(identity),
        ]),
        identity,
    ])
)

export const replaceNote: SingleMutator = useWith(replaceAll, [of, identity])


export const removeNoteById: Curried<string, Note[]> = useWith(reject, [propEq('id'), identity])


export const removeNotes: MassMutator = useWith(reject, [flip(includes), identity])


export const removeNote: SingleMutator = useWith(removeNotes, [of, identity])


export const isListNote: (note: Note) => note is ListNote = (
    propSatisfies(isListContent, 'content')
) as (note: Note) => note is ListNote


export const serializeNotes: (notes?: Note[]) => string = (
    pipe(
        defaultTo([]),
        JSON.stringify,
    )
)


export const deserializeNotes: (str?: string) => Note[] = (
    pipe(
        tryCatch(JSON.parse, always([])),
        when(complement(is(Array)), always([])),
        filter(isIdentifiable),
    )
)


export const saveNotes: (notes: Note[]) => void = (
    pipe(
        filterValidNotes,
        serializeNotes,
        setItem('notes'),
    )
)


export const restoreNotes: () => Note[] = (
    pipe(
        always('notes'),
        getItem,
        deserializeNotes,
        filterValidNotes,
    )
)

export const pin: (note: Note) => Note = assoc('pinned', true)


export const pinAll: MassMutator = useWith(replaceAll, [map(pin), identity])


export const unpin: (note: Note) => Note = assoc('pinned', false)


export const unpinAll: MassMutator = useWith(replaceAll, [map(unpin), identity])