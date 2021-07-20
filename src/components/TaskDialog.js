import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, TextField } from '@material-ui/core';
import { useState } from 'react';

export default function TaskDialog({projectId, parentTaskId, onAdd}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const add = () => {
        onAdd(createTask());

        setName('');
        setDescription('');
        setOpen(false);
    }

    const createTask = () => {
        return {
            projectId: projectId,
            parentTaskId: parentTaskId,
            name: name,
            description: description,
        }
    };

    return (
        <>
            <div>
                <IconButton
                    size='small'
                    color='primary'
                    onClick={openDialog}
                >
                    <AddIcon fontSize='small' />
                </IconButton>
            </div>
            <Dialog open={open} onClose={closeDialog} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Add Task</DialogTitle>
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
                                add();
                                closeDialog();
                            }
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}