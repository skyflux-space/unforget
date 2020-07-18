import React from 'react'
import PropTypes from 'prop-types'
import c from 'class-names'
import styles from './Button.module.scss'


export const Button = ({children, className, kind, withoutBorder, round, ...props}) => (
    <button
        className={c(
            className,
            styles[kind],
            round && styles.round,
            !withoutBorder && styles.border,
        )}
        {...props}
    >{children}</button>
)

Button.defaultProps = {
    kind: 'normal',
    className: styles.default,
    round: false,
    withoutBorder: false,
}

Button.propTypes = {
    className: PropTypes.string,
    kind: PropTypes.oneOf([
        'normal',
        'primary',
        'secondary',
    ]),
    round: PropTypes.bool,
    withoutBorder: PropTypes.bool,
}