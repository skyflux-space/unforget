import {filter, reject} from 'ramda'
import {createNote, filterValidNotes, isValidNote} from '../../service'


describe('filterValidNotes', function () {
    const notes = [
        createNote(),
        createNote(),
        {...createNote(), content: '1'},
        {...createNote(), content: []},
        {...createNote(), content: ''},
        {...createNote(), content: [{checked: false, text: ''}]},
        {...createNote(), content: [{checked: false, text: '1'}]},
        {...createNote(), content: [{checked: false, text: '1'}, {checked: false, text: '2'}]},
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