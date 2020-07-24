import React, {ChangeEventHandler, FocusEventHandler} from 'react'
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs'
import c from 'classnames'
import {ContentListItem as ContentListItemType, Identifiable} from '../models/note/types'
import {Input} from './Input'
import {TextArea} from './TextArea'
import {ContentList} from './ContentList'
import styles from './CreateForm.module.scss'


export type CreateFormProps = {
    contentListFields: Partial<ContentListItemType & Identifiable>[]
    onTabSelect?: (i: number) => void
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onListStaticInputChange?: ChangeEventHandler<HTMLTextAreaElement>
    onListFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    createOnListFieldBlur?: (i: number) => FocusEventHandler<HTMLTextAreaElement>
}

export const CreateForm: React.FC<CreateFormProps> = (
    {
        contentListFields,
        onTabSelect,
        createRef,
        onListStaticInputChange,
        createOnListFieldBlur,
        onListFieldBlur
    }) => (
    <form className={c(styles.flex, styles.column, styles.grow, styles.hidden)}>
        <Input name="title" placeholder="Title..." ref={createRef}/>
        <Tabs
            className={c(styles.flex, styles.column, styles.grow)}
            selectedTabPanelClassName={c(styles.grow, styles.scroll)}
            onSelect={onTabSelect}
        >
            <TabPanel>
                <TextArea name="content" placeholder="Note..." fullSize ref={createRef}/>
            </TabPanel>
            <TabPanel>
                <ContentList
                    fields={contentListFields}
                    createRef={createRef}
                    createOnFieldBlur={createOnListFieldBlur}
                    onFieldBlur={onListFieldBlur}
                    onStaticInputChange={onListStaticInputChange}
                />
            </TabPanel>
            <div className={styles.flex}>
                <TabList className={c(styles.flex, styles.grow, styles.end)}>
                    <Tab>Текст</Tab>
                    <Tab>Список</Tab>
                </TabList>
            </div>
        </Tabs>
    </form>
)

