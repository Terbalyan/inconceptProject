import { useDispatch, useSelector } from "react-redux"
import { editNameDescription, getSubTasks } from "../app/features/tasks/subTasksSlice"
import SubTasksDialog from '../components/SubTasksDialog';
import IconButton from '@material-ui/core/IconButton';
import { Box } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import Collapse from '@material-ui/core/Collapse';


export default function SubTasks({taskID, open}) {
    const subTasks = useSelector(state => getSubTasks(state, taskID))
    const dispatch = useDispatch();

    const onAdd = (name, description) => {
        dispatch(editNameDescription(name, description, taskID));
    }
    
    return (
        <div>
            {
              subTasks.map(subTask => 
                  <div draggable key={subTask.id} style={{position: 'relative', left: '.5rem'}} >
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <Box
                          boxShadow={1}
                          bgcolor="background.paper"
                          m={1}
                          p={1}
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                          <p>
                            <strong>{subTask.name}</strong>
                          </p>
                          <p>{subTask.description}</p>
                          <p>
                            <small>
                                {subTask.creationDate = moment().format('MM/DD/YY')}
                            </small>
                          </p>
                          <Avatar aria-label="recipe">T</Avatar>
                            <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                              <IconButton  aria-label="delete" size="small">
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                              <IconButton aria-label="delete" size="small">
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            </div>
                        </Box>
                      </Collapse>
                  </div>
                )
            }
            <SubTasksDialog onAdd={onAdd} />
        </div>
    )
}