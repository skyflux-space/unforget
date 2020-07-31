import {createNote, unpinAll} from '../../service'
import {__, assoc, complement, filter, map, propOr} from 'ramda'


describe('unpinAll', function () {
    const notes = map(assoc('pinned', true), [createNote(), createNote(), createNote()])
    const notesToPin = map(assoc('pinned', true), [createNote(), createNote()])
    const allNotes = [...notes, ...notesToPin]

    it('should pin all notes', function () {
        const pinned = unpinAll(notesToPin, allNotes)
        expect(pinned).toEqual([...notes, ...map(assoc('pinned', false), notesToPin)])
    })

    it('should pin nothing for empty input', function () {
        const pinned = unpinAll([], allNotes)
        expect(filter(complement(propOr(false, 'pinned')), pinned)).toEqual([])
    })

    it('should be curried', function () {
        const a = unpinAll(notesToPin, allNotes)
        const b = unpinAll(notesToPin)(allNotes)
        const c = unpinAll(__, allNotes)(notesToPin)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})