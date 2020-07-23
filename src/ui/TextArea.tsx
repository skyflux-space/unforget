import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './TextArea.module.scss'


export type TextAreaProps = {
    size?: 'big' | 'small'
} & JSX.IntrinsicElements['textarea']

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({className, size, ...props}, ref) => (
    <textarea className={c(styles.textarea, styles[size!], className)} {...props} ref={ref}/>
))

TextArea.defaultProps = {
    className: styles.default,
    size: 'big',
}

TextArea.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf([
        'big',
        'small',
    ])
}