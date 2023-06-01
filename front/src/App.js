import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Conversas from './components/Conversas';
import Mensagens from './components/Mensagens';
import NovaConversa from './components/NovaConversa';

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
          <li>
            <Link to="/nova-conversa">Nova Conversa</Link>
          </li>
        </ul>
      </nav>

      <Switch>
      <Route exact path="/" component={NovaConversa} />
        <Route path="/conversas">
          <Conversas />
        </Route>
        <Route path="/mensagens">
          <Mensagens />
        </Route>
        <Route path="/nova-conversa">
          <NovaConversa />
        </Route>
        <Route path="/chat/:id" component={Mensagens} />
      </Switch>
    </Router>
  );
}
