import React from 'react'
import AppState from './context/app/appState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthSpotify from './components/AuthSpotify';
import Token from './components/Token';
import ListadoPlaylist from './components/ListadoPlaylist';
import ListadoDispositivos from './components/ListadoDispositivos';
import Alarma from './components/Alarma';

const App = () =>{

    return (
      <div className="container">
          <AppState>
            <Router>
                <Switch>
                  <Route exact path="/" component={Alarma} /> 
                  <Route exact path="/autorization" component={AuthSpotify} />
                  <Route exact path="/token" component={Token} />
                  <Route exact path="/lista-playlist" component={ListadoPlaylist} />
                  <Route exact path="/lista-dispositivos" component={ListadoDispositivos} />
                </Switch>
              </Router>
          </AppState>
        </div>
     );

}

export default App;