import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './TextArea.module.scss'


export type TextAreaProps = {
    size?: 'big' | 'small'
    fullSize?: boolean
} & JSX.IntrinsicElements['textarea']

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({className, size, fullSize, ...props}, ref) => (
    <textarea className={c(styles.textarea, styles[size!], fullSize && styles.full, className)} {...props} ref={ref}/>
))

TextArea.defaultProps = {
    className: styles.default,
    size: 'big',
    fullSize: false,
}

TextArea.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf([
        'big',
        'small',
    ]),
    fullSize: PropTypes.bool,
}