import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditDialog from './EditDialog';

export default function ProjectItem({project, onDelete, onEdit}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const history = useHistory();
    const navigateTo = () => history.push('/tasks');

    return (
        <div
            key={project.id} 
            className='inlineDisplay'
        >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancle
                    </Button>
                    <Button onClick={() => {
                        handleClose();
                        onDelete(project);
                    }} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <div onClick={navigateTo}>
                <div className='headerPossition'>
                    <p>{project.icon}</p>
                    <h3>{project.name}</h3>
                </div>
                <div className='middlePossition'>
                    <h3>{project.shortSummary}</h3>
                    <hr/>
                    <span className='date'>
                        {project.creationDate = moment().format('MM/DD/YY')}
                    </span>
                </div>
            </div>
            <div className='possition'>
                <Button 
                    size='small' 
                    onClick={() => {
                        handleClickOpen();
                    }}
                >
                    <DeleteIcon
                        color='primary' 
                    />Delete
                </Button>
                <div>
                    <EditDialog
                        onEdit={onEdit} 
                        project={project}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};