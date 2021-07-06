import React from 'react';
import TasksPage from './pages/TasksPage';
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

export default function App({projects}) {
  return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route path='/projects' component={ProjectsPage} exact />
            <Route exact path='/project/:id' component={TasksPage} />
            <Redirect to='/projects' />
          </Switch>
        </BrowserRouter>
      </div>
  );
};