import React from 'react';
import ProjectList from './ProjectList';
import './App.css';
import PersonIcon from '@material-ui/icons/Person';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          name: '',
          shortSummary: '',
          icon: '',
          creationDate: ''
        }
      ],
    };
  }
  
  deleteProj = (delProj) => {
    const newProj = this.state.projects.filter((proj) => proj !== delProj);
    
    this.setState({projects: newProj});
  }

  render() {
    return (
      <div className="App">
        <ProjectList
          deleteProj={this.deleteProj}
          projects={this.state.projects} 
          onAdd={(name, shortSummary) => {
            this.setState({
              ...this.state,
              projects: [
                ...this.state.projects,
                {
                  name,
                  shortSummary,
                  icon: <PersonIcon color='primary' />,
                  creationDate: new Date()
                }
              ]
            })
        }}/>
      </div>
    );
  }
}

export default App;