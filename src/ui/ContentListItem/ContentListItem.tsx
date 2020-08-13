import React, {ChangeEventHandler, FocusEventHandler, forwardRef, memo, Ref, RefAttributes} from 'react'
import {Icon, TextArea} from '..'
import styles from './ContentListItem.module.scss'


export type ContentListItemProps = {
    checked: boolean
    index?: number
    defaultText?: string
    name?: string
    disabled?: boolean
    readOnly?: boolean
    onBlur?: FocusEventHandler<HTMLTextAreaElement>
    onTextChange?: ChangeEventHandler<HTMLTextAreaElement>
    onRemoveClicked?: (...args: any[]) => any
    onChecked?: (value: boolean) => void
}

type OptionalRef<T extends HTMLElement> = Ref<T> | undefined
type InputRef = OptionalRef<HTMLInputElement>
type TextAreaRef = OptionalRef<HTMLTextAreaElement>

export const ContentListItem: React.FC<ContentListItemProps & RefAttributes<HTMLElement>> = memo(forwardRef<HTMLElement, ContentListItemProps>((
    {checked, index, defaultText, onBlur, name, onTextChange, disabled, readOnly, onRemoveClicked, onChecked}, ref
    ) => (
        <div className={styles.flex}>
            {index !== undefined && <input hidden readOnly name={`${name}.index`} value={index} ref={ref as InputRef}/>}
            <input
                type="checkbox"
                defaultChecked={checked}
                ref={ref as InputRef}
                name={`${name}.checked`}
                disabled={disabled}
                onChange={({target}) => onChecked?.(target.checked)}
            />
            <TextArea name={`${name}.text`}
                      size="small"
                      defaultValue={defaultText}
                      ref={ref as TextAreaRef}
                      autoFocus
                      onBlur={onBlur}
                      onFocus={onFocus}
                      onChange={onTextChange}
                      className={styles.margin}
                      readOnly={readOnly}
                      {...(disabled ? {value: ''} : {})}
            />
            {!disabled && (
                <button onClick={onRemoveClicked} className={styles.remove}>
                    <Icon icon="close"/>
                </button>
            )}
        </div>
    )
))


const onFocus: FocusEventHandler<HTMLTextAreaElement> = ({target}) => {
    const {value} = target
    target.value = ''
    target.value = value
}