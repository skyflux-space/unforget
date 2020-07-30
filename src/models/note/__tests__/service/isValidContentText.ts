import {isValidContentText} from '../../service'


describe('isValidContentText', function () {

    it('should return false for empty string', function () {
        const valid = isValidContentText('')
        expect(valid).toBe(false)
    })

    it('should return false for undefined', function () {
        const valid = isValidContentText(undefined)
        expect(valid).toBe(false)
    })

    it('should return false for blank string', function () {
        const valid = isValidContentText('       ')
        expect(valid).toBe(false)
    })

    it('should return true for non-empty string', function () {
        const valid = isValidContentText('123')
        expect(valid).toBe(true)
    })

})