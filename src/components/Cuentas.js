import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import axios from 'axios';
import RegistroMercancia from './RegistroMercancia';
import NombreCuenta from './NuevaCuenta';
class Cuentas extends Component {

    state = ({
        Datos: localStorage.getItem('Datos') ? JSON.parse(localStorage.getItem("Datos")) : [],
        select: localStorage.getItem("select") ? localStorage.getItem("select") : '...'
    })
    componentDidMount() {
        const { ValorCuenta } = this.props.location.state
        const sel = { idCM: ValorCuenta }
        var self = this;
        axios.post('/selectregistromercancia', sel)
            .then(function (response) {
                self.setState({ Datos: response.data });
                localStorage.setItem("Datos", JSON.stringify(response.data));
            })
            .catch(function (error) {
            });
        if (ValorCuenta === 0) {
            this.setState({ select: 'Inventarios Perpetuos' });
            localStorage.setItem("select", 'Inventarios Perpetuos');
        } else {
            this.setState({ select: 'Analítico o Pormenorizado' });
            localStorage.setItem("select", 'Analítico o Pormenorizado');
        }
    }
    render() {
        return (
            <Router>
                <Route exact path="/cuentas" render={() => {
                    return <div>
                        <Heading>
                            Cuentas en uso
                        </Heading>
                        <Heading subtitle size={6}>
                            Metodo seleccionado: {this.state.select}
                        </Heading>
                        <Content>
                            <Columns>
                                <Columns.Column size={4}>
                                </Columns.Column>
                                <Columns.Column size={4}>
                                    {
                                        this.state.Datos.map(Datos => {
                                            return <div key={Datos.id} className="container" align="left">
                                                <p>{Datos.NombreCuenta}</p>
                                            </div>
                                        })
                                    }
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
                <Route path="/registromercancia" component={RegistroMercancia} />
                <Route path="/nuevacuenta" component={NombreCuenta} />
            </Router>
        )
    }

}


export default Cuentas;
