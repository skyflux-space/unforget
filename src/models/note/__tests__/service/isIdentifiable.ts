import {isIdentifiable} from '../../service'


describe('isIdentifiable', function () {

    it('should return true for objects with id prop defined', function () {
        const identifiableObject = {id: '1'}
        const identifiable = isIdentifiable(identifiableObject)
        expect(identifiable).toBe(true)
    })

    it('should return false for objects without id prop', function () {
        const notIdentifiableObject = {foo: '1'}
        const identifiable = isIdentifiable(notIdentifiableObject)
        expect(identifiable).toBe(false)
    })

})