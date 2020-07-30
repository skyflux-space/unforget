import {dissoc} from 'ramda'
import {serializeNotes, deserializeNotes, createNote} from '../../service'
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
            {...createNote(), content: [{text: '1', checked: false}]},
            {...createNote(), content: [{text: '1', checked: true}]},
            {
                ...createNote(), content: [
                    {text: '1', checked: true},
                    {text: '', checked: true},
                    {text: '', checked: true}
                ]
            },
            dissoc('content', createNote())
        ]
        const str = serializeNotes(validNotes)
        const deserialized = deserializeNotes(str)
        expect(deserialized).toEqual(validNotes)
    })

})