import nextId from 'react-id-generator';
export const ON_ADD_TASK = 'ON_ADD_TASK';
export const DRAG_HAPPENED = 'DRAG_HAPPENED'; 
export const ON_DELETE_TASK = 'ON_DELETE_TASK';
export const ON_EDIT_TASK = 'ON_EDIT_TASK';

export default function tasksReducer(state=[], action) {
    const payload = action.payload;

    switch (action.type) {
        case ON_ADD_TASK:
            return [
                ...state,
                {
                    id: nextId(),
                    parentTaskId: payload.parentTaskId,
                    projectId: payload.projectId,
                    name: payload.name,
                    description: payload.description,
                    creationDate: '',
                    assignee: '',
                    estimatedTime: '',
                    status: false,
                    workedTime: ''
                }
            ];
        case DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                draggableId
            } = payload;
            
            if(droppableIdStart === droppableIdEnd) {
                const [reorderedItem] = state.splice(droppableIndexStart, 1);
                state.splice(droppableIndexEnd, 0, reorderedItem);

                return [...state];
            }

            // if(droppableIdStart !== droppableIdEnd) {
            //     const [reorderedItemStart] = state.splice(droppableIndexStart, 1);

            //     const [reorderedItemEnd] = state.splice(droppableIndexStart, 1);

            //     state.splice(reorderedItemEnd, 0, reorderedItemStart); 
            //     return [...state];
            // }

            break;
        case ON_DELETE_TASK:
            return deleteTaskTree(state, payload.id);
        case ON_EDIT_TASK:
            let item = state.find(task => task.id === payload.id);
            item.name = payload.name;
            item.description = payload.description;

            return [...state];
        default:
            return state;
    }
}

function deleteTaskTree(state, id) {
    let subTasks = state.filter(t => t.parentTaskId === id);
    subTasks.forEach(t => state = deleteTaskTree(state, t.id));
    
    return state.filter(t => t.id !== id);
}

export function getTasks(state, projectId, parentTaskId) {
    return state.tasks.filter(t => t.projectId === projectId && t.parentTaskId === parentTaskId);
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    return {
        type: DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }
    }
}

export function addTask(task) {
    return {
        type: ON_ADD_TASK,
        payload: task
    }
}

export function deleteTask(id) {
    return {
        type: ON_DELETE_TASK,
        payload: {
          id: id
        }
    }
}

export function editTask(task) {
    return {
        type: ON_EDIT_TASK,
        payload: task
    }
}

export const initialTasks = [
    {
        id: 1,
        projectId: 1,
        parentTaskId: null,
        name: 'Task 1',
        description: 'Task 1 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
    }, 
    {
        id: 2,
        projectId: 1,
        parentTaskId: null,
        name: 'Task 2',
        description: 'Task 2 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
    },
    {
        id: 3,
        projectId: 1,
        parentTaskId: 1,
        name: 'Task 1.1',
        description: 'Task 1.1 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
    },
    {
        id: 4,
        projectId: 1,
        parentTaskId: 3,
        name: 'Task 1.1.1',
        description: 'Task 1.1.1 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
    },
    {
        id: 5,
        projectId: 1,
        parentTaskId: 3,
        name: 'Task 1.1.2',
        description: 'Task 1.1.2 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
    },
    {
        id: 6,
        projectId: 2,
        parentTaskId: null,
        name: 'Task 2',
        description: 'Task 2 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
    }
];