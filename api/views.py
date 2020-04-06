from flask import Blueprint, jsonify, request,redirect, url_for
from .models import CuentaM
from .models import CuentasExistentes
import json
main = Blueprint('main', __name__)

@main.route('/selectregistromercancia', methods=['POST'])
def SeleccionarRMercancias():
    cuentaMer_data = request.get_json()
    id = cuentaMer_data['idCM']
    DictioC = CuentaM(int(id)).copy()
    ArregloC = []
    for x in DictioC:
        ArregloC.append({'id':x,'NombreCuenta':DictioC[x]})
    return jsonify({'Cuentas':ArregloC})

@main.route('/ObtenerCuentaRegistradas')
def TodoCuentasAlmacenada():
    ObtenerC = CuentasExistentes().copy()
    ArregloC=[]
    for x in ObtenerC:
        ArregloC.append({'id':x,'NombreCuenta':ObtenerC[x]})
    return jsonify({'Cuentas':ArregloC})

@main.route('/TodosCuentas/<Cuentas>')
def abc(Cuentas):
    print("tELEFONO",Cuentas)
    return 'Hay papa'

@main.route('/Add_cuenta_uso', methods=['POST'])
def Add_cuenta_uso():
    cuentaausar_data = request.get_json()
    data = cuentaausar_data
    TodasCuentas=list()
    for i in data['Cuentas']: 
        TodasCuentas.append(i['NombreCuenta'])
    #print(TodasCuentas)
    return redirect(url_for('.abc', Cuentas=TodasCuentas))

@main.route('/CrearPDF')
def CrearPDF():
    return 'Even i cant grab this sword'