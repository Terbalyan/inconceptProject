export const ON_ADD_TASK = 'ON_ADD_TASK';
export const DRAG_HAPPENED = 'DRAG_HAPPENED'; 
export const ON_SEARCH = 'ON_SEARCH';
export const DELETE_TASK = 'ON_DELETE';
export const ON_EDIT = 'ON_EDIT';

export default function tasksReducer(state=[], action) {
    const payload = action.payload;

    switch (action.type) {
        case ON_ADD_TASK:
            return [
                ...state,
                {
                    id: state[state.length - 1].id + 1,
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
            break;
        case DELETE_TASK:
            return state.filter(proj => proj.id !== payload.id);
        case ON_EDIT:
            let item = state.find(proj => proj.id === payload.id);
            item.name = payload.name;
            item.shortSummary = payload.shortSummary;

            return [...state];
        default:
            return state;
    }
}

export const initialTasks = [
    {
        id: 1,
        projectId: 2,
        name: 'asdasd',
        description: 'babab',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: ''
    }
];

export function getTasks(state, id) {
    return state.tasks.filter(task => task.projectId === id);
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

export function editNameDescription(newName, newDescription, newProjectId) {
    return {
        type: ON_ADD_TASK,
        payload: {
            name: newName,
            description: newDescription,
            projectId: newProjectId,
        }
    }
}

export function deleteTask(newTaskId) {
    return {
        type: DELETE_TASK,
        payload: {
          id: newTaskId
        }
    }
}

export function editTask(newName, newDescription, newTaskId) {
    return {
        type: ON_EDIT,
        payload: {
            name: newName,
            description: newDescription,
            id: newTaskId,
        }
    }
}