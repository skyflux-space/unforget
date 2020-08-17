import React from 'react'
import {A} from 'hookrouter'
import {BottomBar, Button, Icon} from '..'
import styles from './DashboardBottomBar.module.scss'


export type DashboardBottomBarProps = {
    pinned: boolean
    visible: boolean
    onClearClicked: () => void
    onRemoveClicked: () => void
    onPinClicked: () => void
    onUnpinClicked: () => void
}

export const DashboardBottomBar: React.FC<DashboardBottomBarProps> = ({pinned, visible, onClearClicked, onRemoveClicked, onPinClicked, onUnpinClicked}) => (
    <BottomBar
        visible={visible}
        button={
            <A href={'/create'}>
                <Button className={styles.round} round withoutBorder>
                    <Icon icon="add"/>
                </Button>
            </A>
        }
        left={
            <>
                <Button className={styles.item} full withoutBorder onClick={onClearClicked}>
                    <Icon icon="cancel"/>
                </Button>
                <Button className={styles.item} full withoutBorder onClick={onRemoveClicked}>
                    <Icon icon="remove"/>
                </Button>
            </>
        }
        right={
            <Button className={styles.item} full withoutBorder onClick={pinned ? onUnpinClicked : onPinClicked}>
                <Icon icon={pinned ? 'unpin' : 'pin'}/>
            </Button>
        }
    />
)