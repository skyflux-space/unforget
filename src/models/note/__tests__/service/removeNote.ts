import {__} from 'ramda'
import {createNote, removeNote} from '../../service'
import {Note} from '../../types'


describe('removeNote', function () {
    const note = createNote()
    const notFoundNote = createNote()
    const notes: Note[] = [createNote(), createNote(), createNote()]
    const allNotes = [...notes, note]

    it('should remove note', function () {
        const removed = removeNote(note, allNotes)
        expect(removed).toEqual(notes)
    })

    it('should remove anything if note is not found', function () {
        const removed = removeNote(notFoundNote, allNotes)
        expect(removed).toEqual(allNotes)
    })

    it('should be curried', function () {
        const a = removeNote(note, allNotes)
        const b = removeNote(note)(allNotes)
        const c = removeNote(__, allNotes)(note)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})