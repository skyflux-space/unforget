import React from 'react'
import PropTypes from 'prop-types'
import c from 'class-names'
import styles from './BottomBar.module.scss'


export const BottomBar = ({button, visible, left, right}) => (
    <div className={styles.bar}>
        <div className={styles.column}>
            <div className={c(styles.row, visible && styles.visible)}>
                {left}
            </div>
        </div>
        {button && (
            <div className={styles.button}>
                <div className={c(styles.background, visible && styles.visible)}/>
                {button}
            </div>
        )}
        <div className={styles.column}>
            <div className={c(styles.row, visible && styles.visible)}>
                {right}
            </div>
        </div>
    </div>
)

BottomBar.defaultProps = {
    button: null,
    left: null,
    right: null,
}

BottomBar.propTypes = {
    button: PropTypes.element,
    visible: PropTypes.bool.isRequired,
    left: PropTypes.element,
    right: PropTypes.element,
}