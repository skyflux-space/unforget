import React, {PropsWithChildren} from 'react'
import {RecoilRoot, RecoilRootProps} from 'recoil'
import {act, renderHook} from '@testing-library/react-hooks'
import {map, pipe, prop, propEq, reject} from 'ramda'
import {v4} from 'uuid'
import {useNoteContent} from '../useNoteContent'
import {createNote, ListNote, Note, notes as notesAtom} from '../../note'
import {Content, ContentList, ContentType} from '../types'
import {convertContentToList, convertContentToString, getContentType} from '../service'

const noteWithoutContent = {...createNote(), content: undefined, id: 'noteWithoutContent'}
const noteWithTextContent = {...createNote(), content: v4(), id: 'noteWithTextContent'}
const noteWithListContent: ListNote = {
    ...createNote(), id: 'noteWithListContent', pinned: false, content: [
        {index: 0, checked: false, text: '0'},
        {index: 4, checked: true, text: '4'},
        {index: 2, checked: true, text: '2'},
        {index: 1, checked: true, text: '1'},
        {index: 3, checked: true, text: '3'},
    ],
}
const noteWithEmptyItems = {
    ...createNote(), content: [
        {text: '', checked: false, index: 0},
        {text: '', checked: true, index: 1},
        {text: '123', checked: false, index: 2},
    ],
}

const notes: Note[] = [
    {...createNote(), content: '1'},
    noteWithoutContent,
    {...createNote(), content: '2'},
    noteWithTextContent,
    {...createNote(), content: '3'},
    noteWithListContent,
    noteWithEmptyItems,
]

const wrapper: React.FC<PropsWithChildren<RecoilRootProps>> = ({children}) => (
    <RecoilRoot initializeState={({set}) => set(notesAtom, notes)}>
        {children}
    </RecoilRoot>
)

describe('useNoteContent', function () {

    it('should work with note and it\'s id the same way', function () {
        const {result: withId} = renderHook(() => useNoteContent(noteWithTextContent.id), {wrapper})
        const {result: withNote} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})

        expect(withId.current.content).toBe(withNote.current.content)
    })

    test.each([
        noteWithTextContent,
        noteWithTextContent,
    ])('should return content', function (note: Note) {
        const {result} = renderHook(() => useNoteContent(note.id), {wrapper})

        expect(result.current.content).toBe(note.content)
    })

})

describe('useNoteContent.updateContent', function () {

    it('should update content with new content value', function () {
        const {result} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})
        const newContent: Content = []
        act(() => result.current.updateContent(newContent))
        expect(result.current.content).toStrictEqual(newContent)
    })

    it('should update content with updater function', function () {
        const {result} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})
        const identifier = v4()
        act(() => result.current.updateContent(content => (content as string).concat(identifier)))
        expect(result.current.content).toBe(noteWithTextContent.content.concat(identifier))
    })

    it('should pass empty string to updater when content is undefined', function () {
        let called: Content | undefined = undefined
        const updater = (content: Content) => called = content
        const {result} = renderHook(() => useNoteContent(noteWithoutContent), {wrapper})
        act(() => result.current.updateContent(updater))
        expect(called).toBe('')
    })

})

describe('useNoteContent.convert', function () {

    it('should convert list to string', function () {
        const {result} = renderHook(() => useNoteContent(noteWithListContent), {wrapper})
        const str = convertContentToString(result.current.content as ContentList)
        act(() => result.current.convert(ContentType.String))
        expect(result.current.content).toBe(str)
    })

    it('should convert string to list', function () {
        const {result} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})
        const list = convertContentToList(result.current.content as string)
        act(() => result.current.convert(ContentType.List))
        expect(result.current.content).toEqual(list)
    })

    test.each([
        noteWithTextContent,
        noteWithListContent,
    ])('should not convert to the same type', function (note: Note) {
        const {result} = renderHook(() => useNoteContent(note), {wrapper})
        act(() => result.current.convert(getContentType(note.content)!))
        expect(result.current.content).toBe(note.content)
    })

})

describe('useNoteContent.filterEmptyListItems', function () {

    it('should filter list content empty items', function () {
        const {result} = renderHook(() => useNoteContent(noteWithEmptyItems), {wrapper})
        act(() => result.current.filterEmptyListItems())
        expect(result.current.content).toEqual([{text: '123', checked: false, index: 2}])
    })

    it('should do anything if content is not list', function () {
        const {result} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})
        act(() => result.current.filterEmptyListItems())
        expect(result.current.content).toBe(noteWithTextContent.content)
    })

})

describe('useNoteContent.removeListItem', function () {

    it('should remove list item by index', function () {
        const {result} = renderHook(() => useNoteContent(noteWithListContent), {wrapper})
        act(() => result.current.removeListItem(3))
        expect(result.current.content).toEqual(reject(propEq('index', 3), noteWithListContent.content))
    })

    it('should do anything if content is not list', function () {
        const {result} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})
        act(() => result.current.removeListItem(0))
        expect(result.current.content).toBe(noteWithTextContent.content)
    })

})

describe('useNoteContent.addItem', function () {

    it('should add item with specified text', function () {
        const {result} = renderHook(() => useNoteContent(noteWithListContent), {wrapper})
        const text = v4()
        act(() => result.current.addItemToList(text))
        expect(result.current.content).toContainEqual(expect.objectContaining({text}))
    })

    it('should add index', function () {
        const {result} = renderHook(() => useNoteContent(noteWithListContent), {wrapper})
        act(() => result.current.addItemToList('123'))
        const indexes = map(pipe(prop('index'), Number), result.current.content as ContentList)
        const uniqueIndexes = new Set(indexes)
        expect(indexes.length).toBe(uniqueIndexes.size)
    })

    it('should do anything if content is not list', function () {
        const {result} = renderHook(() => useNoteContent(noteWithTextContent), {wrapper})
        act(() => result.current.addItemToList('123'))
        expect(result.current.content).toBe(noteWithTextContent.content)
    })

})