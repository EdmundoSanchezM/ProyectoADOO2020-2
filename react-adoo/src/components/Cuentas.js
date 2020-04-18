import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import axios from 'axios';
import List from 'react-bulma-components/lib/components/list'
class Cuentas extends Component {

    state = ({
        CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
        select: localStorage.getItem("select") ? localStorage.getItem("select") : '...',
        CuentasNExistentes: localStorage.getItem('CuentasNExistentes') ? JSON.parse(localStorage.getItem("CuentasNExistentes")) : [],
    })
    componentDidMount() {
        let { ValorCuenta } = this.props.location.state
        const sel = { idCM: ValorCuenta }
        var self = this;
        if (!localStorage.getItem('CuentasExistentes')) {
            if (ValorCuenta !== -1) {
                axios.post('/selectregistromercancia', sel)
                    .then(function (response) {
                        self.setState({ CuentasExistentes: response.data });
                        localStorage.setItem("CuentasExistentes", JSON.stringify(response.data));
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
        }
        ValorCuenta = -1
    }
    render() {
        return (
            <Section>
                <div className="container has-text-centered">
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
                                <List hoverable>
                                    {
                                        this.state.CuentasExistentes.map(CuentasExistentes => {
                                            return <List.Item key={CuentasExistentes.id}>
                                                <Link to={{
                                                    pathname: '/infocuenta',
                                                    state: {
                                                        NombreCuenta: CuentasExistentes.NombreCuenta
                                                    }
                                                }}>
                                                    {CuentasExistentes.NombreCuenta}
                                                </Link>
                                            </List.Item>
                                        })
                                    }
                                    {
                                        this.state.CuentasNExistentes.map(CuentasNExistentes => {
                                            return <List.Item key={CuentasNExistentes.id}>
                                                <Link to={{
                                                    pathname: '/infocuenta',
                                                    state: {
                                                        NombreCuenta: CuentasNExistentes.NombreCuenta
                                                    }
                                                }}>
                                                    {CuentasNExistentes.NombreCuenta}
                                                </Link>
                                            </List.Item>
                                        })
                                    }
                                </List>
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
                                <Link to='addcuenta'>
                                    < Button renderAs="button" color="success" >
                                        (+)Añadir cuenta
                                </Button>
                                </Link>
                            </Button.Group>
                        </Box>
                    </Content>
                    <Content>
                        <p align="left">
                            <Link to="/registromercancia">
                                <Button>&#60;&#60;Pagina anterior</Button>
                            </Link>
                        </p>
                    </Content>
                </div >
            </Section >
        )
    }
}


export default Cuentas;
