import React from 'react';
import {Content} from 'react-bulma-components';
import {Heading} from 'react-bulma-components';
import {Button} from 'react-bulma-components';
import {Section} from 'react-bulma-components';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Section>
            <div className="container has-text-centered">
                <Heading>
                    Proyecto ADOO
              </Heading>
                <Content>
                    <p>Sea usted bienvenido a un sistema que hace el cáculo de estados financieros.
                <br></br>
                Espero que este mensaje básico no interfiera con su experiencia :)
                </p>
                <Link to="/registromercancia">
                    <Button renderAs="button" color="success">
                        Comenzar
                    </Button>
                </Link>
                </Content>
            </div>
        </Section>
    );
}

export default Home;