import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, TextField } from '@material-ui/core';
import { useState } from 'react';

export default function EditTaskDialog({task, onEdit}) {
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);

    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const edit = () => {
        onEdit(editTask());

        setOpen(false);
    }

    const editTask = () => {
        return {
            ...task,
            ...{ name,  description }
        };
    };

    return (
        <>
            <IconButton
                size='small'
                color='primary'
                onClick={openDialog}
            >
                <EditIcon fontSize='small' />
            </IconButton>
            <Dialog open={open} onClose={closeDialog} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Name'
                        placeholder='Name'
                        type='text'
                        fullWidth
                        autoComplete='off'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        margin='dense'
                        id='Description'
                        label='Description'
                        placeholder='Description'
                        type='text'
                        fullWidth
                        autoComplete='off'
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color='primary'>
                        Cancel
                    </Button>
                    <Button 
                        type='submit'
                        color='primary'
                        onClick={() => {
                            if(name && description) {
                                edit();
                                closeDialog();
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}