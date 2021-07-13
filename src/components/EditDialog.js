import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

export default function EditDialog(props) {
    const [name, setName] = useState(props.project.name);
    const [shortSummary, setShortSummary] = useState(props.project.shortSummary);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newProps = () => {
        if(name && shortSummary) {
            props.onEdit(name, shortSummary, props.project);
            setOpen(false);
        }
    }

    return (
        <div>
            <Button
                size='small' 
                onClick={() => {
                    handleClickOpen();
                }}
            >
                Edit<EditIcon color='primary' />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Add Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Name'
                        placeholder='Name'
                        type='text'
                        value={name}
                        fullWidth
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        margin='dense'
                        id='Summary'
                        label='Summary'
                        placeholder='Summary'
                        type='text'
                        value={shortSummary}
                        fullWidth
                        onChange={(e) => {
                            setShortSummary(e.target.value);
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
                            if(name && shortSummary) {
                                newProps();
                                handleClose();
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}