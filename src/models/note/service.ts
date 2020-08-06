import {
    addIndex,
    allPass,
    always,
    any,
    anyPass,
    append,
    applySpec,
    assoc,
    both,
    complement,
    cond,
    converge,
    defaultTo,
    dissoc,
    eqProps,
    equals,
    evolve,
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
    nAry,
    nthArg,
    of,
    pipe,
    prop,
    propEq,
    propIs,
    propOr,
    propSatisfies,
    reject,
    split,
    T,
    trim,
    tryCatch,
    unary,
    useWith,
    when,
    where,
} from 'ramda'
import {v4} from 'uuid'
import {Curried} from '../../utils/Curried'
import {getItem, setItem} from '../../utils/localStorage'
import {
    Content,
    ContentList,
    ContentListItem,
    ContentType,
    Identifiable,
    ListNote,
    MassMutator,
    Note,
    SingleMutator,
    ValidNote,
} from './types'


export const isIdentifiable: (value: any) => value is Identifiable = (
    both(
        is(Object),
        where({id: complement(isNil)})
    )
) as (value: any) => value is Identifiable


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
        pipe(trim, complement(isEmpty)),
    ])
)


export const isValidNote: (note: Note) => note is ValidNote = (
    allPass([
        propIs(Boolean, 'pinned'),
        pipe(
            propOr('', 'content'),
            anyPass([isValidContentList, isValidContentText]),
        )
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
            always(identity)
        ]),
        identity,
    ])
)

export const replaceNote: SingleMutator = useWith(replaceAll, [of, identity])


export const removeNoteById: Curried<string, Note[]> = useWith(reject, [propEq('id'), identity])


export const removeNotes: MassMutator = useWith(reject, [flip(includes), identity])


export const removeNote: SingleMutator = useWith(removeNotes, [of, identity])


export const getContentType: (content?: Content) => ContentType | undefined = (
    cond([
        [is(String), always(ContentType.String)],
        [is(Array), always(ContentType.List)],
        [T, always(undefined)]
    ])
)


export const isListNote: (note: Note) => note is ListNote = (
    pipe(
        propOr([], 'content'),
        getContentType,
        both(complement(isNil), equals(ContentType.List))
    )
) as (note: Note) => note is ListNote


export const serializeNotes: (notes?: Note[]) => string = (
    pipe(
        defaultTo([]),
        map((when as <T, G extends T, H>(pred: (v: T) => v is G, fn: (v: G) => H) => (v: T) => T | H)(
            isListNote,
            evolve({content: map(dissoc('index'))})
        )),
        JSON.stringify,
    )
)


export const deserializeNotes: (str?: string) => Note[] = (
    pipe(
        tryCatch(JSON.parse, always([])),
        when(complement(is(Array)), always([])),
        filter(isIdentifiable),
        map((when as <T, G extends T, H>(pred: (v: T) => v is G, fn: (v: G) => H) => (v: T) => T | H)(
            isListNote,
            evolve({content: addIndex(map)(flip(assoc('index'))) as (list: ContentList) => ContentList}),
        )),
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
        addIndex<string, ContentListItem>(map)(applySpec({
            text: nthArg(0),
            index: nthArg(1),
            checked: F,
        })),
    )
)


export const pin: (note: Note) => Note = assoc('pinned', true)


export const pinAll: MassMutator = useWith(replaceAll, [map(pin), identity])


export const unpin: (note: Note) => Note = assoc('pinned', false)


export const unpinAll: MassMutator = useWith(replaceAll, [map(unpin), identity])