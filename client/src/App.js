import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Job Posting Board</h1>
        <Switch>
          <Route exact path="/" component={JobList} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/post-job" component={JobForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
