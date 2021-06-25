import React from 'react';
import ProjectList from './components/ProjectList';
import './App.css';
import ProjectForm from './components/ProjectForm';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {

  const projects = useSelector((state) => {
    return state.projects;
  });

  // const name = useSelector((state) => {
  //   return state.projects.name;
  // });

  const dispatch = useDispatch();

  // const onDelete = (delProj) => {
  //   setProjects(projects.filter((proj) => proj.id !== delProj.id));
  // }

  const onAdd = (name, shortSummary) => {
    dispatch({
      type: 'onAdd',
      payload: {
        name,
        shortSummary
      }
    });
  }

  return (
    <div className='App'>
      <ProjectForm onAdd={onAdd} />
      <ProjectList
        projects={projects}
        // onDelete={onDelete}
        // editProj={editProj}
      />
    </div>
  );
};