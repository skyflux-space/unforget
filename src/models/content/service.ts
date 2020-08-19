import {
    addIndex,
    all,
    allPass,
    always,
    any,
    anyPass,
    append,
    apply,
    applySpec,
    assoc,
    binary,
    both,
    complement,
    cond,
    converge,
    defaultTo,
    equals,
    F,
    filter,
    flip,
    identity,
    ifElse,
    inc,
    is,
    isEmpty,
    isNil,
    join,
    map,
    nthArg,
    partition,
    pipe,
    prop,
    propSatisfies,
    reject,
    sort,
    sortBy,
    split,
    T,
    trim,
    useWith, when,
} from 'ramda'
import {Content, ContentList, ContentListItem, ContentType} from './types'
import {Curried} from '../../utils/Curried'


export const isListContent: (v?: any) => v is ContentList = is(Array) as (v?: any) => v is ContentList

export const isTextContent: (v?: any) => v is string = is(String) as (v?: any) => v is string

export const isValidListContent: (content?: Content) => boolean = (
    allPass([
        isListContent,
        complement(isEmpty),
        any(propSatisfies(both(complement(isNil), complement(isEmpty)), 'text')),
        all(propSatisfies(anyPass([is(Number), is(String)]), 'index')),
    ])
)

export const isValidTextContent: (content?: Content) => boolean = (
    allPass([
        isTextContent,
        pipe(trim, complement(isEmpty)),
    ])
)

export const isValidContent: (content?: Content) => boolean = anyPass([
    isValidListContent,
    isValidTextContent,
])

export const getContentType: (content?: Content) => ContentType | undefined = cond([
    [isTextContent, always(ContentType.String)],
    [isListContent, always(ContentType.List)],
])

export const addIndexesToContentList: (list: Omit<ContentListItem, 'index'>[]) => ContentList = (
    addIndex(map)(flip(assoc('index')))
) as (list: Omit<ContentListItem, 'index'>[]) => ContentList

export const sortListByChecked: <Type extends ContentListItem>(list: Type[]) => Type[] = (
    sort(cond([
        [(a, b) => a.checked && !b.checked, always(1)],
        [(a, b) => !a.checked && b.checked, always(-1)],
        [T, (a, b) => a.index - b.index],
    ]))
)

export const sortListByIndexes: (list: ContentList) => ContentList = (
    sortBy(pipe(prop('index'), Number))
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
            text: nthArg(0),
            checked: F,
        })),
        addIndexesToContentList,
    )
)

export const isOfType: Curried<ContentType, Content, boolean> = (
    useWith(equals, [identity, getContentType])
)

export const convertTo: Curried<ContentType, Content, Content> = (
    ifElse(
        complement(isOfType),
        cond([
            [pipe(nthArg(0), equals(ContentType.String)), pipe(nthArg(1), convertContentToString)],
            [pipe(nthArg(0), equals(ContentType.List)), pipe(nthArg(1), convertContentToList)],
            [T, nthArg(1)],
        ]),
        nthArg(1),
    )
)

export const filterEmptyItems: (content: ContentList) => ContentList = (
    filter<ContentListItem, 'array'>(pipe(
        prop('text'),
        complement(isEmpty),
    ))
)

export const partitionByChecked: (list: ContentList) => [ContentList, ContentList] = partition(prop('checked'))

export const getMaxIndex: (list: ContentList) => number | undefined = pipe(
    map<ContentListItem, number>(pipe(prop('index'), Number)),
    apply(Math.max),
    when(equals(-Infinity), always(undefined)),
)

export const addItem: Curried<string, ContentList, ContentList> = (
    converge(
        append,
        [
            applySpec({
                text: nthArg(0) as (...args: any) => string,
                checked: F,
                index: pipe(
                    nthArg(1),
                    getMaxIndex,
                    ifElse(isNil, always(0), inc),
                ),
            }),
            binary(nthArg(1)),
        ],
    )
)