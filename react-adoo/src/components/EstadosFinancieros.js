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
        this.state = {
        };
    }
    componentDidMount() {
        let JSON = this.props.location.state;
        let JSONF = JSON.JSONF;
        var self = this;
        axios.post('/GetTodoCuentas', JSONF)
            .then(function (response) {
            })
            .catch(function (error) {
            });
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
                                <p>Hey que pasa chavales</p>
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
                    {/*<Content>
                        <p align="left">
                            <Link to="/registromercancia">
                                <Button>&#60;&#60;Pagina anterior</Button>
                            </Link>
                        </p>
                    </Content>*/}
                </div>
            </Section>
        )
    }
}


export default Cuentas;
