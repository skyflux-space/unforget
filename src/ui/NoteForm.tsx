import React, {ChangeEventHandler, FocusEventHandler} from 'react'
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs'
import c from 'classnames'
import {ContentListItem as ContentListItemType, ContentType, Identifiable} from '../models/note/types'
import {Input} from './Input'
import {TextArea} from './TextArea'
import {ContentList} from './ContentList'
import styles from './NoteForm.module.scss'


export type CreateFormProps = {
    contentListFields: Partial<ContentListItemType & Identifiable>[]
    onTabSelect?: (i: number) => void
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onListStaticInputChange?: ChangeEventHandler<HTMLTextAreaElement>
    onListFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    createOnListFieldBlur?: (i: number) => FocusEventHandler<HTMLTextAreaElement>
    readOnly?: boolean
    type?: ContentType
}

export const NoteForm: React.FC<CreateFormProps> = (
    {
        contentListFields,
        onTabSelect,
        createRef,
        onListStaticInputChange,
        createOnListFieldBlur,
        onListFieldBlur,
        readOnly = false,
        type = ContentType.String,
    }) => (
    <form className={c(styles.flex, styles.column, styles.grow, styles.hidden)}>
        <Input name="title" placeholder="Title..." ref={createRef} readOnly={readOnly}/>
        <Tabs
            className={c(styles.flex, styles.column, styles.grow)}
            selectedTabPanelClassName={c(styles.grow, styles.scroll, styles.padding)}
            onSelect={onTabSelect}
            selectedIndex={type}
        >
            <TabPanel>
                <TextArea
                    name="content"
                    placeholder="Note..."
                    fullSize
                    ref={createRef}
                    withoutDefault
                    readOnly={readOnly}
                />
            </TabPanel>
            <TabPanel>
                <ContentList
                    fields={contentListFields}
                    createRef={createRef}
                    createOnFieldBlur={createOnListFieldBlur}
                    onFieldBlur={onListFieldBlur}
                    onStaticInputChange={onListStaticInputChange}
                    readOnly={readOnly}
                />
            </TabPanel>
            {
                !readOnly
                    ? (
                        <div className={styles.flex}>
                            <TabList className={c(styles.flex, styles.grow, styles.end)}>
                                <Tab>Текст</Tab>
                                <Tab>Список</Tab>
                            </TabList>
                        </div>
                    ) : null
            }
        </Tabs>
    </form>
)

