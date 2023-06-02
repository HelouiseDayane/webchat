import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Conversas from './components/Conversas';
import Mensagens from './components/Mensagens';
import NovaConversa from './components/NovaConversa';
import AreaAtendente from './components/AreaAtendente';

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
        <Route path="/conversas" component={Conversas} />
        <Route path="/mensagens/:id_conversa" component={Mensagens} />
        <Route path="/nova-conversa" component={NovaConversa} />
        <Route path="/conversa/:id_conversa" component={Mensagens} />
        <Route path="/AreaAtendente" component={AreaAtendente} />
      </Switch>
    </Router>
  );
}
