import React from 'react';
import ProjectList from './scripts/components/ProjectList';
import './App.css';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useState } from 'react';

export default function App() {
    const [projects, setProjects] = useState([
      {
        name: 'dasd',
        shortSummary: 'asdasdasd',
        icon: <AccountTreeIcon color='primary' />,
        creationDate: ''
      }
    ]);

    const deleteProj = (delProj) => {
      const newProj = projects.filter((proj) => proj !== delProj);
      
      setProjects(newProj);
    }

    return (
      <div className="App">
        <ProjectList
          projects={projects}
          deleteProj={deleteProj}
          onAdd={(name, shortSummary) => {
            setProjects([
              ...projects,
                {
                  name,
                  shortSummary,
                  icon: <AccountTreeIcon color='primary' />,
                  creationDate: new Date()
                }
              ])
        }}/>
      </div>
    );
  };