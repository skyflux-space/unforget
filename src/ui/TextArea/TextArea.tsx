import React, {forwardRef, memo, useMemo} from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import {TextareaAutosizeProps} from 'react-textarea-autosize/dist/declarations/src'
import styles from './TextArea.module.scss'


export type TextAreaProps = {
    size?: 'big' | 'small'
    fullSize?: boolean
    withoutDefault?: boolean
    autoResize?: boolean
} & JSX.IntrinsicElements['textarea'] & TextareaAutosizeProps

export const TextArea = memo(forwardRef<HTMLTextAreaElement, TextAreaProps>(({className, size, fullSize, withoutDefault, autoResize, ...props}, ref) => {
    const Component = useMemo(() => autoResize ? TextareaAutosize : 'textarea', [autoResize])

    return (
        <Component
            className={c(
                styles.textarea,
                styles[size!],
                fullSize && styles.full,
                !withoutDefault && styles.default,
                className,
            )}
            {...props}
            ref={ref}
        />
    )
})) as React.FC<TextAreaProps>

TextArea.defaultProps = {
    size: 'big',
    fullSize: false,
    withoutDefault: false,
}

TextArea.propTypes = {
    size: PropTypes.oneOf([
        'big',
        'small',
    ]),
    fullSize: PropTypes.bool,
    withoutDefault: PropTypes.bool,
}