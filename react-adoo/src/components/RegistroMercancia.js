import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cuentas from './Cuentas';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';

export default class RegistroMercancia extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/registromercancia" render={() => {
                    return <div>
                        <Heading>
                            Preferencias de Esquema Mayor
                                    </Heading>
                        <Content>
                            <p>Seleccione el sistema para el registro de mercancias</p>
                            <Columns variableGap={{ mobile: 1, tablet: 0, desktop: 3, widescreen: 8, fullhd: 2 }}>
                                <Columns.Column size={6}>
                                    <Link to={{
                                        pathname: '/cuentas',
                                        state: {
                                            ValorCuenta: 0
                                        }
                                    }}>
                                        <Button renderAs="button" color="success">
                                            Inventarios Perpetuos
                                            </Button>
                                    </Link>
                                </Columns.Column>
                                <Columns.Column size={6}>
                                    <Link to={{
                                        pathname: '/cuentas',
                                        state: {
                                            ValorCuenta: 1
                                        }
                                    }}>
                                        <Button renderAs="button" color="success">
                                            Analítico o Pormenorizado
                                            </Button>
                                    </Link>
                                </Columns.Column>
                            </Columns>
                        </Content>
                        <Content>
                            <p align="left">
                                <Link to="/" className="link">&#60;&#60;Pagina anterior</Link>
                            </p>
                        </Content>
                    </div>
                }}>
                </Route>
                <Route path="/cuentas" component={Cuentas} />
            </Router>
        )
    }
}
