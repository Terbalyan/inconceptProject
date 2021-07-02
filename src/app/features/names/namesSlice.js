const GET_NAME = 'GET_NAME';

export default function NamesReducer(state={}, action) {
    switch (action.type) {
        case GET_NAME:
            return {
                name: action.payload.name
            }
            
        default:
            return state;
    }
}

export const initialName = {
    name: ''
}

export function getName(state) {
    return state.names;
}

export function getNamee(newName) {
    return {
        type: GET_NAME,
        payload: {
          name: newName
        }
    }
}