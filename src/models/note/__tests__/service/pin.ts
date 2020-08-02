import {createNote, pin} from '../../service'


describe('pin', function () {

    it('should set pinned to true', function () {
        const note = {...createNote(), pinned: false}
        const pinned = pin(note)
        expect(pinned).toEqual({
            ...note,
            pinned: true,
        })
    })

    it('should not affect on pinned note', function () {
        const note = {...createNote(), pinned: true}
        const pinned = pin(note)
        expect(pinned).toEqual(note)
    })
})