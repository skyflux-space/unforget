import {dissoc} from 'ramda'
import {createNote, deserializeNotes, serializeNotes} from '../../service'
import {Note} from '../../types'

describe('deserializeNotes', function () {
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
    const notes: Note[] = [...validNotes, invalidNote]

    test.each([
        undefined,
        '',
        'test',
        '[test]',
        '[1]',
        '{"foo": "bar"}',
    ])('should return empty list for invalid input', function (str?: string) {
        const notes = deserializeNotes(str)
        expect(notes).toEqual([])
    })

    it('should return notes', function () {
        const deserializedNotes = deserializeNotes(serializeNotes(notes))
        expect(deserializedNotes).toEqual(notes)
    })

})