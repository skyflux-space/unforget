import React from 'react'
import PropTypes from 'prop-types'
import {A} from 'hookrouter'
import Sticky from 'react-stickynode'
import {Button} from './Button'
import styles from './Header.module.scss'


export type HeaderProps = {
    onBackClick: () => any
    backUrl?: string
}

export const Header: React.FC<HeaderProps> = ({onBackClick, backUrl, children}) => (
    <Sticky top={0} bottomBoundary={0}>
        <header className={styles.row}>
            <A href={backUrl!}>
                <Button children="<--" onClick={onBackClick}/>
            </A>
            {children && <div className={styles.right}>{children}</div>}
        </header>
    </Sticky>
)

Header.defaultProps = {
    backUrl: '/',
}

Header.propTypes = {
    onBackClick: PropTypes.func.isRequired,
    backUrl: PropTypes.string,
}