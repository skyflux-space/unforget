import React, {FocusEventHandler, FormEventHandler, useCallback} from 'react'
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs'
import c from 'classnames'
import {Note} from '../models/note'
import {ContentList as ContentListType, ContentType, getContentType} from '../models/content'
import {Input} from './Input'
import {TextArea} from './TextArea'
import {ContentList} from './ContentList'
import styles from './NoteForm.module.scss'
import {always, cond, equals, identity, ifElse, isNil, pipe} from 'ramda'


export type CreateFormProps = {
    note: Note
    readOnly?: boolean
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onContentTypeChanged?: (type: ContentType) => void
    onListStaticInputChange?: (text: string) => void
    onListFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    onListFieldRemoved?: (i: number) => void
    onSubmit?: FormEventHandler<HTMLFormElement>
}

export const NoteForm: React.FC<CreateFormProps> = (
    {
        note,
        readOnly = false,
        createRef,
        onContentTypeChanged,
        onListStaticInputChange,
        onListFieldBlur,
        onListFieldRemoved,
        onSubmit,
    }) => {

    const onTabSelect: (i: number) => void = useCallback(ifElse(
        pipe(always(onContentTypeChanged), isNil),
        identity,
        pipe(
            cond<number, ContentType>([
                [equals(0), always(ContentType.String)],
                [equals(1), always(ContentType.List)],
            ]),
            onContentTypeChanged!,
        ),
    ), [onContentTypeChanged])

    return (
        <form onSubmit={onSubmit} className={c(styles.flex, styles.column, styles.grow, styles.hidden)}>
            <Input name="title" placeholder="Title..." ref={createRef} readOnly={readOnly}/>
            <Tabs
                className={c(styles.flex, styles.column, styles.grow)}
                selectedTabPanelClassName={c(styles.grow, styles.scroll, styles.padding)}
                onSelect={onTabSelect}
                selectedIndex={getContentType(note.content) || 0}
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
                        fields={note.content as ContentListType}
                        createRef={createRef}
                        onFieldBlur={onListFieldBlur}
                        onFieldRemoved={onListFieldRemoved}
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
}

