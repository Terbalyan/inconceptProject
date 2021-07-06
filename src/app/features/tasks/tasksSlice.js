export const ON_ADD_TASK = 'ON_ADD_TASK';

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