import {dissoc} from 'ramda'
import {createNote, restoreNotes, serializeNotes} from '../../service'
import {Note} from '../../types'


jest.mock('../../../../utils/localStorage.ts', () => ({getItem: jest.fn(), setItem: jest.fn()}))
const {getItem} = jest.requireMock('../../../../utils/localStorage.ts')


describe('restoreNotes', function () {
    beforeEach(jest.resetAllMocks)

    const invalidNote: Note = dissoc('content', createNote())
    const validNotes: Note[] = [
        {...createNote(), content: '1'},
        {...createNote(), content: [{text: '1', checked: false}]},
        {...createNote(), content: [{text: '1', checked: true}]},
        {
            ...createNote(), content: [
                {text: '1', checked: true},
                {text: '', checked: true},
                {text: '', checked: true}
            ]
        },
    ]
    const notesWithInvalidNote: Note[] = [...validNotes, invalidNote]

    it('should return empty list for undefined input', function () {
        getItem.mockReturnValue(undefined)
        const notes = restoreNotes()
        expect(notes).toEqual([])
    })

    it('should return empty list for empty input', function () {
        getItem.mockReturnValue('')
        const notes = restoreNotes()
        expect(notes).toEqual([])
    })

    it('should return empty list for empty input', function () {
        getItem.mockReturnValue('')
        const notes = restoreNotes()
        expect(notes).toEqual([])
    })

    it('should return valid list for valid input', function () {
        getItem.mockReturnValue(serializeNotes(validNotes))
        const restoredNotes = restoreNotes()
        expect(restoredNotes).toEqual(validNotes)
    })

    it('should not return invalid notes', function () {
        getItem.mockReturnValue(serializeNotes(notesWithInvalidNote))
        const restoredNotes = restoreNotes()
        expect(restoredNotes).toEqual(validNotes)
    })

})