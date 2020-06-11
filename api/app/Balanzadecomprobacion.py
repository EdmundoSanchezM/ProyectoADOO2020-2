def GenerarBDCPDF(Cuentas,MovimientosIzq,MovimientosDer):
    JSONCuentas = Cuentas
    JSONMovIzq = MovimientosIzq
    JSONMovDer = MovimientosDer
    dataP = [['Balanza de comprobación',' ',' ',' ',' ',' '],
        [' ',' ','Movimientos',' ','Saldo',' '],
        ['No','Cuenta ','Deudor','Acreedor','Deudor','Acreedor']]
    OrdenLista=['Caja','Fondo de caja chica','Bancos','Inversiones temporales','Almacen',"Inventario",'Mercancías','Clientes','Documentos por cobrar','Deudores diversos',
            'Anticipo a proveedores','Terrenos','Edificios','Mobiliario y equipo',
            'Equipo de cómputo electrónico','Equipo de transporte','Equipo de reparto','Depósitos en garantía','Inversiones permanentes','Gastos de investigación y desarrollo','Gastos en etapas preoperativas de organización y administración',
            'Gastos de mercadotecnia','Gastos de organización','Gastos de instalación','Papelería y útiles','Propaganda y publicidad','Primas de seguros','Rentas pagadas por anticipado','Intereses pagados por anticipado',
            'Gastos de administración','Gastos de ventas','Gastos financieros','Depositos en garantia','Proveedores','Documentos por pagar','Acreedores diversos','Anticipo de clientes','Gastos pendientes de pago', 'Gastos por pagar o gastos acumulados',
            'Impuestos pendientes de pago', 'Impuestos por pagar o impuestos acumulados','Acreedores hipotecarios o hipotecas por pagar','Documentos por pagar a largo plazo','Cuentas por pagar a largo plazo',
            'Rentas cobradas por anticipado','Intereses cobrados por anticipado','Ventas','Costo de ventas',"Compras","Gasto de Compra","Devoluciones sobre compra","Rebajas sobre compra","Devoluciones sobre venta","Rebajas sobre venta",'Capital social']
    JSONCuentasC = []
    for i in range (0,len(OrdenLista)):
        for j in range(0,len(JSONCuentas)):
            if(OrdenLista[i]==JSONCuentas[j]["NombreCuenta"]):
                JSONCuentasC.append(JSONCuentas[j])
    MTotalA=0
    MTotalD=0
    STotalA=0
    STotalD=0
    auxMI=1
    auxMD=1
    auxSI=1
    auxSD=1
    for i in range (0,len(JSONCuentasC)):
        NombreCuenta=JSONCuentasC[i]["NombreCuenta"]
        MCantidadIzq = int(0)
        MCantidadDer = int(0)
        for j in range(0,len(JSONMovIzq)):
            if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
        for j in range(0,len(JSONMovDer)):
            if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
        MTotalA=MTotalA+MCantidadIzq
        MTotalD=MTotalD+MCantidadDer
        SCantidadIzq = " "
        SCantidadDer = " "
        STotalA = STotalA+MCantidadIzq-MCantidadDer if MCantidadIzq>MCantidadDer else STotalA+0
        STotalD = STotalD+MCantidadDer-MCantidadIzq if MCantidadIzq<MCantidadDer else STotalD+0
        MCantidadIzqA = " "
        MCantidadDerA = " "
        if(MCantidadIzq!=0):
            if  auxMI==1:
                auxMI = 0
                MCantidadIzqA=''.join(['$',str(MCantidadIzq)]) 
            else:
                MCantidadIzqA=str(MCantidadIzq)
        if(MCantidadDer!=0):
            if auxMD==1:
                auxMD=0
                MCantidadDerA=''.join(['$',str(MCantidadDer)]) 
            else:
                MCantidadDerA=str(MCantidadDer)
        if(MCantidadIzq>MCantidadDer):
            if  auxSI==1:
                auxSI = 0
                SCantidadIzq=''.join(['$',str(MCantidadIzq-MCantidadDer)])
            else:
                SCantidadIzq=str(MCantidadIzq-MCantidadDer)
        if( MCantidadIzq<MCantidadDer):
            if auxSD==1:
                auxSD=0
                SCantidadDer=''.join(['$',str(MCantidadDer-MCantidadIzq)])  
            else:
                SCantidadDer=str(MCantidadDer-MCantidadIzq)
        dataP.append([i+1,NombreCuenta, MCantidadIzqA,MCantidadDerA,SCantidadIzq,SCantidadDer])
    dataP.append([" ", "Sumas Iguales:",str(MTotalA),str(MTotalD),str(STotalA),str(STotalD)])
    
    fileName = 'Balanzadecomprobacion.pdf'

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