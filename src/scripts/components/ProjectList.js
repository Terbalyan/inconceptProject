import React from "react";
import Popup from "./Popup";
import './styles/ProjectList.css';
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";


export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            shortSummary: '',
            buttonProp: false,
            btnDisplay: ''
        };
    }

    render() {
        const {onAdd, deleteProj} = this.props;
        let {name, shortSummary, buttonProp, btnDisplay} = this.state;
        
        return (
            <>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className='popup'>
                        <Button 
                            id='btn' 
                            color='primary' 
                            variant='contained'
                            type='reset' 
                            onClick={() => {
                                this.setState({
                                    buttonProp: true,
                                    btnDisplay: document.getElementById('btn').style.display = 'none'
                                });
                            }}><Add />
                        </Button>
                    </div>
                    <>
                        <Popup trigger={buttonProp}>
                            <TextField
                                label='Name'
                                placeholder='Name'
                                type='text'
                                value={name}
                                onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }}
                            />

                            <TextField 
                                label='Summary'
                                placeholder='Summary'
                                type='text' 
                                value={shortSummary}
                                onChange={(e) => {
                                    this.setState({
                                        shortSummary: e.target.value
                                    })
                                }}
                            />

                            <Button
                                id='customPadding'
                                type='submit'
                                color='primary'
                                variant='contained' 
                                onClick={() => {
                                    if(name && shortSummary) {
                                        this.setState({ 
                                            name: '', 
                                            shortSummary: '', 
                                            buttonProp: false,
                                            btnDisplay: document.getElementById('btn').style.display = 'flex' 
                                        });
                                        
                                        onAdd(name, shortSummary);
                                    }
                                }}>Submit</Button>
                        </Popup>
                    </>
                </form>
                <div>
                    {
                        this.props.projects.map((project, index) => {
                            return (project.name !== '') ? (
                                <div key={index} className='inlineDisplay'>
                                    <div className='headerPossition'>
                                        <p>{project.icon}</p>
                                        <h3>{project.name}</h3>
                                    </div>
                                    <div className='midPoss'>
                                        <h3>{project.shortSummary}</h3>
                                        <hr></hr>
                                        <span className='date'>
                                            {project.creationDate = moment().format('MM/DD/YY')}
                                        </span>
                                    </div>
                                    <div className='possition'>
                                        <Button 
                                            size='small' onClick={
                                                deleteProj.bind(null, project)
                                        }><DeleteIcon
                                            color='primary' 
                                        />Delete
                                        </Button>
                                        <Button size='small'>
                                            Edit<EditIcon color='primary' />
                                        </Button>
                                    </div>
                                </div>
                            ) : null;
                        })
                    }
                </div>
            </>
        )
    }
}