import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

export default function FormDialog(props) {
    const [name, setName] = useState('');
    const [shortSummary, setShortSummary] = useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newProps = () => {
        if(name && shortSummary) {
            props.onAdd(name, shortSummary);

            setName('');
            setShortSummary('');
            setOpen(false);
        }
    }

    return (
        <div>
            <Button
                name='addProject'
                className='changeDisplay'
                color='primary'
                variant='contained'
                onClick={handleClickOpen}
            >
                <AddIcon />new project
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
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}