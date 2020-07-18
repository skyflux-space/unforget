import React from 'react'
import PropTypes from 'prop-types'
import c from 'class-names'
import styles from './TextArea.module.scss'


export const TextArea = ({className, size, ...props}) => (
    <textarea className={c(styles.textarea, styles[size], className)} {...props}/>
)

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