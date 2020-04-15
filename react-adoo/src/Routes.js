import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import RegistroMercancia from './components/RegistroMercancia';
import Cuentas from './components/Cuentas';
import NuevaCuenta from './components/NuevaCuenta';
import DetalleCuenta from './components/DetalleCuenta';
import NuevoMovimiento from './components/NuevoMovimiento';

const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/registromercancia' component={RegistroMercancia}/>
            <Route path='/cuentas' component={Cuentas}/>
            <Route path='/addcuenta' component={NuevaCuenta}/>
            <Route path='/infocuenta' component={DetalleCuenta}/>
            <Route path='/addmovimiento' component={NuevoMovimiento}/>
        </Switch>
    );
}

export default Routes;