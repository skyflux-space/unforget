import React, {Children, MouseEventHandler} from 'react'
import PropTypes from 'prop-types'
import {A} from 'hookrouter'
import c from 'classnames'
import {Button, Icon} from '..'
import styles from './Header.module.scss'


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
        <ul className={styles.right}>{Children.map(children, (e, i) => (
            <li key={i} className={styles.item}>{e}</li>
        ))}</ul>
    </header>
)

Header.defaultProps = {
    backUrl: '/',
}

Header.propTypes = {
    onBackClick: PropTypes.func,
    backUrl: PropTypes.string,
}