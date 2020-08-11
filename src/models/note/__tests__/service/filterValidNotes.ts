import {filter, reject} from 'ramda'
import {createNote, filterValidNotes, isValidNote} from '../../service'


describe('filterValidNotes', function () {
    const notes = [
        createNote(),
        createNote(),
        {...createNote(), content: '1'},
        {...createNote(), content: []},
        {...createNote(), content: ''},
        {...createNote(), content: [{checked: false, text: '', index: 0}]},
        {...createNote(), content: [{checked: false, text: '1', index: 0}]},
        {...createNote(), content: [{checked: false, text: '1', index: 0}, {checked: false, text: '2', index: 1}]},
    ]

    it('should return valid notes', function () {
        const validNotes = filterValidNotes(notes)
        const reallyValidNotes = filter(isValidNote, notes)
        expect(validNotes).toEqual(reallyValidNotes)
    })

    it('should not return invalid notes', function () {
        const validNotes = filterValidNotes(notes)
        const invalidNotes = reject(isValidNote, validNotes)
        expect(invalidNotes.length).toBe(0)
    })

})