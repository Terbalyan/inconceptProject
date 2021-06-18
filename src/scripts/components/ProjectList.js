import React, { useState } from "react";
import Popup from "./Popup";
import '../../styles/ProjectList.css';
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";


export default function ProjectList({projects, deleteProj, onAdd}) {
    const [name, setName] = useState('');
    const [shortSummary, setShortSummary] = useState('');
    const [buttonProp, setButtonProp] = useState(false);
    
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <div className='popup'>
                    <Button
                        id='button'
                        className='changeDisplay'
                        color='primary'
                        variant='contained'
                        type='reset'
                        onClick={() => {
                            setButtonProp(true);
                                
                            // setButtonDisplay([
                                // document.getElementsByClassName('changeDisplay').style.display = 'none';
                                document.getElementById('button').style.display = 'none';
                                document.getElementById('project').style.display = 'none'

                            // ])
                        }}><Add className='icon' />
                    </Button>
                </div>
                <>
                    <Popup trigger={buttonProp}>
                        <TextField
                            id='name'
                            label='Name'
                            placeholder='Name'
                            type='text'
                            // value={name}
                            onChange={(e) => {
                                setName(e.target.value);
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

                        <Button
                            id='customPadding'
                            type='submit'
                            color='primary'
                            variant='contained' 
                            onClick={() => {
                                
                                if(name && shortSummary) { ///??????????????????????????????//
                                    onAdd(name, shortSummary);
                                    setName('');
                                    setShortSummary('');

                                    // setButtonDisplay([
                                        // document.getElementsByClassName('changeDisplay').style.display = 'flex'
                                        document.getElementById('button').style.display = 'flex'
                                        document.getElementById('project').style.display = 'flex'
                                    // ])
                                    setButtonProp(false);
                                }
                                
                            }}>Submit</Button>
                    </Popup>
                </>
            </form>
            <div id='project' className='changeDisplay'>
                {
                    projects.map((project, index) => {
                        return (project.name !== '') ? (
                            <div key={index} className='inlineDisplay'>
                                <div className='headerPossition'>
                                    <p>{project.icon}</p>
                                    <h3 id='b'>{project.name}</h3>
                                </div>
                                <div className='middlePossition'>
                                    <h3>{project.shortSummary}</h3>
                                    <hr/>
                                    <span className='date'>
                                        {project.creationDate = moment().format('MM/DD/YY')}
                                    </span>
                                </div>
                                <div className='possition'>
                                    <Button 
                                        size='small' onClick={() => {
                                            deleteProj(project)
                                    }}><DeleteIcon
                                        color='primary' 
                                    />Delete
                                    </Button>
                                    <div>
                                        <Button size='small' onClick={() => {
                                            deleteProj(project)

                                            // document.getElementsByClassName('changeDisplay').style.display = 'none';
                                            document.getElementById('button').style.display = 'none';
                                            document.getElementById('project').style.display = 'none';

                                            // document.getElementById('name').value = project.name;
                                            
                                            setButtonProp(true);
                                        }}>
                                            Edit<EditIcon color='primary' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : null;
                    })
                }
            </div>
        </>
    );
};