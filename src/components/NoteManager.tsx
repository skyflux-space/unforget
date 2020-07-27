import React, {ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useState} from 'react'
import {useFieldArray, useForm} from 'react-hook-form'
import {useDeepCompareEffect} from 'react-use'
import {convertContentToList, convertContentToString, getContentType, useNote} from '../models/note'
import {ContentListItem, Note} from '../models/note/types'
import {NoteForm} from '../ui'


export type NoteManagerProps = {
    id: string
    readOnly?: boolean
}

export const NoteManager: React.FC<NoteManagerProps> = ({id, readOnly}) => {
    const {note, update} = useNote(id)
    const [defaultValues, setDefaultValues] = useState<Partial<Note> | undefined>(undefined)

    const {register, watch, control, reset} = useForm()
    const {fields, append, remove} = useFieldArray<ContentListItem>({
        control,
        name: 'content',
    })

    useEffect(() => {
        if(note && !defaultValues)
            setDefaultValues(note)
    }, [defaultValues, setDefaultValues, note])

    useEffect(() => reset(defaultValues), [reset, defaultValues])

    const data = watch()

    useDeepCompareEffect(() => void (update(data)), [data])

    const onTabSelect = useCallback((i: number) => {
        const {content} = data
        if (i === 0 && Array.isArray(content))
            setDefaultValues({content: convertContentToString(content)})

        if (i === 1 && typeof content === 'string')
            setDefaultValues({content: convertContentToList(content)})
    }, [setDefaultValues, data])

    const createOnListFieldBlur = useCallback(
        (i: number): FocusEventHandler<HTMLTextAreaElement> => ({target}) => !target.value && remove(i),
        [remove],
    )

    const createFieldFromStaticFieldValue: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
        ({target}) => append({text: target.value}),
        [append],
    )

    return (
            <NoteForm
                createRef={register}
                createOnListFieldBlur={createOnListFieldBlur}
                onListStaticInputChange={createFieldFromStaticFieldValue}
                contentListFields={fields}
                onTabSelect={onTabSelect}
                type={getContentType(defaultValues?.content)}
                readOnly={readOnly}
            />
    )
}