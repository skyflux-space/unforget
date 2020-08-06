import {dissoc} from 'ramda'
import {createNote, deserializeNotes, serializeNotes} from '../../service'
import {Note} from '../../types'


describe('serializeNotes', function () {

    it('should return serialized empty list for undefined input', function () {
        const str = serializeNotes(undefined)
        const deserialized = deserializeNotes(str)
        expect(deserialized).toEqual([])
    })

    it('should serialize valid notes to valid string', function () {
        const validNotes: Note[] = [
            {...createNote(), content: '1'},
            {...createNote(), content: [{text: '1', checked: false, index: 0}]},
            {...createNote(), content: [{text: '1', checked: true, index: 0}]},
            {
                ...createNote(), content: [
                    {text: '1', checked: true, index: 0},
                    {text: '', checked: true, index: 1},
                    {text: '', checked: true, index: 2},
                ],
            },
            dissoc('content', createNote()),
        ]
        const str = serializeNotes(validNotes)
        const deserialized = deserializeNotes(str)
        expect(deserialized).toEqual(validNotes)
    })

})