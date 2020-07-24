import React, {ChangeEventHandler, FocusEventHandler, useCallback} from 'react'
import {useFieldArray, useForm} from 'react-hook-form'
import {useDeepCompareEffect} from 'react-use'
import {convertContentToList, convertContentToString, useCreateNote} from '../models/note'
import {ContentListItem} from '../models/note/types'
import {CreateForm, Header} from '../ui'


export const Create = () => {
    const {update} = useCreateNote()

    const {register, watch, control, reset} = useForm()
    const {fields, append, remove} = useFieldArray<ContentListItem>({
        control,
        name: 'content',
    })

    const data = watch()

    const save = useCallback(() => update(data), [update, data])

    useDeepCompareEffect(() => void(update(data)), [data])

    const onTabSelect = useCallback((i: number) => {
        const {content} = data
        if (i === 0 && Array.isArray(content))
            reset({content: convertContentToString(content)})

        if (i === 1 && typeof content === 'string')
            reset({content: convertContentToList(content)})
    }, [reset, data])

    const createOnListFieldBlur = useCallback(
        (i: number): FocusEventHandler<HTMLTextAreaElement> => ({target}) => !target.value && remove(i),
        [remove],
    )

    const createFieldFromStaticFieldValue: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
        ({target}) => append({text: target.value}),
        [append],
    )

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header onBackClick={save}/>
            <CreateForm
                createRef={register}
                createOnListFieldBlur={createOnListFieldBlur}
                onListStaticInputChange={createFieldFromStaticFieldValue}
                contentListFields={fields}
                onTabSelect={onTabSelect}
            />
        </div>
    )
}