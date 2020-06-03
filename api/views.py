from flask import Blueprint, jsonify, request,redirect, url_for
from .models import CuentaM
from .models import CuentasExistentes
from .models import PDFInicio
from .Balanzadecomprobacion import GenerarBDCPDF
from .EstadoDeResultados import GenerarEDORPDF

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
    return jsonify(ArregloC)

@main.route('/ObtenerCuentasExistentes')
def TodoCuentasAlmacenada():
    ObtenerC = CuentasExistentes().copy()
    ArregloC=[]
    for x in ObtenerC:
        ArregloC.append({'id':x,'NombreCuenta':ObtenerC[x]})
    return jsonify(ArregloC)

#@main.route('/TodosCuentas/<Cuentas>')
#def abc(Cuentas):
#    print("tELEFONO",Cuentas)
#    return 'Hay papa'

@main.route('/GetTodoCuentas', methods=['POST'])
def Add_cuenta_uso():
    cuentaausar_data = request.get_json()
    data = cuentaausar_data['Cuentas']
    data2 = cuentaausar_data['MovimientosIzq']
    data3 = cuentaausar_data['MovimientosDer']
    data4 = cuentaausar_data['Metodo']
    GenerarBDCPDF(data,data2,data3)
    GenerarEDORPDF(data,data2,data3,data4)
    #for i in data['Cuentas']: 
    #    TodasCuentas.append(i['NombreCuenta'])
    #print(TodasCuentas)
    return 'Done', 201#redirect(url_for('.abc', Cuentas=TodasCuentas))

@main.route('/CrearPDF')
def CrearPDF():
    return 'Even i cant grab this sword'