import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}
export const AddItemForm=memo((props: AddItemFormPropsType)=> {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    console.log("setTitle:", setTitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        //благодаря if (error), избавляемся от лишней перерисовки
        if (error) setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
                   disabled={props.disabled}
        />
        <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
            <AddBox />
        </IconButton>
    </div>
})
