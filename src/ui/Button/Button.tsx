import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './Button.module.scss'


export type ButtonProps = {
    kind?: 'normal' | 'primary' | 'secondary'
    round?: boolean
    full?: boolean
} & JSX.IntrinsicElements['button']

export const Button: React.FC<ButtonProps> = ({children, className, kind, full, round, ...props}) => (
    <button
        className={c(
            className,
            styles[kind!],
            full && styles.full,
            round && styles.round,
        )}
        {...props}
    >{children}</button>
)

Button.defaultProps = {
    kind: 'normal',
    className: styles.default,
    round: false,
}

Button.propTypes = {
    className: PropTypes.string,
    kind: PropTypes.oneOf([
        'normal',
        'primary',
        'secondary',
    ]),
    round: PropTypes.bool,
}