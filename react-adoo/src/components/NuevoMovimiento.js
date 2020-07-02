import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {Content} from 'react-bulma-components';
import {Heading} from 'react-bulma-components';
import {Button} from 'react-bulma-components';
import {Section} from 'react-bulma-components';
import {Columns} from 'react-bulma-components';
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
                //Chechamos primero la condicion de no hacer el mismo numero de movimiento en ambos lados
                let condicion0 = this.state.MovimientosDerecha.filter(item => (item.NumMovimiento === this.state.NumMovimiento && item.NombreCuenta === this.state.NombreCuenta.Nombre));
                let condicion1 = this.state.MovimientosDerecha.filter(item => item.NumMovimiento === this.state.NumMovimiento);
                let condicion11 = this.state.MovimientosIzquierda.filter(item => item.NumMovimiento === this.state.NumMovimiento)
                let condicion2 = []
                let condicion22 = []
                for (let i = 0; i < this.state.MovimientosDerecha.length; i++) {
                    condicion2[i] = this.state.MovimientosDerecha[i].NumMovimiento
                }
                for (let i = 0; i < this.state.MovimientosIzquierda.length; i++) {
                    condicion22[i] = this.state.MovimientosIzquierda[i].NumMovimiento
                }
                let NumMovimientoDM = Math.max.apply(Math, condicion2) === -Infinity ? this.state.NumMovimiento : Math.max.apply(Math, condicion2);
                let NumMovimientoIM = Math.max.apply(Math, condicion22) === -Infinity ? this.state.NumMovimiento : Math.max.apply(Math, condicion22);
                let ic1 = 0;
                let TotalCantidadD = 0;
                let TotalCantidadI = 0;
                let checkD;
                let checkI;
                for (ic1; ic1 < condicion1.length; ic1++)
                    TotalCantidadD = TotalCantidadD + parseFloat(condicion1[ic1].Cantidad);
                ic1 = 0
                for (ic1; ic1 < condicion11.length; ic1++)
                    TotalCantidadI = TotalCantidadI + parseFloat(condicion11[ic1].Cantidad);
                for (let i = 0; i < this.state.MovimientosDerecha.length; i++) {
                    if (NumMovimientoDM === parseInt(this.state.MovimientosDerecha[i].NumMovimiento))
                        checkD = this.state.MovimientosDerecha[i].Check
                }
                for (let i = 0; i < this.state.MovimientosIzquierda.length; i++) {
                    if (NumMovimientoIM === parseInt(this.state.MovimientosIzquierda[i].NumMovimiento))
                        checkI = this.state.MovimientosIzquierda[i].Check
                }
                let checkDVA = (condicion1.length===0)?false:condicion1[0].Check;
                let checkIVA = (condicion11.length===0)?false:condicion11[0].Check;
                if (condicion0.length >= 1) {
                    this.setState({ alert: (<SweetAlert warning confirmBtnText="Regresar" title="No se permite abonar y cargar en un mismo movimiento" onConfirm={this.hideAlert} onCancel={this.hideAlert} />) })
                } else if ((TotalCantidadD - TotalCantidadI - this.state.Cantidad) === 0) {
                    let MovimientosCop = JSON.parse(JSON.stringify(this.state.MovimientosIzquierda))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCop.length; ic1++) {
                        if (MovimientosCop[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCop[ic1].Check = true
                        }
                    }
                    let MovimientosCopD = JSON.parse(JSON.stringify(this.state.MovimientosDerecha))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCopD.length; ic1++) {
                        if (MovimientosCopD[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCopD[ic1].Check = true
                        }
                    }
                    MovimientosCop[this.state.MovimientosIzquierda.length] = {
                        'id': this.state.MovimientosIzquierda.length
                        , 'NombreCuenta': this.state.NombreCuenta.Nombre
                        , 'NumMovimiento': this.state.NumMovimiento
                        , 'Cantidad': this.state.Cantidad
                        , 'Check': true
                    }
                    this.setState({
                        MovimientosIzquierda: MovimientosCop
                        , MovimientosDerecha: MovimientosCopD
                    }, () => this.consumeData(this.state.MovimientosIzquierda, this.state.MovimientosDerecha, 0));
                } else if ((TotalCantidadD - TotalCantidadI - this.state.Cantidad) < 0 && (TotalCantidadD !== 0 && checkDVA && checkIVA)) {
                    let MovimientosCop = JSON.parse(JSON.stringify(this.state.MovimientosIzquierda))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCop.length; ic1++) {
                        if (MovimientosCop[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCop[ic1].Check = false
                        }
                    }
                    let MovimientosCopD = JSON.parse(JSON.stringify(this.state.MovimientosDerecha))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCopD.length; ic1++) {
                        if (MovimientosCopD[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCopD[ic1].Check = false
                        }
                    }
                    MovimientosCop[this.state.MovimientosIzquierda.length] = {
                        'id': this.state.MovimientosIzquierda.length
                        , 'NombreCuenta': this.state.NombreCuenta.Nombre
                        , 'NumMovimiento': this.state.NumMovimiento
                        , 'Cantidad': this.state.Cantidad
                        , 'Check': false
                    }
                    this.setState({
                        MovimientosIzquierda: MovimientosCop
                        , MovimientosDerecha: MovimientosCopD
                    }, () => this.consumeData(this.state.MovimientosIzquierda, this.state.MovimientosDerecha, 0));
                } else if ((TotalCantidadD - TotalCantidadI - this.state.Cantidad) < 0 && TotalCantidadD !== 0) {
                    this.setState({ alert: (<SweetAlert warning confirmBtnText="Regresar" title="Movimiento no valido" onConfirm={this.hideAlert} onCancel={this.hideAlert}>Tip: Revise las cantidades del mismo numero de movimiento</SweetAlert>) })
                } else if (((NumMovimientoDM < this.state.NumMovimiento && !checkD) || (NumMovimientoIM < this.state.NumMovimiento && !checkI)) && (this.state.MovimientosIzquierda.length !== 0 || this.state.MovimientosDerecha.length !== 0)) {
                    this.setState({ alert: (<SweetAlert warning confirmBtnText="Regresar" title="Movimiento no valido" onConfirm={this.hideAlert} onCancel={this.hideAlert}>Tip: Aun no acaba el movimiento anterior</SweetAlert>) })
                } else {
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
                    }, () => this.consumeData(this.state.MovimientosIzquierda, null, 0));
                }
            } else if (this.state.NombreCuenta.Lado === "Derecho") {
                //Chechamos primero la condicion de no hacer el mismo numero de movimiento en ambos lados
                let condicion0 = this.state.MovimientosIzquierda.filter(item => (item.NumMovimiento === this.state.NumMovimiento && item.NombreCuenta === this.state.NombreCuenta.Nombre));
                let condicion1 = this.state.MovimientosDerecha.filter(item => item.NumMovimiento === this.state.NumMovimiento);
                let condicion11 = this.state.MovimientosIzquierda.filter(item => item.NumMovimiento === this.state.NumMovimiento)
                let condicion2 = []
                let condicion22 = []
                for (let i = 0; i < this.state.MovimientosDerecha.length; i++) {
                    condicion2[i] = this.state.MovimientosDerecha[i].NumMovimiento
                }
                for (let i = 0; i < this.state.MovimientosIzquierda.length; i++) {
                    condicion22[i] = this.state.MovimientosIzquierda[i].NumMovimiento
                }
                let NumMovimientoDM = Math.max.apply(Math, condicion2) === -Infinity ? this.state.NumMovimiento : Math.max.apply(Math, condicion2);
                let NumMovimientoIM = Math.max.apply(Math, condicion22) === -Infinity ? this.state.NumMovimiento : Math.max.apply(Math, condicion22);
                let ic1 = 0;
                let TotalCantidadD = 0;
                let TotalCantidadI = 0;
                let checkD;
                let checkI;
                for (ic1; ic1 < condicion1.length; ic1++)
                    TotalCantidadD = TotalCantidadD + parseFloat(condicion1[ic1].Cantidad);
                ic1 = 0
                for (ic1; ic1 < condicion11.length; ic1++)
                    TotalCantidadI = TotalCantidadI + parseFloat(condicion11[ic1].Cantidad);
                for (let i = 0; i < this.state.MovimientosDerecha.length; i++) {
                    if (NumMovimientoDM === parseInt(this.state.MovimientosDerecha[i].NumMovimiento))
                        checkD = this.state.MovimientosDerecha[i].Check
                }
                for (let i = 0; i < this.state.MovimientosIzquierda.length; i++) {
                    if (NumMovimientoIM === parseInt(this.state.MovimientosIzquierda[i].NumMovimiento))
                        checkI = this.state.MovimientosIzquierda[i].Check
                }
                let checkDVA = (condicion1.length===0)?false:condicion1[0].Check;
                let checkIVA = (condicion11.length===0)?false:condicion11[0].Check;
                if (condicion0.length >= 1) {
                    this.setState({ alert: (<SweetAlert warning confirmBtnText="Regresar" title="No se permite abonar y cargar en un mismo movimiento" onConfirm={this.hideAlert} onCancel={this.hideAlert} />) })
                } else if ((TotalCantidadI - TotalCantidadD - this.state.Cantidad) === 0) {
                    let MovimientosCop = JSON.parse(JSON.stringify(this.state.MovimientosDerecha))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCop.length; ic1++) {
                        if (MovimientosCop[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCop[ic1].Check = true
                        }
                    }
                    let MovimientosCopI = JSON.parse(JSON.stringify(this.state.MovimientosIzquierda))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCopI.length; ic1++) {
                        if (MovimientosCopI[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCopI[ic1].Check = true
                        }
                    }
                    MovimientosCop[this.state.MovimientosDerecha.length] = {
                        'id': this.state.MovimientosDerecha.length
                        , 'NombreCuenta': this.state.NombreCuenta.Nombre
                        , 'NumMovimiento': this.state.NumMovimiento
                        , 'Cantidad': this.state.Cantidad
                        , 'Check': true
                    }
                    this.setState({
                        MovimientosIzquierda: MovimientosCopI
                        , MovimientosDerecha: MovimientosCop
                    }, () => this.consumeData(this.state.MovimientosIzquierda, this.state.MovimientosDerecha, 0));
                } else if ((TotalCantidadI - TotalCantidadD - this.state.Cantidad) < 0 && (TotalCantidadI !== 0 && checkDVA && checkIVA)) {
                    let MovimientosCop = JSON.parse(JSON.stringify(this.state.MovimientosDerecha))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCop.length; ic1++) {
                        if (MovimientosCop[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCop[ic1].Check = false
                        }
                    }
                    let MovimientosCopI = JSON.parse(JSON.stringify(this.state.MovimientosIzquierda))
                    ic1 = 0
                    for (ic1; ic1 < MovimientosCopI.length; ic1++) {
                        if (MovimientosCopI[ic1].NumMovimiento === this.state.NumMovimiento) {
                            MovimientosCopI[ic1].Check = false
                        }
                    }
                    MovimientosCop[this.state.MovimientosDerecha.length] = {
                        'id': this.state.MovimientosDerecha.length
                        , 'NombreCuenta': this.state.NombreCuenta.Nombre
                        , 'NumMovimiento': this.state.NumMovimiento
                        , 'Cantidad': this.state.Cantidad
                        , 'Check': false
                    }
                    this.setState({
                        MovimientosIzquierda: MovimientosCopI
                        , MovimientosDerecha: MovimientosCop
                    }, () => this.consumeData(this.state.MovimientosIzquierda, this.state.MovimientosDerecha, 0));
                } else if ((TotalCantidadI - TotalCantidadD - this.state.Cantidad) < 0 && TotalCantidadI !== 0) {
                    this.setState({ alert: (<SweetAlert warning confirmBtnText="Regresar" title="Movimiento no valido" onConfirm={this.hideAlert} onCancel={this.hideAlert}>Tip: Revise las cantidades del mismo numero de movimiento</SweetAlert>) })
                } else if (((NumMovimientoDM < this.state.NumMovimiento && !checkD) || (NumMovimientoIM < this.state.NumMovimiento && !checkI)) && (this.state.MovimientosDerecha.length !== 0 || this.state.MovimientosIzquierda.length !== 0)) {
                    this.setState({ alert: (<SweetAlert warning confirmBtnText="Regresar" title="Movimiento no valido" onConfirm={this.hideAlert} onCancel={this.hideAlert}>Tip: Aun no acaba el movimiento anterior</SweetAlert>) })
                } else {
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
                    }, () => this.consumeData(null, this.state.MovimientosDerecha, 1));
                }
            }
        }
    }
    consumeData(MovI, MovD, sel) {
        if (sel === 0) {
            if (MovD === null)
                localStorage.setItem("MovimientosIzq", JSON.stringify(MovI));
            else {
                localStorage.setItem("MovimientosIzq", JSON.stringify(MovI));
                localStorage.setItem("MovimientosDer", JSON.stringify(MovD));
            }
        } else if (sel === 1) {
            if (MovI === null)
                localStorage.setItem("MovimientosDer", JSON.stringify(MovD));
            else {
                localStorage.setItem("MovimientosIzq", JSON.stringify(MovI));
                localStorage.setItem("MovimientosDer", JSON.stringify(MovD));
            }
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
                                    <input className="input" onChange={this.onChangenNumeroMov} name="NumMovimiento" pattern="^-?[0-9]\d*\.?\d*$" type="text" placeholder="Numero Movimiento" value={NumMovimiento} ></input>
                                </div>
                                <div>
                                    <br />
                                    <p align="left">Cantidad:</p>
                                    <input className="input" onChange={this.onChangenCantidad} name="Cantidad" type="text" placeholder="Cantidad" value={Cantidad} ></input>
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
