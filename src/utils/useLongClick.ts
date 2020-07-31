import {useCallback, useRef, TouchEvent} from 'react'

export type UseLongClickResult = {
    onTouchStart: (event: TouchEvent) => void
    onTouchEnd: (event: TouchEvent) => void
}

export const useLongClick = (f: () => any, delay: number = 350): UseLongClickResult => {
    const longClick = useRef<NodeJS.Timeout | null>(null)
    const onTouchStart = useCallback((event: TouchEvent) => {
        longClick.current = setTimeout(() => {
            event.stopPropagation()
            event.preventDefault()
            longClick.current = null
            f()
        }, delay)
    }, [longClick, f, delay])

    const onTouchEnd = useCallback((event: TouchEvent) => {
        if (longClick.current !== null) {
            clearTimeout(longClick.current)
            longClick.current = null
        } else {
            event.stopPropagation()
            event.preventDefault()
        }
    }, [longClick])

    return {onTouchStart, onTouchEnd}
}