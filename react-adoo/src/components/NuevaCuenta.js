import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import RegistroMercancia from './RegistroMercancia';

class NuevaCuenta extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/nuevacuenta" render={() => {
                    return <div>
                        <Heading>
                            Cuentas en uso
                        </Heading>
                        <Heading subtitle size={6}>
                            Metodo seleccionado:
                        </Heading>
                        <Content>
                            <Columns>
                                <Columns.Column size={4}>
                                </Columns.Column>
                                <Columns.Column size={4}>
                                    
                                </Columns.Column>
                                <Columns.Column size={4}>
                                </Columns.Column>
                            </Columns>
                            <Box>
                                <Button.Group>
                                <Button renderAs="button" color="success">
                                    Balance General
                                </Button>
                                <Button renderAs="button" color="success">
                                    Balanza de Comprobación
                                </Button>
                                <Button renderAs="button" color="success">
                                    Estado de Resultados
                                </Button>
                                <Link to={{
                                        pathname: '/nuevacuenta',
                                        state: {
                                            ValorCuenta: 1
                                        }
                                    }}>
                                <Button renderAs="button" color="success">
                                    (+)Añadir cuenta
                                </Button>
                                </Link>
                                </Button.Group>
                            </Box>
                        </Content>
                        <Content>
                            <p align="left">
                                <Link to="/registromercancia" className="link">&#60;&#60;Pagina anterior</Link>
                            </p>
                        </Content>
                    </div>
                }}>
                </Route>
                <Route path="/nuevacuenta" component={RegistroMercancia} />
            </Router>
        )
    }

}


export default NuevaCuenta;
