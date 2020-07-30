import {__, assoc} from 'ramda'
import {createNote, removeNoteById} from '../../service'


describe('removeNoteById', function () {
    const note = assoc('id', 'test', createNote())
    const notes = [
        createNote(),
        createNote(),
        note,
        createNote(),
    ]

    it('should remove note with given id', function () {
        const newNotes = removeNoteById(note.id, notes)
        expect(newNotes).not.toContain(note)
    })

    it('should remove anything if given id does not exist', function () {
        const newNotes = removeNoteById('non-existing-id', notes)
        expect(newNotes).toEqual(notes)
    })

    it('should not mutate original notes', function () {
        removeNoteById(note.id, notes)
        expect(notes).toContain(note)
    })

    it('should be carried', function () {
        const a = removeNoteById(note.id, notes)
        const b = removeNoteById(note.id)(notes)
        const c = removeNoteById(__, notes)(note.id)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})