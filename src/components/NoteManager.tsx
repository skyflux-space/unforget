import React, {ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useState} from 'react'
import {useFieldArray, useForm} from 'react-hook-form'
import {useDeepCompareEffect} from 'react-use'
import {
    always,
    apply,
    applySpec,
    assoc,
    both,
    complement,
    converge,
    equals,
    findIndex,
    identity,
    inc,
    isNil,
    lt,
    map,
    partition,
    path,
    pipe,
    prop,
    propOr,
    sortBy,
    when
} from 'ramda'
import {convertContentToList, convertContentToString, getContentType, useNote} from '../models/note'
import {ContentList, ContentListItem, ContentType, Note} from '../models/note/types'
import {NoteForm} from '../ui'


export type NoteManagerProps = {
    id: string
    readOnly?: boolean
}

export const NoteManager: React.FC<NoteManagerProps> = ({id, readOnly}) => {
    const {note, update} = useNote(id)
    const [defaultValues, setDefaultValues] = useState<Partial<Note> | undefined>(undefined)

    const {register, watch, control, reset} = useForm()
    const {fields, append, remove, move} = useFieldArray<ContentListItem>({
        control,
        name: 'content'
    })

    useEffect(() => {
        if (note && !defaultValues)
            setDefaultValues(note)
    }, [defaultValues, setDefaultValues, note, reset])

    useEffect(() => reset(defaultValues), [reset, defaultValues])

    const data: Partial<Note> = watch()

    useDeepCompareEffect(pipe(
        always(data),
        when(
            pipe(propOr([], 'content'), getContentType, both(complement(isNil), equals(ContentType.List))),
            converge(assoc('content'), [
                pipe(
                    propOr([], 'content'),
                    sortBy(prop('index')) as (notes: any[]) => any[],
                ),
                identity,
            ])
        ),
        update,
    ), [data])

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
        pipe(applySpec({
                text: path(['target', 'value']),
                index: inc(apply(
                    Math.max,
                    map(pipe(propOr(-Infinity, 'index'), Number), propOr([], 'content', data))
                )),
            }),
            append,
        ),
        [append, data],
    )

    const onCheck = (i: number, value: boolean) => {
        const {index} = fields[i]
        if (index !== undefined) {
            const [checked, unchecked] = partition(propOr(false, 'checked'), data.content as ContentList)
            let newIndex: number | undefined
            if (value) {
                const nearestChecked = findIndex(pipe(propOr(-Infinity, 'index'), Number, lt(index)), checked)
                if (nearestChecked !== -1)
                    newIndex = unchecked.length + nearestChecked - 1
                else
                    newIndex = unchecked.length + checked.length - 1
            } else {
                const nearestUnchecked = findIndex(pipe(propOr(-Infinity, 'index'), Number, lt(index)), unchecked)
                if (nearestUnchecked === -1)
                    newIndex = unchecked.length
                else
                    newIndex = nearestUnchecked
            }
            move(i, newIndex)
        }
    }

    return (
        <NoteForm
            createRef={register}
            createOnListFieldBlur={createOnListFieldBlur}
            onListStaticInputChange={createFieldFromStaticFieldValue}
            contentListFields={fields}
            onTabSelect={onTabSelect}
            type={getContentType(defaultValues?.content)}
            readOnly={readOnly}
            onListFieldRemoved={remove}
            onListFieldChecked={onCheck}
        />
    )
}