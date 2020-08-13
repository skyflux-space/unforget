import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './TextArea.module.scss'


export type TextAreaProps = {
    size?: 'big' | 'small'
    fullSize?: boolean
    withoutDefault?: boolean
} & JSX.IntrinsicElements['textarea']

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({className, size, fullSize, withoutDefault, ...props}, ref) => (
    <textarea className={c(
        styles.textarea,
        styles[size!],
        fullSize && styles.full,
        !withoutDefault && styles.default,
        className,
    )} {...props} ref={ref}/>
))

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