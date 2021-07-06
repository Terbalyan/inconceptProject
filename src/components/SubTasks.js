import { useDispatch, useSelector } from "react-redux"
import { editNameDescription, getSubTasks } from "../app/features/tasks/subTasksSlice"
import SubTasksDialog from '../components/SubTasksDialog';


export default function SubTasks({taskID}) {
    const tasks = useSelector(state => getSubTasks(state, taskID))
    const dispatch = useDispatch();

    const onAdd = (name, description) => {
        dispatch(editNameDescription(name, description, taskID));
    }
    
    return (
        <div>
            {
                tasks.map(task => 
                    <div key={task.id}>
                        {task.name}
                    </div>
                )
            }
            <SubTasksDialog onAdd={onAdd} />
        </div>
    )
}