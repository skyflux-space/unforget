import {convertContentToList} from '../../service'
import {map, prop} from 'ramda'


describe('convertContentToList', function () {

    test.each([
        undefined,
        ''
    ])('should return empty array for empty input', function (empty) {
        const list = convertContentToList(empty)
        expect(list.length).toBe(0)
    })

    it('should parse multiline content', function () {
        const content = `
            1
            2
            3
            4
        `
        const list = convertContentToList(content)
        const texts = map(prop('text'), list)
        expect(texts).toEqual(['1', '2', '3', '4'])
    })

    it('should parse line content', function() {
        const content = 'one line'
        const list = convertContentToList(content)
        const texts = map(prop('text'), list)
        expect(texts).toEqual([content])
    })

    it('should not contain empty lines', function () {
        const content = `
            1
            2
            
            3
        `
        const list = convertContentToList(content)
        const texts = map(prop('text'), list)
        expect(texts).toEqual(['1', '2', '3'])
    })

    test.each([
        '',
        '123',
        `
            1
            2
            3
        `
    ])('should return non-checked list', function (content) {
        const list = convertContentToList(content)
        const checks: boolean[] = map(prop('checked'), list)
        expect(checks).not.toContain(true)
    })
})