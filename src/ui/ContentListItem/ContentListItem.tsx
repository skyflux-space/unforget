import React, {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    KeyboardEventHandler,
    memo,
    Ref,
    RefAttributes,
    useCallback,
    useEffect,
    useRef,
} from 'react'
import c from 'classnames'
import {Icon, TextArea} from '..'
import styles from './ContentListItem.module.scss'


export type ContentListItemProps = {
    checked: boolean
    index?: string
    defaultText?: string
    name?: string
    disabled?: boolean
    readOnly?: boolean
    focus?: boolean
    onBlur?: FocusEventHandler<HTMLTextAreaElement>
    onEnter?: (data: { index?: string, text: string }) => void
    onFocus?: (data: { index?: string, text: string }) => void
    onTextChange?: ChangeEventHandler<HTMLTextAreaElement>
    onRemoveClicked?: (...args: any[]) => any
}

type OptionalRef<T extends HTMLElement> = Ref<T> | undefined
type InputRef = OptionalRef<HTMLInputElement>

export const ContentListItem: React.FC<ContentListItemProps & RefAttributes<HTMLElement>> = memo(forwardRef<HTMLElement, ContentListItemProps>((
    {checked, index, defaultText, onBlur, name, onTextChange, disabled, readOnly, onRemoveClicked, focus, onEnter, onFocus}, ref,
    ) => {
        const onRemove = useCallback(() => index !== undefined && onRemoveClicked?.(index), [onRemoveClicked, index])

        const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
        const registerTextArea = useCallback((element: HTMLTextAreaElement) => {
            textAreaRef.current = element
            if (typeof ref === 'function')
                ref(element)
        }, [textAreaRef, ref])

        const onEnterPressed = useCallback(createOnEnterEvent(event => {
            const text = (event.target as HTMLTextAreaElement).value
            onEnter?.({index, text})
            event.stopPropagation()
            event.preventDefault()
        }), [index, onEnter])

        const onFieldFocused = useCallback(event => {
            const {value} = event.target as HTMLTextAreaElement
            onFocus?.({text: value, index})
            fixFocus(event)
        }, [onFocus, index])

        useEffect(() => {
            if (focus && textAreaRef.current)
                textAreaRef.current.focus()
        })

        return (
            <div className={c(styles.flex, styles.center, styles.relative, styles.round)}>
                {index !== undefined && <input hidden readOnly name={`${name}.index`} value={index} ref={ref as InputRef}/>}
                <TextArea name={`${name}.text`}
                          autoResize
                          maxLength={999}
                          size="small"
                          defaultValue={defaultText}
                          ref={registerTextArea}
                          onBlur={onBlur}
                          onFocus={onFieldFocused}
                          onKeyPress={onEnterPressed}
                          onChange={onTextChange}
                          readOnly={readOnly}
                          className={c(checked && styles.checked)}
                          {...(disabled ? {value: ''} : {})}
                />
                {!disabled && !readOnly && (
                    <button onClick={onRemove} className={styles.remove}>
                        <Icon icon="close"/>
                    </button>
                )}
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    defaultChecked={checked}
                    ref={ref as InputRef}
                    name={`${name}.checked`}
                    hidden={disabled || !readOnly}
                />
            </div>
        )
    },
))


const fixFocus: FocusEventHandler<HTMLTextAreaElement> = ({target}) => {
    const {value} = target
    target.value = ''
    target.value = value
}


const createOnEnterEvent = (fn: KeyboardEventHandler): KeyboardEventHandler => event => {
    if (event.key === 'Enter') {
        event.persist()
        fn(event)
    }
}