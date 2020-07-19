import React from 'react'
import c from 'class-names'
import {TextArea} from './TextArea'
import {Input} from './Input'
import styles from './CreateForm.module.scss'


export const CreateForm = ({children, titleProps, contentProps, className, ...props}) => (
    <form className={c(styles.form, className)} {...props}>
        <Input {...titleProps}/>
        <TextArea {...contentProps} className={c(styles.textarea, contentProps && contentProps.className)}/>
        {children}
    </form>
)