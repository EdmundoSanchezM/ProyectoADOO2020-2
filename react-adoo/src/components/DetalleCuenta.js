import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import List from 'react-bulma-components/lib/components/list';
import SweetAlert from 'react-bootstrap-sweetalert';

class DetalleCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CuentasExistentes: localStorage.getItem('CuentasExistentes') ? JSON.parse(localStorage.getItem("CuentasExistentes")) : [],
            NombreCuenta: [],
            CuentasNExistentes: localStorage.getItem('CuentasNExistentes') ? JSON.parse(localStorage.getItem("CuentasNExistentes")) : [],
            MovimientosIzquierda: localStorage.getItem('MovimientosIzq') ? JSON.parse(localStorage.getItem("MovimientosIzq")) : [],
            MovimientosDerecha: localStorage.getItem('MovimientosDer') ? JSON.parse(localStorage.getItem("MovimientosDer")) : [],
            alert: null,
            redirect: false
        };
    }
    showAlert(title) {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    showCancel
                    cancelBtnText="Cancelar"
                    confirmBtnText="Aceptar"
                    confirmBtnBsStyle="danger"
                    title={title}
                    onConfirm={this.ConfirmOpt}
                    onCancel={this.CancelOpt} />
            )
        })
    }
    CancelOpt = () => {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    title="No se borro la cuenta"
                    onConfirm={this.hideAlert}
                    onCancel={this.hideAlert} />
            )
        })
    }
    hideAlert = () => {
        this.setState({
            alert: null
        });
    }
    ConfirmOpt = () => {
        this.setState({
            alert: (
                <SweetAlert success title="Cuenta borrada exitosamente" onConfirm={this.hideAlert2} onCancel={this.hideAlert2} />
            ),
            
        })
    }
    hideAlert2 = () => {
        const filtredData = this.state.MovimientosIzquierda.filter(item => item.NombreCuenta !== this.state.NombreCuenta.NombreCuenta);
        const filtredData2 = this.state.MovimientosDerecha.filter(item => item.NombreCuenta !== this.state.NombreCuenta.NombreCuenta);
        const filtredData3 = this.state.CuentasExistentes.filter(item => item.NombreCuenta !== this.state.NombreCuenta.NombreCuenta);
        const filtredData4 = this.state.CuentasNExistentes.filter(item => item.NombreCuenta !== this.state.NombreCuenta.NombreCuenta);
        this.setState({
            alert: null,
            MovimientosDerecha: filtredData2,
            MovimientosIzquierda: filtredData,
            CuentasExistentes : filtredData3,
            CuentasNExistentes: filtredData4
        }, () => this.consumeData(this.state.MovimientosIzquierda, this.state.MovimientosDerecha,this.state.CuentasExistentes,this.state.CuentasNExistentes));
    }
    consumeData(MovI,MovD,CE,CNE) {
        localStorage.setItem("MovimientosIzq", JSON.stringify(MovI));
        localStorage.setItem("MovimientosDer", JSON.stringify(MovD));
        localStorage.setItem("CuentasExistentes", JSON.stringify(CE));
        localStorage.setItem("CuentasNExistentes", JSON.stringify(CNE));
        this.setState({
            redirect: true
        });
    }
    componentDidMount() {
        let ValorCuenta = this.props.location.state
        this.setState({ NombreCuenta: ValorCuenta });
    }

    render() {
        if (this.state.redirect)
            return (<Redirect push to={{
                pathname: '/cuentas',
                state: {
                    ValorCuenta: -1,
                }
            }} />);
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
                                            if (MovIzq.NombreCuenta === this.state.NombreCuenta.NombreCuenta) {
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
                                            if (MovDer.NombreCuenta === this.state.NombreCuenta.NombreCuenta) {
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
                        <Button renderAs="button" color="danger" onClick={() => this.showAlert('¿Desea eliminar la cuenta?')}>
                            Eliminar cuenta
                        </Button>
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
                </div >
            </Section >
        )
    }

}


export default DetalleCuenta;
