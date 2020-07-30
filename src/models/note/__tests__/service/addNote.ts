import {__} from 'ramda'
import {addNote, createNote} from '../../service'
import {Note} from '../../types'


describe('addNote', function () {
    const note = createNote()

    test.each([
        [[]],
        [[createNote()]]
    ])('should add note', function (notes: Note[]) {
        expect(notes).not.toContain(note)
        const newNotes = addNote(note, notes)
        expect(newNotes).toContain(note)
    })

    it('should not remove old notes', function () {
        const notes = [createNote()]
        const newNotes = addNote(note, notes)
        expect(newNotes).toEqual(expect.arrayContaining(notes))
    })

    it('should not mutate old notes', function () {
        const notes = [createNote()]
        addNote(note, notes)
        expect(notes).not.toContain(note)
    })

    it('should be curried', function () {
        const notes = [createNote()]
        const a = addNote(note, notes)
        const b = addNote(note)(notes)
        const c = addNote(__, notes)(note)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })
})