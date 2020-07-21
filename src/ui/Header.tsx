import React from 'react'
import PropTypes from 'prop-types'
import {A} from 'hookrouter'
import {Button} from './Button'
import styles from './Header.module.scss'


export type HeaderProps = {
    onBackClick: () => any
    backUrl?: string
}

export const Header: React.FC<HeaderProps> = ({onBackClick, backUrl, children}) => (
    <header className={styles.fixed}>
        <A href={backUrl!}>
            <Button children="<--" onClick={onBackClick}/>
        </A>
        {children}
    </header>
)

Header.defaultProps = {
    backUrl: '/',
}

Header.propTypes = {
    onBackClick: PropTypes.func.isRequired,
    backUrl: PropTypes.string,
}