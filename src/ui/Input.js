import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './Input.module.scss'


export const Input = forwardRef(({className, type, ...props}, ref) => (
    <input type="text" className={c(styles.input, styles[type], className)} {...props} ref={ref}/>
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