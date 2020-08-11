import {isValidTextContent} from '../../service'


describe('isValidTextContent', function () {

    it('should return false for empty string', function () {
        const valid = isValidTextContent('')
        expect(valid).toBe(false)
    })

    it('should return false for undefined', function () {
        const valid = isValidTextContent(undefined)
        expect(valid).toBe(false)
    })

    it('should return false for blank string', function () {
        const valid = isValidTextContent('       ')
        expect(valid).toBe(false)
    })

    it('should return true for non-empty string', function () {
        const valid = isValidTextContent('123')
        expect(valid).toBe(true)
    })

})