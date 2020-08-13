import React, {Children, MouseEventHandler} from 'react'
import PropTypes from 'prop-types'
import {A} from 'hookrouter'
import c from 'classnames'
import {Button} from './Button'
import styles from './Header.module.scss'
import {Icon} from './Icon'


export type HeaderProps = {
    onBackClick?: MouseEventHandler<HTMLButtonElement>
    backUrl?: string
}

export const Header: React.FC<HeaderProps> = ({onBackClick, backUrl, children}) => (
    <header className={c(styles.row, styles.padding)}>
        <A href={backUrl!}>
            <Button onClick={onBackClick} withoutBorder className={styles.item}>
                <Icon icon="back"/>
            </Button>
        </A>
        <div className={styles.right}>{children}</div>
    </header>
)

Header.defaultProps = {
    backUrl: '/',
}

Header.propTypes = {
    onBackClick: PropTypes.func,
    backUrl: PropTypes.string,
}