import {createNote, pinAll} from '../../service'
import {__, assoc, filter, map, propOr} from 'ramda'


describe('pinAll', function () {
    const notes = map(assoc('pinned', false), [createNote(), createNote(), createNote()])
    const notesToPin = [createNote(), createNote()]
    const allNotes = [...notes, ...notesToPin]

    it('should pin all notes', function () {
        const pinned = pinAll(notesToPin, allNotes)
        expect(pinned).toEqual([...notes, ...map(assoc('pinned', true), notesToPin)])
    })

    it('should pin nothing for empty input', function () {
        const pinned = pinAll([], allNotes)
        expect(filter(propOr(false, 'pinned'), pinned)).toEqual([])
    })

    it('should be curried', function () {
        const a = pinAll(notesToPin, allNotes)
        const b = pinAll(notesToPin)(allNotes)
        const c = pinAll(__, allNotes)(notesToPin)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})