import nextId from 'react-id-generator';

export const ON_ADD_TASK = 'ON_ADD_TASK';
export const ON_DELETE_TASK = 'ON_DELETE_TASK';
export const ON_EDIT_TASK = 'ON_EDIT_TASK';
export const ON_REORDER_TASKS = 'ON_REORDER_TASKS';

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
        case ON_DELETE_TASK:
            return deleteTaskTree(state, payload.id);
        case ON_EDIT_TASK:
            let item = state.find(task => task.id === payload.id);
            item.name = payload.name;
            item.description = payload.description;

            return [...state];
        case ON_REORDER_TASKS:
            payload.forEach(reorderedTask => {
                let task = state.find(t => reorderedTask.id === t.id);
                task.index = reorderedTask.index;
            });

            return [...state];
        default:
            return state;
    }
}

function findTaskTreeIds(tasks, taskId) {
    let ids = [taskId];
    
    let subTasks = tasks.filter(t => t.parentTaskId === taskId);
    subTasks.forEach(t => ids.push(...findTaskTreeIds(tasks, t.id)));

    return ids;
}

function deleteTaskTree(tasks, id) {
    let ids = findTaskTreeIds(tasks, id);
    return tasks.filter(t => !ids.includes(t.id));
}

export function getTasks(state, projectId, parentTaskId) {
    return state.tasks.filter(t => t.projectId === projectId && t.parentTaskId === parentTaskId)
        .sort((t1, t2) =>  {
            if (t1.index < t2.index) {
                return -1;
            }
            if (t1.index > t2.index) {
                return 1;
            }
            return 0;
        });
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

export function reorderTasks(reorderedTasks) {
    return {
        type: ON_REORDER_TASKS,
        payload: reorderedTasks
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
        index: 1
    }, 
    {
        id: 2,
        projectId: 1,
        parentTaskId: null,
        name: 'Task 1.2',
        description: 'Task 2 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
        index: 3
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
    },
    {
        id: 7,
        projectId: 1,
        parentTaskId: null,
        name: 'Task 3',
        description: 'Task 3 desc',
        creationDate: '',
        assignee: '',
        estimatedTime: '',
        status: false,
        workedTime: '',
        index: 2
    }
];