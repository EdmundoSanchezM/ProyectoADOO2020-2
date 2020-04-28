# List of Lists
JSONCuentas=[{'id': 0, 'NombreCuenta': 'Almacen'}, {'id': 1, 'NombreCuenta': 'Ventas'}, {'id': 2, 'NombreCuenta': 'Costo de ventas'}, {'id': 0, 'NombreCuenta': 'Caja'}]
JSONMovIzq=[{'id': 0, 'NombreCuenta': 'Almacen', 'NumMovimiento': '1', 'Cantidad': '200', 'Check': True}, {'id': 1, 'NombreCuenta': 'Costo de ventas', 'NumMovimiento': '2', 'Cantidad': '1200', 'Check': True}, {'id': 2, 'NombreCuenta': 'Caja', 'NumMovimiento': '3', 'Cantidad': '50000', 'Check': True}]
JSONMovDer=[{'id': 0, 'NombreCuenta': 'Ventas', 'NumMovimiento': '1', 'Cantidad': '200', 'Check': True}, {'id': 1, 'NombreCuenta': 'Almacen', 'NumMovimiento': '2', 'Cantidad': '1200', 'Check': True}, {'id': 2, 'NombreCuenta': 'Costo de ventas', 'NumMovimiento': '3', 'Cantidad': '50000', 'Check': True}]
Tipo="Inventarios Perpetuos"
dataP = [['Balanza de comprobación',' ',' ',' ',' ',' '],
    [' ',' ','Movimientos',' ','Saldo',' '],
    ['No','Cuenta ','Deudor','Acreedor','Deudor','Acreedor']]
ISR=.36
PTU=.10
CuentasOAP = ['Inventario','Compras',"Gasto de Compra","Devoluciones sobre compra","Rebajas sobre compra","Ventas","Devoluciones sobre venta","Rebajas sobre venta",'Gastos de venta','Gastos de administración','Gastos financieros','Productos financieros','Otros gastos','Otros productos']
CuentasOIP = ['Almacen','Ventas','Costo de ventas','Gastos de venta','Gastos de administración','Gastos financieros','Productos financieros','Otros gastos','Otros productos']
JSONCuentasC = []
BanderaI=1
BanderaF=1
if(Tipo=='Analítico o Pormenorizado'):
    for i in range (0,len(CuentasOAP)):
        BanderaF=1
        for j in range(0,len(JSONCuentas)):
            if(CuentasOAP[i]==JSONCuentas[j]["NombreCuenta"]):
                JSONCuentasC.append(JSONCuentas[j])
                BanderaF=0
        if(BanderaF==1):
            JSONCuentasC.append(CuentasOAP[i])
elif(Tipo=='Inventarios Perpetuos'):
    for i in range (0,len(CuentasOIP)):
        BanderaF=1
        for j in range(0,len(JSONCuentas)):
            if(CuentasOIP[i]==JSONCuentas[j]["NombreCuenta"]):
                JSONCuentasC.append(JSONCuentas[j])
                BanderaF=0
        if(BanderaF==1):
            JSONCuentasC.append(CuentasOIP[i])
CantidadesOrdenadas= []
for i in range (0,len(JSONCuentasC)):
    NombreCuenta=JSONCuentasC[i]["NombreCuenta"]
    MCantidadIzq = int(0)
    MCantidadDer = int(0)
    for j in range(0,len(JSONMovIzq)):
        if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
            MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
        if(JSONMovIzq[j]["NombreCuenta"]=="Inventario" and BanderaI==1):
            BanderaI==0
            InventarioInicial=int(JSONMovIzq[j]["Cantidad"])
    for j in range(0,len(JSONMovDer)):
        if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
            MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
    if(MCantidadIzq>MCantidadDer):
        CantidadesOrdenadas.append(MCantidadIzq-MCantidadDer)
    else:
        CantidadesOrdenadas.append(MCantidadDer-MCantidadIzq)
#Generar datos
ArregloCuentas=["Ventas netas","Compras totales","Compras netas","Total de mercancias","Costo de ventas","bruta","de operación","neta"]
ArregloCuentasValores=[]
if(Tipo=='Analítico o Pormenorizado'):
    ArregloCuentasValores.append(CantidadesOrdenadas[5]-(CantidadesOrdenadas[6]+CantidadesOrdenadas[7]))
    ArregloCuentasValores.append(CantidadesOrdenadas[1]+CantidadesOrdenadas[2])
    ArregloCuentasValores.append(ArregloCuentasValores[1]-(CantidadesOrdenadas[3]+CantidadesOrdenadas[4]))
    ArregloCuentasValores.append(ArregloCuentasValores[2]+InventarioInicial)
    ArregloCuentasValores.append(ArregloCuentasValores[3]-CantidadesOrdenadas[0])
    if(ArregloCuentasValores[0]-ArregloCuentasValores[4]>0):
        ArregloCuentas[5]=="Utilidad bruta"
    else:
        ArregloCuentas[5]=="Perdida bruta"
    ArregloCuentasValores.append(ArregloCuentasValores[0]-ArregloCuentasValores[4])
    ##############################################################
    if(ArregloCuentasValores[5]-CantidadesOrdenadas[8]-CantidadesOrdenadas[9]-CantidadesOrdenadas[10]+CantidadesOrdenadas[11]>0):
        ArregloCuentas[6]=="Utilidad de operación"
    else:
        ArregloCuentas[6]=="Perdida de operacion"
    ArregloCuentasValores.append(ArregloCuentasValores[5]-CantidadesOrdenadas[8]-CantidadesOrdenadas[9]-CantidadesOrdenadas[10]+CantidadesOrdenadas[11])
    ##############################################################
    if(ArregloCuentasValores[6]-CantidadesOrdenadas[12]+CantidadesOrdenadas[13]>0):
        ArregloCuentas[7]=="Utilidad de neta"
    else:
        ArregloCuentas[7]=="Perdida de neta"
    ArregloCuentasValores.append(ArregloCuentasValores[6]-CantidadesOrdenadas[12]+CantidadesOrdenadas[13])
elif(Tipo=='Inventarios Perpetuos'):

fileName = 'EstadosdeResultados.pdf'

from reportlab.platypus import SimpleDocTemplate
from reportlab.lib.pagesizes import A4
pdf = SimpleDocTemplate(
    fileName,
    pagesize=A4
)

from reportlab.platypus import Table
table = Table(dataP)

# add style
from reportlab.platypus import TableStyle
from reportlab.lib import colors

style = TableStyle([
    ('SPAN',(0,0),(-1,0)),
    ('BACKGROUND', (0,0), (3,0), colors.white),
    ('TEXTCOLOR',(0,0),(-1,0),colors.black),
    ('ALIGN',(0,0),(-1,-1),'LEFT'),
    ('ALIGN',(0,0),(5,0),'CENTER'),
    ('ALIGN',(2,len(dataP)-1),(-1,len(dataP)-1),'CENTER'),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,0), 14),
    ('FONTNAME', (0,1), (-1,1), 'Helvetica-Bold'),

    ('BOTTOMPADDING', (0,0), (-1,0), 12),

    ('BACKGROUND',(0,1),(-1,-1),colors.white),
])
table.setStyle(style)

# 2) Alternate backgroud color
# 3) Add borders
ts = TableStyle(
    [
    ('BOX',(0,0),(-1,-1),1,colors.black),
    ('LINEBEFORE',(2,1),(2,1),1,colors.black),
    ('LINEBEFORE',(4,1),(4,1),1,colors.black),
    ('LINEABOVE',(0,1),(-1,1),1,colors.black),
    ('GRID',(0,2),(-1,-1),1,colors.black),
    ]
)
table.setStyle(ts)

elems = []

elems.append(table)


pdf.build(elems)