import {dissoc} from 'ramda'
import {createNote, deserializeNotes, saveNotes} from '../../service'
import {Note} from '../../types'


jest.mock('../../../../utils/localStorage.ts', () => {
    const mock = jest.fn()
    return ({
        getItem: jest.fn(),
        setItem: () => mock
    })
})
const {setItem}: { setItem: () => jest.Mock } = jest.requireMock('../../../../utils/localStorage.ts')

beforeEach(jest.resetAllMocks)


describe('saveNotes', function () {
    const invalidNote: Note = dissoc('content', createNote())
    const validNotes: Note[] = [
        {...createNote(), content: '1'},
        {...createNote(), content: [{text: '1', checked: false, index: 0}]},
        {...createNote(), content: [{text: '1', checked: true, index: 0}]},
        {...createNote(), content: [{text: '1', checked: true, index: 0}, {text: '', checked: true, index: 1}, {text: '', checked: true, index: 2}]},
    ]
    const notesWithInvalidNote: Note[] = [...validNotes, invalidNote]

    it('should save valid notes', function () {
        let data: string = ''
        setItem().mockImplementation((str: string) => data = str)
        saveNotes(validNotes)
        const deserialized = deserializeNotes(data)
        expect(deserialized).toEqual(validNotes)
    })

    it('should save only valid notes', function () {
        let data: string = ''
        setItem().mockImplementation((str: string) => data = str)
        saveNotes(notesWithInvalidNote)
        const deserialized = deserializeNotes(data)
        expect(deserialized).toEqual(validNotes)
    })

})