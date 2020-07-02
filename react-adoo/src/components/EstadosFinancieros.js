import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Content} from 'react-bulma-components';
import {Heading} from 'react-bulma-components';
import {Button} from 'react-bulma-components';
import {Section} from 'react-bulma-components';
import {Box} from 'react-bulma-components';
import PDFObject from 'pdfobject';
class Cuentas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nombre: null,
            iframeStyle : {
                margin: "0 auto",
                maxWidth: "100%",
                width: "100%",
                height: "500px",
                border: "1px solid #cfcfcf"
            },
            iframeStyle2 : {
                margin: "0 auto",
                maxWidth: "100%",
                width: "100%",
                height: "500px",
                border: "1px solid #cfcfcf",
                display: "none"
            }
        };
    }

    componentDidMount() {
        let JSON = this.props.location.state;
        let JSONF = JSON.JSONF;
        console.log(JSONF)
        const script = document.createElement("script");
        script.src = "https://www.riddle.com/files/js/embed.js";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.js"
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js"
        script.async = true;
        document.body.appendChild(script);
    }
    BalanzaComprobacion = () => {
        this.setState({
            Nombre: "Balanza de comprobación",
            iframeStyle2: this.state.iframeStyle
        });
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        PDFObject.embed("https://adoom-f-api.herokuapp.com/BalanzaHTML", `#IDCOINTEINER`, options);
    }
    EstadoFinanciero = () => {
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        PDFObject.embed("https://adoom-f-api.herokuapp.com/BalanceHTML", `#IDCOINTEINER`, options);
        this.setState({
            Nombre: "Balance general",
            iframeStyle2: this.state.iframeStyle
        });
    }
    EstadoResultado = () => {
        this.setState({ Nombre: "Estado de resultados",
        iframeStyle2: this.state.iframeStyle })
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        PDFObject.embed("https://adoom-f-api.herokuapp.com/EstadoRHTML", `#IDCOINTEINER`, options);
    }
    render() {
        
        return (
            <Section>
                <div className="container has-text-centered">
                    <Heading>
                        Estados Financieros
                </Heading>
                    <Heading subtitle size={5}>
                        {this.state.Nombre}
                    </Heading>
                    <Content>
                        <div style={this.state.iframeStyle2} id="IDCOINTEINER" />
                        {this.state.Nombre ? <div></div>:<h3>"Por favor de click en un boton para poder mostrar un estado financiero"</h3>}
                        <Box>
                            <Button.Group>
                                <Button renderAs="button" color="success" onClick={this.BalanzaComprobacion}>
                                    Balanza de comprobación
                                </Button>
                                < Button renderAs="button" color="success" onClick={this.EstadoResultado}>
                                    Estados de resultados
                                </Button>
                                < Button renderAs="button" color="success" onClick={this.EstadoFinanciero}>
                                    Balance general
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
                                <Button>&#60;&#60;Regresar</Button>
                            </Link>
                        </p>
                    </Content>
                </div >
            </Section >
        )
    }
}


export default Cuentas;