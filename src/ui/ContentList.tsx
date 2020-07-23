import React, {ChangeEventHandler, FocusEventHandler, memo} from 'react'
import PropTypes from 'prop-types'
import {ContentListItem as ContentListItemType, Identifiable} from '../models/note/types'
import {ContentListItemPropType} from '../models/note'
import {ContentListItem} from '../ui'

export type ContentListProps = {
    fields: (ContentListItemType & Identifiable)[]
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onContentInputBlur?: FocusEventHandler<HTMLTextAreaElement>
    createOnContentInputBlur?: (i: number) => FocusEventHandler<HTMLTextAreaElement>
    onStaticInputChange?: ChangeEventHandler<HTMLTextAreaElement>

}

export const ContentList: React.FC<ContentListProps> = memo((
    {fields, createRef, onContentInputBlur, createOnContentInputBlur, onStaticInputChange}
    ) => (
        <ul>
            {fields.map((e, i) => (
                <li key={e.id}>
                    <ContentListItem
                        onBlur={createOnContentInputBlur?.(i) || onContentInputBlur}
                        defaultText={e.text}
                        checked={e.checked}
                        ref={createRef?.()}
                        name={`content[${i}]`}
                    />
                </li>
            ))}
            <li>
                <ContentListItem
                    disabled
                    onTextChange={onStaticInputChange}
                    checked={false}
                />
            </li>
        </ul>
    )
)

ContentList.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        ...ContentListItemPropType,
        id: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    createRef: PropTypes.func,
    onContentInputBlur: PropTypes.func,
    createOnContentInputBlur: PropTypes.func,
    onStaticInputChange: PropTypes.func,
}