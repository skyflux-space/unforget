import {createNote} from '../../service'


describe('createNote', function () {

    it('should return different notes per call', function () {
        const a = createNote()
        const b = createNote()
        expect(a).not.toEqual(b)
    })

})