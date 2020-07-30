import {__} from 'ramda'
import {createNote, removeNotes} from '../../service'


describe('removeNotes', function () {
    const notesToRemove = [createNote(), createNote(), createNote()]
    const restNotes = [createNote(), createNote(), createNote(), createNote()]
    const notes = [
        ...notesToRemove,
        ...restNotes,
    ]

    it('should remove given notes', function () {
        const newNotes = removeNotes(notesToRemove, notes)
        expect(newNotes).toEqual(restNotes)
    })

    it('should remove anything if empty list is given', function () {
        const newNotes = removeNotes([], notes)
        expect(newNotes).toEqual(notes)
    })

    it('should not mutate original notes', function () {
        removeNotes(notesToRemove, notes)
        expect(notes).toEqual(expect.arrayContaining(notesToRemove))
    })

    it('should be carried', function () {
        const a = removeNotes(notesToRemove, notes)
        const b = removeNotes(notesToRemove)(notes)
        const c = removeNotes(__, notes)(notesToRemove)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})