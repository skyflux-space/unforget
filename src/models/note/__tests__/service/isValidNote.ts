import {dissoc} from 'ramda'
import {createNote, isValidNote} from '../../service'
import {Note} from '../../types'


describe('isValidNote', function () {

    it('should return false for contentless note', function () {
        const note: Note = dissoc('content', createNote())
        const valid = isValidNote(note)
        expect(valid).toBe(false)
    })

    it('should return false for empty list content', function () {
        const note: Note = {...createNote(), content: []}
        const valid = isValidNote(note)
        expect(valid).toBe(false)
    })

    it('should return false for empty string content', function () {
        const note: Note = {...createNote(), content: ''}
        const valid = isValidNote(note)
        expect(valid).toBe(false)
    })

    it('should return false for blank string content', function () {
        const note: Note = {...createNote(), content: '      '}
        const valid = isValidNote(note)
        expect(valid).toBe(false)
    })

    it('should return false for note with undefined pinned prop', function () {
        const note: Note = dissoc('pinned', createNote())
        const valid = isValidNote(note)
        expect(valid).toBe(false)
    })

    test.each([
        [{...createNote(), content: '1'}],
        [{...createNote(), content: [{text: '1', checked: false, index: 0}]}],
        [{...createNote(), content: [{text: '1', checked: true, index: 0}]}],
        [{
            ...createNote(), content: [
                {text: '1', checked: true, index: 0},
                {text: '', checked: true, index: 1},
                {text: '', checked: true, index: 2},
            ]
        }],
    ])('should return true for notes with valid content', function (note: Note) {
        const valid = isValidNote(note)
        expect(valid).toBe(true)
    })

})