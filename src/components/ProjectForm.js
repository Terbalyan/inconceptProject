import Popup from './Popup';
import { TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ProjectForm({onAdd}) {
    const [name, setName] = useState('');
    const [shortSummary, setShortSummary] = useState('');
    const [buttonProp, setButtonProp] = useState(false);

    const dispatch = useDispatch();

    const newProps = () => {
        if(name && shortSummary) {
            onAdd(name, shortSummary);

            setName('');
            setShortSummary('');
            setButtonProp(false);
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
        }}>
            <div>
                <Button
                    className='changeDisplay'
                    color='primary'
                    variant='contained'
                    type='reset'
                    onClick={() => setButtonProp(true)}
                >
                    <Add className='icon' />New Project
                </Button>
            </div>
            <>
                <Popup 
                    trigger={buttonProp} 
                    setName={setName} 
                    shortSummary={setShortSummary} 
                    setTrigger={setButtonProp}
                >
                    <TextField
                        label='Name'
                        placeholder='Name'
                        type='text'
                        value={name}
                        onChange={(e) => {
                            dispatch({
                                type: 'onAdd',
                                payload: {
                                    name: e.target.value
                                }
                            });
                            // setName(e.target.value);
                        }}
                    />

                    <TextField
                        label='Summary'
                        placeholder='Summary'
                        type='text'
                        value={shortSummary}
                        onChange={(e) => {
                            setShortSummary(e.target.value);
                        }}
                    />

                    <Button className=''
                        id='customPadding'
                        type='submit'
                        color='primary'
                        variant='contained' 
                        onClick={() => {
                            newProps();
                        }}
                    >
                        Submit
                    </Button>
                </Popup>
            </>
        </form>
    );
};