import {createNote, unpin} from '../../service'


describe('unpin', function () {

    it('should set pinned to false', function () {
        const note = {...createNote(), pinned: true}
        const unpinned = unpin(note)
        expect(unpinned).toEqual({
            ...note,
            pinned: false,
        })
    })

    it('should not affect on unpinned note', function () {
        const note = {...createNote(), pinned: false}
        const unpinned = unpin(note)
        expect(unpinned).toEqual(note)
    })
})