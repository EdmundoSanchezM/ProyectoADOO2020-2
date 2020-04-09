import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RegistroMercancia from './components/RegistroMercancia';

import Section from 'react-bulma-components/lib/components/section';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';

class App extends Component {
  render() {
    return <Section>
      <div className="container has-text-centered">
        <Router>
          <Route exact path="/" render={() => {
            return <div>
              <Heading>
                Proyecto ADOO
              </Heading>
              <Content>
                <p>Sea usted bienvenido a un sistema que hace el cáculo de estados financieros.
                <br></br>
                Espero que este mensaje básico no interfiera con su experiencia :)
                </p>
                <Link to="/registromercancia">
                  <Button renderAs="button" color="success">
                    Comenzar
                  </Button>
                </Link>
              </Content>
            </div>
          }}>
          </Route>
          <Route path="/registromercancia" component={RegistroMercancia}/>
        </Router>
      </div>
    </Section>
  }
}
export default App;
