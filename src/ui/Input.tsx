import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './Input.module.scss'


export type InputProps = {
    type?: 'title'
} & JSX.IntrinsicElements['input']

export const Input = forwardRef<HTMLInputElement, InputProps>(({className, type, ...props}, ref) => (
    <input type="text" className={c(styles.input, type && styles[type], className)} {...props} ref={ref}/>
))

Input.defaultProps = {
    className: styles.default,
    type: 'title',
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([
        'title',
    ])
}