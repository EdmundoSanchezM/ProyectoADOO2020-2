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
import { Input } from 'react-bulma-components/lib/components/form';
import Select from 'react-select';
class NuevaCuenta extends Component {
    state = ({
        CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
        select: localStorage.getItem("select") ? localStorage.getItem("select") : '...',
        ServerCExist: [],
        CuentasNExistentes: [],
        selected: '',
        CuentaNE: ''
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
    onChange = (evt) => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
            [evt.target.name]: value,
        });
    }
    render() {
        const { CuentaNE } = this.state;
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
                            placeholder={'Seleccionar cuentas'}
                            getOptionLabel={option => option.NombreCuenta}
                            getOptionValue={option => option.id}
                            options={this.state.ServerCExist}
                        />
                        <div>
                            <br />
                            <p align="left">Añadir cuenta no registrada</p>
                            <Input onChange={this.onChange} name="CuentaNE" type="text" placeholder="Name input" value={CuentaNE} />
                        </div>
                        <br />
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
                        <Link to={{
                            pathname: '/cuentas',
                            state: {
                                ValorCuenta: 1
                            }
                        }}>
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
