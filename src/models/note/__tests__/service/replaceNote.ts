import {__, clone, equals, findIndex} from 'ramda'
import {createNote, replaceNote} from '../../service'


describe('replaceNote', function () {
    const note = createNote()
    const newNote = clone(note)
    const notes = [createNote(), createNote(), createNote(), note, createNote(), createNote()]

    it('should remove old note', function () {
        const newNotes = replaceNote(newNote, notes)
        expect(newNotes).not.toContain(note)
    })

    it('should add new note', function () {
        const newNotes = replaceNote(newNote, notes)
        expect(newNotes).toContain(newNote)
    })

    it('should keep note index', function () {
        const newNotes = replaceNote(note, notes)
        const oldIndex = findIndex(equals(note), notes)
        const newIndex = findIndex(equals(newNote), newNotes)
        expect(oldIndex).toBe(newIndex)
    })

    it('should not mutate original notes', function () {
        replaceNote(newNote, notes)
        expect(notes).toContain(note)
    })

    it('should be curried', function () {
        const a = replaceNote(newNote, notes)
        const b = replaceNote(newNote)(notes)
        const c = replaceNote(__, notes)(newNote)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})