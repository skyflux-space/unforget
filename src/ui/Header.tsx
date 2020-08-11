import React, {MouseEventHandler} from 'react'
import PropTypes from 'prop-types'
import {A} from 'hookrouter'
import {Button} from './Button'
import styles from './Header.module.scss'


export type HeaderProps = {
    onBackClick?: MouseEventHandler<HTMLButtonElement>
    backUrl?: string
}

export const Header: React.FC<HeaderProps> = ({onBackClick, backUrl, children}) => (
    <header className={styles.row}>
        <A href={backUrl!}>
            <Button children="<--" onClick={onBackClick}/>
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