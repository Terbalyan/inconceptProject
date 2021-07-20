import { useDispatch, useSelector } from 'react-redux';
import { getTasks, reorderTasks } from '../app/features/tasks/tasksSlice';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useCallback, useState } from 'react'
import update from 'immutability-helper';

export default function TaskList({projectId=null, parentTaskId=null, ItemComponent}) {
    const dispatch = useDispatch();
    let tasks = useSelector(state => getTasks(state, projectId, parentTaskId));
    const [orderedTasks, setOrderedTasks] = useState(tasks);
    
    const renderItem = (item) => {
        return (
            <ItemComponent 
                key={item.id}
                task={item}
                move={move}
                dropTask={drop}
            />
        )
    }

    const move = useCallback(
        (dragItem, hoverItem) => {
            let dragIndex = orderedTasks.findIndex(t => t.id === dragItem.id);
            let hoverIndex = orderedTasks.findIndex(t => t.id === hoverItem.id);
            setOrderedTasks(
                update(orderedTasks, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragItem],
                    ]
                }),
            );
        },
        [orderedTasks]
    );

    const drop = () => {
        orderTasks();
        updateTasksOrder(orderedTasks.map(t => { return { id: t.id, index: t.index } }));
    };

    function orderTasks() {
        orderedTasks.forEach((t, i) => {
            t.index = i + 1;
        });
    }

    const updateTasksOrder = (tasks) => {
        dispatch(reorderTasks(tasks));
    }
        
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {
                    tasks.length ?
                        tasks.map((task) => {
                            return renderItem(task);
                        }) 
                    : <p>Empty</p>
                }
            </div>
        </DndProvider>
        
    )
}