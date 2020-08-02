import React, {ChangeEventHandler, FocusEventHandler, forwardRef, memo, Ref, RefAttributes} from 'react'
import PropTypes from 'prop-types'
import {TextArea} from './TextArea'
import styles from './ContentListItem.module.scss'


export type ContentListItemProps = {
    checked: boolean
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
    {checked, defaultText, onBlur, name, onTextChange, disabled, readOnly, onRemoveClicked}, ref
    ) => (
        <div className={styles.flex}>
            <input
                type="checkbox"
                defaultChecked={checked}
                ref={ref as InputRef}
                name={`${name}.checked`}
                disabled={disabled}
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
            <button onClick={onRemoveClicked}>X</button>
        </div>
    )
))

ContentListItem.propTypes = {
    checked: PropTypes.bool.isRequired,
    defaultText: PropTypes.string,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onTextChange: PropTypes.func,
}


const onFocus: FocusEventHandler<HTMLTextAreaElement> = ({target}) => {
    const {value} = target
    target.value = ''
    target.value = value
}