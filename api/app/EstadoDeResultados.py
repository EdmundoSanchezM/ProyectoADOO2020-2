def GenerarEDORPDF(Cuentas,MovimientosIzq,MovimientosDer,Metodo):
    JSONCuentas = Cuentas
    JSONMovIzq = MovimientosIzq
    JSONMovDer = MovimientosDer
    Tipo = Metodo
    dataP = [['Estado de resultados',' ',' ',' ',' ']]
    ISR=.36
    PTU=.10
    CuentasOAP = ['Inventario','Compras',"Gasto de Compra","Devoluciones sobre compra","Rebajas sobre compra","Ventas","Devoluciones sobre venta","Rebajas sobre venta",'Gasto de venta','Gasto de administración','Gastos financieros','Productos financieros','Otros gastos','Otros productos']
    CuentasOIP = ['Almacen','Ventas','Costo de ventas','Gasto de venta','Gasto de administración','Gastos financieros','Productos financieros','Otros gastos','Otros productos']
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
                JSONCuentasC.append({'id': 0, 'NombreCuenta': CuentasOAP[i]})
    elif(Tipo=='Inventarios Perpetuos'):
        for i in range (0,len(CuentasOIP)):
            BanderaF=1
            for j in range(0,len(JSONCuentas)):
                if(CuentasOIP[i]==JSONCuentas[j]["NombreCuenta"]):
                    JSONCuentasC.append(JSONCuentas[j])
                    BanderaF=0
            if(BanderaF==1):
                JSONCuentasC.append({'id': 0, 'NombreCuenta': CuentasOIP[i]})
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
    ArregloCuentas=["Ventas netas","Compras totales","Compras netas","Total de mercancias","Costo de ventas","bruta","de operación","neta","ISR (36%)","PTU (10%)","F"]
    ArregloCuentasValores=[]
    if(Tipo=='Analítico o Pormenorizado'):
        ArregloCuentasValores.append(CantidadesOrdenadas[5]-(CantidadesOrdenadas[6]+CantidadesOrdenadas[7]))
        ArregloCuentasValores.append(CantidadesOrdenadas[1]+CantidadesOrdenadas[2])
        ArregloCuentasValores.append(ArregloCuentasValores[1]-(CantidadesOrdenadas[3]+CantidadesOrdenadas[4]))
        ArregloCuentasValores.append(ArregloCuentasValores[2]+InventarioInicial)
        ArregloCuentasValores.append(ArregloCuentasValores[3]-CantidadesOrdenadas[0])
        if(ArregloCuentasValores[0]-ArregloCuentasValores[4]>0):
            ArregloCuentas[5]="Utilidad bruta"
        else:
            ArregloCuentas[5]="Perdida bruta"
        ArregloCuentasValores.append(ArregloCuentasValores[0]-ArregloCuentasValores[4])
        ##############################################################
        if(ArregloCuentasValores[5]-CantidadesOrdenadas[8]-CantidadesOrdenadas[9]-CantidadesOrdenadas[10]+CantidadesOrdenadas[11]>0):
            ArregloCuentas[6]="Utilidad de operación"
        else:
            ArregloCuentas[6]="Perdida de operacion"
        ArregloCuentasValores.append(ArregloCuentasValores[5]-CantidadesOrdenadas[8]-CantidadesOrdenadas[9]-CantidadesOrdenadas[10]+CantidadesOrdenadas[11])
        ##############################################################
        if(ArregloCuentasValores[6]-CantidadesOrdenadas[12]+CantidadesOrdenadas[13]>0):
            ArregloCuentas[7]="Utilidad de neta"
            ArregloCuentasValores.append(ArregloCuentasValores[6]-CantidadesOrdenadas[12]+CantidadesOrdenadas[13])
            if(ArregloCuentasValores[7]-ArregloCuentasValores[7]*ISR-ArregloCuentasValores[7]*PTU>0):
                ArregloCuentas[10]="Utilidad del ejercicio"
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*ISR,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*PTU,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]-ArregloCuentasValores[8]-ArregloCuentasValores[9],2))
            else:
                ArregloCuentas[10]="Perdida del ejercicio"
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*ISR,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*PTU,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]-ArregloCuentasValores[8]-ArregloCuentasValores[9],2))
        else:
            ArregloCuentas[7]="Perdida de neta"
            ArregloCuentasValores.append(round(ArregloCuentasValores[6]-CantidadesOrdenadas[12]+CantidadesOrdenadas[13],2))
            ArregloCuentas[10]="Perdida del ejercicio"
            ArregloCuentasValores.append(round(ArregloCuentasValores[6]-CantidadesOrdenadas[12]+CantidadesOrdenadas[13],2))
    elif(Tipo=='Inventarios Perpetuos'):
        ArregloCuentasValores.append(CantidadesOrdenadas[1])
        ArregloCuentasValores.append("NO")
        ArregloCuentasValores.append("NO")
        ArregloCuentasValores.append("NO")
        ArregloCuentasValores.append(CantidadesOrdenadas[2])
        if(ArregloCuentasValores[0]-ArregloCuentasValores[4]>0):
            ArregloCuentas[5]="Utilidad bruta"
        else:
            ArregloCuentas[5]="Perdida bruta"
        ArregloCuentasValores.append(ArregloCuentasValores[0]-ArregloCuentasValores[4])
        ##############################################################
        if(ArregloCuentasValores[5]-CantidadesOrdenadas[3]-CantidadesOrdenadas[4]-CantidadesOrdenadas[5]+CantidadesOrdenadas[6]>0):
            ArregloCuentas[6]="Utilidad de operación"

        else:
            ArregloCuentas[6]="Perdida de operacion"
        ArregloCuentasValores.append(ArregloCuentasValores[5]-CantidadesOrdenadas[3]-CantidadesOrdenadas[4]-CantidadesOrdenadas[5]+CantidadesOrdenadas[6])
        ##############################################################
        if(ArregloCuentasValores[6]-CantidadesOrdenadas[7]+CantidadesOrdenadas[8]>0):
            ArregloCuentas[7]="Utilidad de neta"
            ArregloCuentasValores.append(ArregloCuentasValores[6]-CantidadesOrdenadas[7]+CantidadesOrdenadas[8])
            if(ArregloCuentasValores[7]-ArregloCuentasValores[7]*ISR-ArregloCuentasValores[7]*PTU>0):
                ArregloCuentas[10]="Utilidad del ejercicio"
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*ISR,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*PTU,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]-ArregloCuentasValores[8]-ArregloCuentasValores[9],2))
            else:
                ArregloCuentas[10]="Perdida del ejercicio"
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*ISR,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]*PTU,2))
                ArregloCuentasValores.append(round(ArregloCuentasValores[7]-ArregloCuentasValores[8]-ArregloCuentasValores[9],2))
        else:
            ArregloCuentas[7]="Perdida de neta"
            ArregloCuentasValores.append(round(ArregloCuentasValores[6]-CantidadesOrdenadas[7]+CantidadesOrdenadas[8],2))
            ArregloCuentas[10]="Perdida del ejercicio"
            ArregloCuentasValores.append(round(ArregloCuentasValores[6]-CantidadesOrdenadas[7]+CantidadesOrdenadas[8],2))
            ArregloCuentas.remove("ISR (36%)")
            ArregloCuentas.remove("PTU (10%)")
    ##########Formato tabla########### 
    banderaCostos=1
    for i in range(0,len(ArregloCuentas)):
        if ArregloCuentas[i]=="Ventas netas":
            dataP.append([ArregloCuentas[i]," ", " "," ",''.join(['$',str(ArregloCuentasValores[i])])])
            dataP.append(["menos"," ", " "," "," "])
        if ArregloCuentas[i]=="Costo de ventas":
            dataP.append([ArregloCuentas[i]," ", " "," ",str(ArregloCuentasValores[i])])
        if ArregloCuentas[i]=="Utilidad bruta" or ArregloCuentas[i]=="Perdida bruta":
            if ArregloCuentas[i]=="Utilidad bruta":
                dataP.append([ArregloCuentas[i]," ", " "," ",str(ArregloCuentasValores[i])])
            else:
                dataP.append([ArregloCuentas[i]," ", " "," ",''.join(['(',str(ArregloCuentasValores[i]*-1),')'])])
            if(Tipo=='Analítico o Pormenorizado'):
                if  CantidadesOrdenadas[CuentasOAP.index('Gasto de venta')]>0:
                    if banderaCostos==1 and CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')]>0:
                        banderaCostos=0
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gasto de venta'," ",''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de venta')])])," "," "])
                    else:
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gasto de venta'," ",''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de venta')])]),''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de venta')])])," "])
                if  CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')]>0:
                    if banderaCostos==1:
                        banderaCostos=0
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gasto de administración'," ",''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')])]),''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')])])," "])
                    else:
                        dataP.append(['Gasto de administración',' ',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')]),''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')]+CantidadesOrdenadas[CuentasOAP.index('Gasto de venta')])])," "])
                if  CantidadesOrdenadas[CuentasOAP.index('Gastos financieros')]>0:
                    if banderaCostos==1:
                        banderaCostos=0
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gastos financieros'," ",""," ",''.join(['$',str(CantidadesOrdenadas[CuentasOAP.index('Gastos financieros')])])])
                    else:
                        dataP.append(["mas"," ", " "," "," "])
                        dataP.append(['Gastos financieros'," ", " ",str(CantidadesOrdenadas[CuentasOAP.index('Gastos financieros')]),str(CantidadesOrdenadas[CuentasOAP.index('Gasto de administración')]+CantidadesOrdenadas[CuentasOAP.index('Gasto de venta')]+CantidadesOrdenadas[CuentasOAP.index('Gastos financieros')])])
            else:
                if  CantidadesOrdenadas[CuentasOIP.index('Gasto de venta')]>0:
                    if banderaCostos==1 and CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')]>0:
                        banderaCostos=0
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gasto de venta'," ", ''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de venta')])])," "," "])
                    else:
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gasto de venta'," ", ''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de venta')])]),''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de venta')])])," "])
                if  CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')]>0:
                    if banderaCostos==1:
                        banderaCostos=0
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gasto de administración'," ",''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')])]),''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')])])," "])
                    else:
                        dataP.append(['Gasto de administración','',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')]),''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')]+CantidadesOrdenadas[CuentasOIP.index('Gasto de venta')])]),""])
                if  CantidadesOrdenadas[CuentasOIP.index('Gastos financieros')]>0:
                    if banderaCostos==1:
                        banderaCostos=0
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Gastos financieros'," ",""," ",''.join(['$',str(CantidadesOrdenadas[CuentasOIP.index('Gastos financieros')])])])
                    else:
                        dataP.append(["mas"," ", " "," "," "])
                        dataP.append(['Gastos financieros'," ", " ",str(CantidadesOrdenadas[CuentasOIP.index('Gastos financieros')]),str(CantidadesOrdenadas[CuentasOIP.index('Gasto de administración')]+CantidadesOrdenadas[CuentasOIP.index('Gasto de venta')]+CantidadesOrdenadas[CuentasOIP.index('Gastos financieros')])])
        if ArregloCuentas[i]=="Perdida de operacion" or ArregloCuentas[i]=="Utilidad de operación":
            if ArregloCuentas[i]=="Utilidad de operación":
                dataP.append([ArregloCuentas[i]," ", " "," ",str(ArregloCuentasValores[i])])
            else:
                dataP.append([ArregloCuentas[i]," ", " "," ",''.join(['(',str(ArregloCuentasValores[i]*-1),')'])])
            if(Tipo=='Analítico o Pormenorizado'):
                if  CantidadesOrdenadas[CuentasOAP.index('Otros gastos')]>0:
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Otros gastos'," ",""," ",str(CantidadesOrdenadas[CuentasOAP.index('Otros gastos')])])
                if  CantidadesOrdenadas[CuentasOAP.index('Otros productos')]>0:
                        dataP.append(["mas"," ", " "," "," "])
                        dataP.append(['Otros productos'," ", " ","",str(CantidadesOrdenadas[CuentasOAP.index('Otros productos')])])
            else:
                if  CantidadesOrdenadas[CuentasOIP.index('Otros gastos')]>0:
                        dataP.append(["menos"," ", " "," "," "])
                        dataP.append(['Otros gastos'," ",""," ",str(CantidadesOrdenadas[CuentasOIP.index('Otros gastos')])])
                if  CantidadesOrdenadas[CuentasOIP.index('Otros productos')]>0:
                        dataP.append(["mas"," ", " "," "," "])
                        dataP.append(['Otros productos'," ", " ","",str(CantidadesOrdenadas[CuentasOIP.index('Otros productos')])])
        if ArregloCuentas[i]=="Perdida del ejercicio" or ArregloCuentas[i]=="Utilidad del ejercicio":
            if "ISR (36%)" in ArregloCuentas:
                dataP.append([ArregloCuentas[i-3]," ", " "," ",str(ArregloCuentasValores[i-3])])
                dataP.append(["menos"," ", " "," "," "])
                dataP.append([ArregloCuentas[i-2]," ", " ",str(ArregloCuentasValores[i-2]),""])
                dataP.append([ArregloCuentas[i-1]," ", " ",str(ArregloCuentasValores[i-1]),str(round(ArregloCuentasValores[i-1]+ArregloCuentasValores[i-2],2))])
                dataP.append([ArregloCuentas[i]," ", " "," ",str(ArregloCuentasValores[i])])
            else:
                dataP.append([ArregloCuentas[i]," ", " "," ",''.join(['(',str(ArregloCuentasValores[i]*-1),')'])])
    
    fileName = 'EstadosdeResultados.pdf'

    from reportlab.platypus import SimpleDocTemplate
    from reportlab.lib.pagesizes import A4
    pdf = SimpleDocTemplate(
        fileName,
        pagesize=A4
    )

    from reportlab.platypus import Table
    table = Table(dataP)
    from reportlab.platypus import TableStyle
    from reportlab.lib import colors
    from .EstadoFinanciero import GenerarEDOFPDF
    style = TableStyle([
        ('SPAN',(0,0),(-1,0)),
        ('BACKGROUND', (0,0), (3,0), colors.white),
        ('TEXTCOLOR',(0,0),(-1,0),colors.black),
        ('ALIGN',(0,0),(-1,-1),'LEFT'),
        ('ALIGN',(0,0),(4,0),'CENTER'),
        ('ALIGN',(2,len(dataP)-1),(-1,len(dataP)-1),'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 14),
        ('FONTNAME', (0,1), (-1,1), 'Helvetica'),
        ('BOTTOMPADDING', (0,0), (-1,0), 12),
        ('BACKGROUND',(0,1),(-1,-1),colors.white),
    ])
    table.setStyle(style)
    ts = TableStyle(
        [
        ('BOX',(0,0),(-1,-1),1,colors.black),
        ('LINEABOVE',(0,1),(-1,1),1,colors.black),
        ('GRID',(0,1),(-1,-1),1,colors.black),
        ]
    )
    table.setStyle(ts)

    elems = []

    elems.append(table)
    pdf.build(elems)

    Impuestos = 0
    Utilidad = 0
    for i in range(0,len(ArregloCuentas)):
        if ArregloCuentas[i]=="Perdida del ejercicio" or ArregloCuentas[i]=="Utilidad del ejercicio":
            if "ISR (36%)" in ArregloCuentas:
                Impuestos = round(ArregloCuentasValores[i-1]+ArregloCuentasValores[i-2],2)
                Utilidad = ArregloCuentasValores[i]
            else:
                Utilidad = ArregloCuentasValores[i]
    GenerarEDOFPDF(Cuentas,MovimientosIzq,MovimientosDer,Utilidad,Impuestos)