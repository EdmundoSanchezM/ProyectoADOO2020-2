import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import List from 'react-bulma-components/lib/components/list'
class DetalleCuenta extends Component {

    state = ({
        CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
        NombreCuenta: [],
        CuentasNExistentes: localStorage.getItem('CuentasNExistentes') ? JSON.parse(localStorage.getItem("CuentasNExistentes")) : [],
        MovimientosIzquierda: localStorage.getItem('MovimientosIzq') ? JSON.parse(localStorage.getItem("MovimientosIzq")) : [],
        MovimientosDerecha: localStorage.getItem('MovimientosDer') ? JSON.parse(localStorage.getItem("MovimientosDer")) : [],
    })
    componentDidMount() {
        let ValorCuenta = this.props.location.state
        this.setState({ NombreCuenta: ValorCuenta });
    }
    render() {
        return (
            <Section>
                <div className="container has-text-centered">
                    <Heading>
                        Detalle de cuenta
                    </Heading>
                    <Heading subtitle size={5}>
                        Cuenta: {this.state.NombreCuenta.NombreCuenta}
                    </Heading>
                    <Content>
                        <Columns>
                            <Columns.Column size="half">
                                <Heading subtitle size={6}>
                                    Movimientos
                                </Heading>
                                <List hoverable>
                                    {
                                        this.state.MovimientosIzquierda.map(MovIzq => {
                                            if(MovIzq.NombreCuenta===this.state.NombreCuenta.NombreCuenta){
                                                return <List.Item key={MovIzq.id}>{MovIzq.NumMovimiento}.- ${MovIzq.Cantidad}</List.Item>
                                            }
                                            return null
                                        })
                                    }
                                </List>
                                <Link to={{
                                    pathname: '/addmovimiento',
                                    state: {
                                        Nombre: this.state.NombreCuenta.NombreCuenta,
                                        Lado: 'Izquierdo'
                                    }
                                }}>
                                    < Button renderAs="button" color="info" >
                                        Añadir movimientos +
                                    </Button>
                                </Link>
                            </Columns.Column>
                            <Columns.Column size="half">
                                <Heading subtitle size={6}>
                                    Movimientos
                                </Heading>
                                <List hoverable>
                                {
                                        this.state.MovimientosDerecha.map(MovDer => {
                                            if(MovDer.NombreCuenta===this.state.NombreCuenta.NombreCuenta){
                                                return <List.Item key={MovDer.id}>{MovDer.NumMovimiento}.- ${MovDer.Cantidad}</List.Item>
                                            }
                                            return null
                                        })
                                    }
                                </List>
                                <Link to={{
                                    pathname: '/addmovimiento',
                                    state: {
                                        Nombre: this.state.NombreCuenta.NombreCuenta,
                                        Lado: 'Derecho'
                                    }
                                }}>
                                    < Button renderAs="button" color="info" >
                                        Añadir movimientos +
                                    </Button>
                                </Link>

                            </Columns.Column>
                        </Columns>
                        <div className="has-text-centered">
                            <Button renderAs="button" color="success">
                                Mostrar estados
                            </Button>
                        </div>
                    </Content>
                    <Content>
                        <p align="left">
                            <Link to="/cuentas">
                                <Button>&#60;&#60;Pagina anterior</Button>
                            </Link>
                        </p>
                    </Content>
                </div >
            </Section >
        )
    }

}


export default DetalleCuenta;
