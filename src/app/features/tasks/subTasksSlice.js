export const ON_ADD_SUB_TASK = 'ON_ADD_SUBTASK';

export default function subTasksReducer(state=[], action) {
    const payload = action.payload;

    switch (action.type) {
        case ON_ADD_SUB_TASK:
            return [
                ...state,
                {
                    id: state[state.length - 1].id + 1,
                    taskId: payload.taskId,
                    name: payload.name,
                    description: payload.description,
                    creationDate: '',
                    assignee: '',
                    estimatedTime: '',
                    status: false,
                    workedTime: ''
                }
            ];
        // case ON_DELETE:
        //     return state.filter(proj => proj.id !== payload.id);
        // case ON_EDIT:
        //     let item = state.find(proj => proj.id === payload.id);
        //     item.name = payload.name;
        //     item.shortSummary = payload.shortSummary;

        //     return [...state];
        default:
            return state;
    } 
}


export const initialSubTasks = [
    {
        id: 1,
        taskId: 1,
        name: 'aa',
        description: 'bb',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: ''
    }
];

export function getSubTasks(state, id) {
    return state.subTasks.filter(subTask => subTask.taskId === id);
}

export function editNameDescription(newName, newDescription, newTaskID) {
    return {
        type: ON_ADD_SUB_TASK,
        payload: {
            name: newName,
            description: newDescription,
            taskId: newTaskID
        }
    }
}