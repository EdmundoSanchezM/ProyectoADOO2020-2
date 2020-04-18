import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import { Input } from 'react-bulma-components/lib/components/form';
import SweetAlert from 'react-bootstrap-sweetalert';

class NuevoMovimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NombreCuenta: [],
            MovimientosIzquierda: localStorage.getItem('MovimientosIzq') ? JSON.parse(localStorage.getItem("MovimientosIzq")) : [],
            MovimientosDerecha: localStorage.getItem('MovimientosDer') ? JSON.parse(localStorage.getItem("MovimientosDer")) : [],
            NumMovimiento: '',
            Cantidad: '',
            regexp: /^[0-9\b]+$/,
            regexpC: /^[0-9]*\.?[0-9]*$/,
            alert: null,
            redirect: false
        };
        this.GuardarMovimiento = this.GuardarMovimiento.bind(this);
    }
    showAlert(title) {
        this.setState({
            alert: (
                <SweetAlert success title={title} onConfirm={this.hideAlert} onCancel={this.hideAlert} />
            )
        });
    }

    hideAlert = () => {
        this.setState({
            alert: null,
            redirect: true
        });
    }
    hideAlert2 = () => {
        this.setState({
            alert: null,
        });
    }

    GuardarMovimiento() {

        if (this.state.NumMovimiento === '' || this.state.NumMovimiento === '') {
            this.setState({
                alert: (
                    <SweetAlert warning title="Falta completar campos" onConfirm={this.hideAlert2} onCancel={this.hideAlert2} />
                )
            })
        } else {
            if (this.state.NombreCuenta.Lado === "Izquierdo") {
                let MovimientosCop = JSON.parse(JSON.stringify(this.state.MovimientosIzquierda))
                MovimientosCop[this.state.MovimientosIzquierda.length] = {
                    'id': this.state.MovimientosIzquierda.length
                    , 'NombreCuenta': this.state.NombreCuenta.Nombre
                    , 'NumMovimiento': this.state.NumMovimiento
                    , 'Cantidad': this.state.Cantidad
                    , 'Check': false
                }
                this.setState({
                    MovimientosIzquierda: MovimientosCop
                }, () => this.consumeData(this.state.MovimientosIzquierda, 0));
            } else if (this.state.NombreCuenta.Lado === "Derecho") {
                let MovimientosCop = JSON.parse(JSON.stringify(this.state.MovimientosDerecha))
                MovimientosCop[this.state.MovimientosDerecha.length] = {
                    'id': this.state.MovimientosDerecha.length
                    , 'NombreCuenta': this.state.NombreCuenta.Nombre
                    , 'NumMovimiento': this.state.NumMovimiento
                    , 'Cantidad': this.state.Cantidad
                    , 'Check': false
                }
                this.setState({
                    MovimientosDerecha: MovimientosCop
                }, () => this.consumeData(this.state.MovimientosDerecha, 1));
            }
        }
    }
    consumeData(Mov, sel) {
        if (sel === 0) {
            localStorage.setItem("MovimientosIzq", JSON.stringify(Mov));
        } else if (sel === 1) {
            localStorage.setItem("MovimientosDer", JSON.stringify(Mov));
        }
        this.setState({
            redirect: true
        });
    }
    componentDidMount() {
        let ValorCuenta = this.props.location.state
        this.setState({ NombreCuenta: ValorCuenta })
    }
    onChangenNumeroMov = (evt) => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        if (value === '' || this.state.regexp.test(value)) {
            this.setState({
                [evt.target.name]: value,
            });
        }
    }
    onChangenCantidad = (evt) => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        if (value === '' || this.state.regexpC.test(value)) {
            this.setState({
                [evt.target.name]: value,
            });
        }
    }
    render() {
        const { NumMovimiento } = this.state;
        const { Cantidad } = this.state;
        if (this.state.redirect)
            return (<Redirect push to={{
                pathname: '/infocuenta',
                state: {
                    NombreCuenta: this.state.NombreCuenta.Nombre,
                }
            }} />);
        return (
            <Section>
                <div className="container has-text-centered">
                    <Heading>
                        Agregar movimiento
                    </Heading>
                    <Heading subtitle size={5}>
                        Cuenta: {this.state.NombreCuenta.Nombre}
                    </Heading>
                    <Content>
                        <Columns>
                            <Columns.Column size={4}>
                            </Columns.Column>
                            <Columns.Column size={4}>
                                <div>
                                    <br />
                                    <p align="left">Numero Movimiento:</p>
                                    <Input onChange={this.onChangenNumeroMov} name="NumMovimiento" pattern="^-?[0-9]\d*\.?\d*$" type="text" placeholder="Numero Movimiento" value={NumMovimiento} />
                                </div>
                                <div>
                                    <br />
                                    <p align="left">Cantidad:</p>
                                    <Input onChange={this.onChangenCantidad} name="Cantidad" type="text" placeholder="Cantidad" value={Cantidad} />
                                </div>
                                <br />
                                <Button.Group className="has-text-centered">
                                    <Button renderAs="button" color="info" onClick={this.GuardarMovimiento}>
                                        Guardar Movimiento
                                    </Button>
                                    <Button renderAs="button" color="danger" onClick={() => this.showAlert('Se ha cancelado el registro')}>
                                        Cancelar
                                    </Button>
                                </Button.Group>
                            </Columns.Column>
                            <Columns.Column size={4}>
                            </Columns.Column>
                        </Columns>
                    </Content>
                    <Content>
                        <p align="left">
                            <Link to={{
                                pathname: '/infocuenta',
                                state: {
                                    NombreCuenta: this.state.NombreCuenta.Nombre
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

export default NuevoMovimiento;