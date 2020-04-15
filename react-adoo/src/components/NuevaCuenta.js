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
    constructor(props) {
        super(props);
        this.state = {
            CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
            CuentasNExistentes: localStorage.getItem('CuentasNExistentes') ? JSON.parse(localStorage.getItem("CuentasNExistentes")) : [],
            ServerCExist: [],
            selected: '',
            CuentaNE: '',
            EstadosSelect: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = selectedOptions => {
        this.setState({ EstadosSelect: selectedOptions });
    };

    handleClick() {
        let CuentasNExsCop = JSON.parse(JSON.stringify(this.state.CuentasNExistentes))
        CuentasNExsCop[this.state.CuentasNExistentes.length] = { 'NombreCuenta': this.state.CuentaNE, 'id': this.state.CuentasNExistentes.length }
        let ArrayTemp = JSON.parse(JSON.stringify(this.state.CuentasExistentes))
        let SizeCE = this.state.CuentasExistentes.length
        let i = 0
        for (i; i < this.state.EstadosSelect.length; i++) {
            ArrayTemp[SizeCE] = { 'NombreCuenta': this.state.EstadosSelect[i].NombreCuenta, 'id': SizeCE }
            SizeCE = SizeCE + 1
        }
        if (this.state.CuentaNE === '' && i === 0) {
            alert("No hay cuentas que agregar")
        } else {
            if (this.state.CuentaNE === '') {
                this.setState({
                    CuentasExistentes: ArrayTemp
                });
            } else {
                this.setState({
                    CuentasExistentes: ArrayTemp,
                    CuentasNExistentes: CuentasNExsCop
                },() => this.consumeData(this.state.CuentasExistentes,this.state.CuentasNExistentes));
            }
            
        }
    }
    consumeData(CE,CNE){
        localStorage.setItem("CuentasExistentes", JSON.stringify(CE));
        localStorage.setItem("CuentasNExistentes", JSON.stringify(CNE));
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
                        <div>
                            <br />
                            <p align="left">Añadir cuenta no registrada</p>
                            <Input onChange={this.onChange} name="CuentaNE" type="text" placeholder="Escribir cuenta" value={CuentaNE} />
                        </div>
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
            </div>
        </Section>
        );
    }
}


export default NuevaCuenta;
