import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Content} from 'react-bulma-components';
import {Heading} from 'react-bulma-components';
import {Button} from 'react-bulma-components';
import {Section} from 'react-bulma-components';
import {Columns} from 'react-bulma-components';

export default class RegistroMercancia extends Component {
    componentDidMount(){
        localStorage.clear();
    }
    render() {
        return (
            <Section>
                <div className="container has-text-centered">
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
                            <Link to="/">
                                <Button>&#60;&#60;Pagina anterior</Button>
                            </Link>
                        </p>
                    </Content>
                </div>
            </Section>
        )
    }
}
