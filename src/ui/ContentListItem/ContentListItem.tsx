import React, {ChangeEventHandler, FocusEventHandler, forwardRef, memo, Ref, RefAttributes} from 'react'
import c from 'classnames'
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
}

type OptionalRef<T extends HTMLElement> = Ref<T> | undefined
type InputRef = OptionalRef<HTMLInputElement>
type TextAreaRef = OptionalRef<HTMLTextAreaElement>

export const ContentListItem: React.FC<ContentListItemProps & RefAttributes<HTMLElement>> = memo(forwardRef<HTMLElement, ContentListItemProps>((
    {checked, index, defaultText, onBlur, name, onTextChange, disabled, readOnly, onRemoveClicked}, ref
    ) => (
        <div className={c(styles.flex, styles.center, styles.relative, styles.round)}>
            {index !== undefined && <input hidden readOnly name={`${name}.index`} value={index} ref={ref as InputRef}/>}
            <TextArea name={`${name}.text`}
                      autoResize
                      maxLength={999}
                      size="small"
                      defaultValue={defaultText}
                      ref={ref as TextAreaRef}
                      autoFocus
                      onBlur={onBlur}
                      onFocus={onFocus}
                      onChange={onTextChange}
                      readOnly={readOnly}
                      className={c(checked && styles.checked)}
                      {...(disabled ? {value: ''} : {})}
            />
            {!disabled && !readOnly && (
                <button onClick={onRemoveClicked} className={styles.remove}>
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
))


const onFocus: FocusEventHandler<HTMLTextAreaElement> = ({target}) => {
    const {value} = target
    target.value = ''
    target.value = value
}