import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Box} from 'react-bulma-components';
import {List} from 'react-bulma-components';
import {Content} from 'react-bulma-components';
import {Heading} from 'react-bulma-components';
import {Button} from 'react-bulma-components';
import {Section} from 'react-bulma-components';
import {Columns} from 'react-bulma-components';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
class NuevaCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
            CuentasNExistentes: localStorage.getItem('CuentasNExistentes') ? JSON.parse(localStorage.getItem("CuentasNExistentes")) : [],
            ServerCExist: [],
            selected: '',
            EstadosSelect: [],
            alert: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = selectedOptions => {
        this.setState({ EstadosSelect: selectedOptions });
    };

    handleClick() {
        let ArrayTemp =  JSON.parse(JSON.stringify(this.state.CuentasNExistentes))
        let SizeCE = this.state.CuentasNExistentes.length
        let i = 0
        let j = 0
        let check = false
        for (i; i < this.state.EstadosSelect.length; i++) {
            check = false
            for (j = 0; j < this.state.CuentasNExistentes.length; j++) {
                if (this.state.CuentasNExistentes[j].NombreCuenta === this.state.EstadosSelect[i].NombreCuenta) {
                    check = true
                    this.setState({
                        alert: (
                            <SweetAlert
                                warning
                                title="Selecciono cuentas ya registradas"
                                onConfirm={this.hideAlert}
                                onCancel={this.hideAlert} />
                        )
                    })
                }
            }
            if (!check) {
                ArrayTemp[SizeCE] = { 'NombreCuenta': this.state.EstadosSelect[i].NombreCuenta, 'id': SizeCE }
                SizeCE = SizeCE + 1
            }
        }
        if (i === 0) {
            this.setState({
                alert: (
                    <SweetAlert
                        warning
                        title="No hay cuentas que agregar"
                        onConfirm={this.hideAlert}
                        onCancel={this.hideAlert} />
                )
            })
        } else {
            this.setState({
                CuentasNExistentes: ArrayTemp, 
                alert: (
                    <SweetAlert
                        success
                        title="Cuentas agregadas exitosamente"
                        onConfirm={this.hideAlert}
                        onCancel={this.hideAlert} />
                )
            }, () => this.consumeData(this.state.CuentasNExistentes));
        }
    }
    hideAlert = () => {
        this.setState({
            alert: null
        });
    }
    consumeData(CE) {
        localStorage.setItem("CuentasNExistentes", JSON.stringify(CE));
        this.setState({ EstadosSelect: [] })
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
                                Cuentas iniciales
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
                                Cuentas agregadas
                            </Heading>
                            <List hoverable>
                                {
                                    this.state.CuentasNExistentes.map(CuentasNExistentes => {
                                        return <List.Item key={CuentasNExistentes.id}>{CuentasNExistentes.NombreCuenta}</List.Item>
                                    })
                                }
                            </List>
                        </Columns.Column>
                    </Columns>
                    <Box>
                        <p align="left">Añadir cuentas registradas</p>
                        <Select
                            isMulti
                            name="cuentas"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder={'Seleccionar cuentas'}
                            getOptionLabel={option => option.NombreCuenta}
                            getOptionValue={option => option.id}
                            options={this.state.ServerCExist}
                            value={this.state && this.state.EstadosSelect}
                            onChange={this.handleChange}
                        />
                        <br />
                        <Button.Group>
                            <Button renderAs="button" color="success" onClick={this.handleClick}>
                                Añadir cuentas
                            </Button>
                        </Button.Group>
                    </Box>
                </Content>
                <Content>
                    <p align="left">
                        <Link to={{
                            pathname: '/cuentas',
                            state: {
                                ValorCuenta: -1
                            }
                        }}>
                            <Button>&#60;&#60;Pagina anterior</Button>
                        </Link>
                    </p>
                </Content>
                {this.state.alert}
            </div>
        </Section>
        );
    }
}

export default NuevaCuenta;