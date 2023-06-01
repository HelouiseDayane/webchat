import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Conversas from './components/Conversas';
import Mensagens from './components/Mensagens';

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/conversas">Conversas</Link>
          </li>
          <li>
            <Link to="/mensagens">Mensagens</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/conversas">
          <Conversas />
        </Route>
        <Route path="/mensagens">
          <Mensagens />
        </Route>
      </Switch>
    </Router>
  );
}
