import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

export default function TasksDialog({onAdd}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newProps = () => {
        if(name && description) {
            onAdd(name, description);

            setName('');
            setDescription('');
            setOpen(false);
        }
    }

    return (
        <>
            <Button
                style={{
                    float: 'right',
                    position: 'relative',
                    top: '15px'
                }}
                color='primary'
                onClick={() => {
                    handleClickOpen();
                }}
            >
                <AddIcon fontSize='small' />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
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
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button 
                        type='submit'
                        color='primary'
                        onClick={() => {
                            if(name && description) {
                                newProps();
                                handleClose();
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