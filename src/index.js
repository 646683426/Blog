import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import List from './pages/list';
import Detail from './pages/detail'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Switch>
      <Route  exact path='/' component={App} />
      <Route  path='/list' component={List} />
      <Route  path='/detail' component={Detail} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
reportWebVitals();
