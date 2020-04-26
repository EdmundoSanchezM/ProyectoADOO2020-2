import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import axios from 'axios';
import List from 'react-bulma-components/lib/components/list';
import SweetAlert from 'react-bootstrap-sweetalert';
class Cuentas extends Component {
    constructor(props) {
        super(props);
        this.state={
            CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
            select: localStorage.getItem("select") ? localStorage.getItem("select") : '...',
            CuentasNExistentes: localStorage.getItem('CuentasNExistentes') ? JSON.parse(localStorage.getItem("CuentasNExistentes")) : [],
            MovimientosIzquierda: localStorage.getItem('MovimientosIzq') ? JSON.parse(localStorage.getItem("MovimientosIzq")) : [],
            MovimientosDerecha: localStorage.getItem('MovimientosDer') ? JSON.parse(localStorage.getItem("MovimientosDer")) : [],   
            alert:null    
        };
        this.GenerarEstados = this.GenerarEstados.bind(this);
    }
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
    hideAlert = () => {
        this.setState({
            alert: null,
        });
    }
    GenerarEstados() {
        let Condicion1= this.state.MovimientosIzquierda;
        let Condicion2= this.state.MovimientosDerecha;
        if(Condicion1.length===0&&Condicion2.length===0){
            this.setState({alert: (<SweetAlert warning title="No tiene movimientos registrados" onConfirm={this.hideAlert} onCancel={this.hideAlert}/>)})
        }else
            Condicion1 = this.state.MovimientosIzquierda.filter(item=>item.Check===false);
            Condicion2 = this.state.MovimientosDerecha.filter(item=>item.Check===false);
            if(Condicion1.length===0&&Condicion2.length===0){
                Condicion1= this.state.MovimientosIzquierda;
                Condicion2= this.state.MovimientosDerecha;
                let CuentasExist = this.state.CuentasExistentes;
                let CuentasNExist = this.state.CuentasNExistentes.length===0? []:this.state.CuentasNExistentes;
                let Metodo = this.state.select;
                let JSONC=[];
                let LongJSONC=0;
                for(let i=0;i<CuentasExist.length;i++)
                    JSONC[i]={id:i,NombreCuenta:CuentasExist[i].NombreCuenta};
                LongJSONC = JSONC.length
                for(let i=0;i<CuentasNExist.length;i++){
                    JSONC[i]={id:i,NombreCuenta:CuentasNExist[i].NombreCuenta};
                    LongJSONC=LongJSONC+1;
                }
                let JSONF = {"Cuentas":JSONC,"MovimientosIzq":Condicion1,"MovimientosDer":Condicion2,"Metodo":Metodo}
                console.log(JSONF)
            }else
                this.setState({alert: (<SweetAlert warning title="Hay movimientos que aun no ha terminado" onConfirm={this.hideAlert} onCancel={this.hideAlert}/>)})
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
                                <Button renderAs="button" color="success" onClick={this.GenerarEstados}>
                                    Generar Estados Financieros
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
                    {this.state.alert}
                </div>
            </Section>
        )
    }
}


export default Cuentas;
