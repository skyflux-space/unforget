import {dissoc} from 'ramda'
import {createNote, deserializeNotes, serializeNotes} from '../../service'
import {Note} from '../../types'

describe('deserializeNotes', function () {
    const invalidNote: Note = dissoc('content', createNote())
    const validNotes: Note[] = [
        {...createNote(), content: '1'},
        {...createNote(), content: [{text: '1', checked: false, index: 0}]},
        {...createNote(), content: [{text: '1', checked: true, index: 0}]},
        {
            ...createNote(), content: [
                {text: '1', checked: true, index: 0},
                {text: '', checked: true, index: 1},
                {text: '', checked: true, index: 2}
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