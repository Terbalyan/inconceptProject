import React from 'react';
import ProjectList from './components/ProjectList';
import './App.css';
import ProjectForm from './components/ProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, editNameShortSummary, deleteProj, editProj } from './app/features/projects/projectsSlice';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';

export default function App() {
  const dispatch = useDispatch();
  
  const projects = useSelector(getProjects);

  const onAdd = (name, shortSummary) => {
    dispatch(editNameShortSummary(name, shortSummary));
  }

  const onDelete = (deleteProject) => {
    dispatch(deleteProj(deleteProject));
  }

  const onEdit = (name, shortSummary, editProject) => {
    dispatch(editProj(name, shortSummary, editProject));
  }

  return (
    <BrowserRouter basename='projects'>
      <div className='App'>
        <ProjectForm onAdd={onAdd} />
        <ProjectList
          projects={projects}
          onDelete={onDelete}
          onAdd={onAdd}
          onEdit={onEdit}
        />
      </div>

      <Switch>
        <Route path='/' component={ProjectForm} exact />
        <Route path='/tasks' component={Tasks} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};