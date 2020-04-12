import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import List from 'react-bulma-components/lib/components/list';
import Dropdown from 'react-bulma-components/lib/components/dropdown';
import Select from 'react-select';
class NuevaCuenta extends Component {
    state = ({
        CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
        select: localStorage.getItem("select") ? localStorage.getItem("select") : '...',
        ServerCExist: [],
        CuentasNExistentes: [],
        selected: ''

    })
    onChange = (selected) => {
        this.setState({ selected });
    }
    componentDidMount() {
        var self = this;
        axios.get('/ObtenerCuentasExistentes')
            .then(function (response) {
                self.setState({ ServerCExist: response.data });
            })
            .catch(function (error) {
            });
    }

    render() {
        return (<Section>
            <div className="container has-text-centered">
                <Heading>
                    Añadir cuenta de balance
                </Heading>
                <Content>
                    <Heading subtitle size={5}>
                        Cuentas en uso
                    </Heading>
                    <Columns>
                        <Columns.Column size="half">
                            <Heading subtitle size={6}>
                                Cuentas verificadas
                            </Heading>
                            <List hoverable>
                                {
                                    this.state.CuentasExistentes.map(CuentasExistentes => {
                                        return <List.Item key={CuentasExistentes.id}>{CuentasExistentes.NombreCuenta}</List.Item>
                                    })
                                }
                            </List>
                        </Columns.Column>
                        <Columns.Column size="half">
                            <Heading subtitle size={6}>
                                Cuentas inexistentes
                            </Heading>
                        </Columns.Column>
                    </Columns>
                    <Box>
                        <Select
                            isMulti
                            name="colors"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder={'Enter Name'}
                            getOptionLabel={option => option.NombreCuenta}
                            getOptionValue={option => option.id}
                            options={this.state.ServerCExist}
                        />
                        <Button.Group>
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
                        <Link to="/cuentas">
                            <Button>&#60;&#60;Pagina anterior</Button>
                        </Link>
                    </p>
                </Content>
            </div>
        </Section>
        );
    }
}


export default NuevaCuenta;
