import { TextField } from '@material-ui/core';

export default function Search(props) {
    return (
        <TextField 
            id='standard-search' 
            placeholder='Search' 
            label='Search' 
            type='text'
            onChange={({ target: { value } }) => props.search(value)}
        />
    )
}