import {__, clone} from 'ramda'
import {createNote, replaceAll} from '../../service'


describe('replaceAll', function () {
    const note1 = createNote()
    const note2 = createNote()
    const notesToReplace = [note1, note2]
    const notes = [createNote(), createNote()]
    const allNotes = [...notes, clone(note1), clone(note2)]

    it('should replace all notes', function () {
        const replaced = replaceAll(notesToReplace, allNotes)
        expect(replaced).toEqual(expect.arrayContaining(notes))
    })

    it('should replace nothing for empty list input', function () {
        const replaced = replaceAll([], allNotes)
        expect(replaced).toEqual(allNotes)
    })

    it('should be curried', function () {
        const a = replaceAll(notesToReplace, allNotes)
        const b = replaceAll(notesToReplace)(allNotes)
        const c = replaceAll(__, allNotes)(notesToReplace)
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})