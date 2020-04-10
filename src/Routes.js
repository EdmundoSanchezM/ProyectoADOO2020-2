import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import RegistroMercancia from './components/RegistroMercancia';
import Cuentas from './components/Cuentas';

const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/registromercancia' component={RegistroMercancia}/>
            <Route path='/cuentas' component={Cuentas}/>
        </Switch>
    );
}

export default Routes;