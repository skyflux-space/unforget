import {__} from 'ramda'
import {createNote, getNote} from '../../service'


describe('getNote', function () {
    const note = {...createNote(), id: 'test'}
    const notes = [
        createNote(),
        createNote(),
        {...createNote(), content: '1'},
        {...createNote(), content: []},
        {...createNote(), content: ''},
        {...createNote(), content: [{checked: false, text: ''}]},
        {...createNote(), content: [{checked: false, text: '1'}]},
        {...createNote(), content: [{checked: false, text: '1'}, {checked: false, text: '2'}]},
        note,
    ]

    it('should find note by it\'s id', function () {
        const foundNote = getNote(note.id, notes)
        expect(foundNote).toBe(note)
    })

    it('should return undefined if note does not exist', function () {
        const foundNote = getNote('non-existing id', notes)
        expect(foundNote).toBeUndefined()
    })

    it('should be carried', function () {
        const a = getNote(note.id, notes)
        const b = getNote(note.id)(notes)
        const c = getNote(__, notes)(note.id)
        expect(a).toBe(b)
        expect(a).toBe(c)
    })

})