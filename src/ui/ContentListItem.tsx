import React, {ChangeEventHandler, FocusEventHandler, forwardRef, memo, Ref} from 'react'
import PropTypes from 'prop-types'
import {TextArea} from './TextArea'


export type ContentListItemProps = {
    checked: boolean
    defaultText?: string
    onBlur?: FocusEventHandler<HTMLTextAreaElement>
    name?: string
    disabled?: boolean
    onTextChange?: ChangeEventHandler<HTMLTextAreaElement>
}

type OptionalRef<T extends HTMLElement> = Ref<T> | undefined
type InputRef = OptionalRef<HTMLInputElement>
type TextAreaRef = OptionalRef<HTMLTextAreaElement>

export const ContentListItem = forwardRef<HTMLElement, ContentListItemProps>(memo((
    {checked, defaultText, onBlur, name, onTextChange, disabled}, ref: InputRef | TextAreaRef
    ) => (
        <div>
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
                      {...(disabled ? {value: ''} : {})}
            />
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