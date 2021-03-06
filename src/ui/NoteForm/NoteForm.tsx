import React, {FocusEventHandler, FormEventHandler, memo, useCallback, useMemo} from 'react'
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs'
import c from 'classnames'
import {always, cond, equals, identity, ifElse, isNil, pipe} from 'ramda'
import {Note} from '../../models/note'
import {ContentList as ContentListType, ContentType, getContentType} from '../../models/content'
import {ContentList, Icon, Input, TextArea} from '..'
import styles from './NoteForm.module.scss'


export type CreateFormProps = {
    note: Note
    readOnly?: boolean
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onContentTypeChanged?: (type: ContentType) => void
    onListStaticInputChange?: (text: string) => void
    onListFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    onListFieldRemoved?: (i: number | string) => void
    onSubmit?: FormEventHandler<HTMLFormElement>
}

export const NoteForm: React.FC<CreateFormProps> = memo((
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

    const contentType = useMemo(() => getContentType(note.content), [note.content])

    return (
        <form onSubmit={onSubmit} className={c(styles.flex, styles.column, styles.grow, styles.hidden)}>
            <input name="id" readOnly hidden value={note.id} ref={createRef}/>
            <input name="pinned" type="checkbox" readOnly hidden checked={note.pinned} ref={createRef}/>
            <Input name="title" placeholder="Title..." hidden={readOnly && !note.title} ref={createRef} readOnly={readOnly}/>
            <div className={styles.divider}/>
            <Tabs
                className={c(styles.flex, styles.column, styles.grow)}
                selectedTabPanelClassName={c(styles.grow, styles.scroll, styles.padding)}
                onSelect={onTabSelect}
                selectedIndex={contentType || 0}
            >
                <TabPanel>
                    <TextArea
                        name="textContent"
                        placeholder="Note..."
                        fullSize
                        ref={createRef}
                        withoutDefault
                        readOnly={readOnly}
                        className={styles.round}
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
                            <>
                                <div className={styles.divider}/>
                                <div className={styles.flex}>
                                    <TabList
                                        className={c(styles.flex, styles.grow, styles.end, styles.padding, styles.footer)}>
                                        <Tab className={styles.switch}>
                                            <Icon icon="text" active={contentType === ContentType.String}/>
                                        </Tab>
                                        <Tab className={styles.switch}>
                                            <Icon icon="list" active={contentType === ContentType.List}/>
                                        </Tab>
                                    </TabList>
                                </div>
                            </>
                        ) : null
                }
            </Tabs>
        </form>
    )
})