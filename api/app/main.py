from flask import Flask, jsonify, request,redirect, url_for,send_file,render_template
from .models import CuentaM
from .models import CuentasExistentes
from .models import PDFInicio
from .Balanzadecomprobacion import GenerarBDCPDF
from .EstadoDeResultados import GenerarEDORPDF
import json
#main
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def home_view():
        return "<h1>ADOMF API</h1>"

@app.route('/selectregistromercancia', methods=['POST'])
def SeleccionarRMercancias():
    cuentaMer_data = request.get_json()
    id = cuentaMer_data['idCM']
    DictioC = CuentaM(int(id)).copy()
    ArregloC = []
    for x in DictioC:
        ArregloC.append({'id':x,'NombreCuenta':DictioC[x]})
    return jsonify(ArregloC)

@app.route('/ObtenerCuentasExistentes')
def TodoCuentasAlmacenada():
    ObtenerC = CuentasExistentes().copy()
    ArregloC=[]
    for x in ObtenerC:
        ArregloC.append({'id':x,'NombreCuenta':ObtenerC[x]})
    return jsonify(ArregloC)

@app.route('/GetTodoCuentas', methods=['POST'])
def Add_cuenta_uso():
    cuentaausar_data = request.get_json()
    data = cuentaausar_data['Cuentas']
    data2 = cuentaausar_data['MovimientosIzq']
    data3 = cuentaausar_data['MovimientosDer']
    data4 = cuentaausar_data['Metodo']
    GenerarBDCPDF(data,data2,data3)
    GenerarEDORPDF(data,data2,data3,data4)
    return 'Done', 201

@app.route('/BalanzaHTML')
def BalanzaHTML():
	return render_template('Balance.html')

@app.route('/EstadoRHTML')
def EstadoRHTML():
	return render_template('Balanza.html')

@app.route('/BalanceHTML')
def BalanceHTML():
	return render_template('EstadoR.html')

@app.route('/BalanzadeComprobacionPDF')
def Balanzapdf():
    return send_file('../Balanzadecomprobacion.pdf',attachment_filename='Balanzadecomprobacion.pdf')

@app.route('/EstadoFinancieroPDF')
def EdoFpdf():
    return send_file('../EstadoFinanciero.pdf',attachment_filename='EstadoFinanciero.pdf')

@app.route('/EstadosdeResultadosPDF')
def EdoRpdf():
    return send_file('../EstadosdeResultados.pdf',attachment_filename='EstadosdeResultados.pdf')
