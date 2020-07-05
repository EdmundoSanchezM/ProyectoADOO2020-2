def GenerarEDOFPDF(Cuentas,MovimientosIzq,MovimientosDer,Utilidad,Impuestos):
    JSONCuentas = Cuentas
    JSONMovIzq = MovimientosIzq
    JSONMovDer = MovimientosDer
    UtilidadEjercicio = Utilidad
    ImpuestosPagar = Impuestos
    dataP = [['Estado Financiero',' ',' ',' ']]
    OrdenLista=['Caja','Fondo de caja chica','Bancos','Inversiones temporales','Almacen',"Inventario",'Mercancías','Clientes','Documentos por cobrar','Deudores diversos',
            'Anticipo a proveedores','Terrenos','Edificios','Mobiliario y equipo',
            'Equipo de cómputo electrónico','Equipo de transporte','Equipo de reparto','Depósitos en garantía','Inversiones permanentes','Gastos de investigación y desarrollo','Gastos en etapas preoperativas de organización y administración',
            'Gastos de mercadotecnia','Gastos de organización','Gastos de instalación','Papelería y útiles','Propaganda y publicidad','Primas de seguros','Rentas pagadas por anticipado','Intereses pagados por anticipado',
            'Gastos de administración','Gastos de ventas','Gastos financieros','Depositos en garantia',
            'Proveedores','Documentos por pagar','Acreedores diversos','Anticipo de clientes','Gastos pendientes de pago', 'Gastos por pagar o gastos acumulados',
            'Impuestos pendientes de pago', 'Impuestos por pagar o impuestos acumulados','Acreedores hipotecarios o hipotecas por pagar','Documentos por pagar a largo plazo','Cuentas por pagar a largo plazo',
            'Rentas cobradas por anticipado','Intereses cobrados por anticipado','Ventas','Costo de ventas',"Compras","Gasto de Compra","Devoluciones sobre compra","Rebajas sobre compra","Devoluciones sobre venta","Rebajas sobre venta",'Capital social']
    JSONCuentasC = []
    for i in range (0,len(OrdenLista)):
        for j in range(0,len(JSONCuentas)):
            if(OrdenLista[i]==JSONCuentas[j]["NombreCuenta"]):
                JSONCuentasC.append(JSONCuentas[j])
    dataP.append(["Activo", ' ', ' ', ' '])
    #Nueva Logica
    dataP.append([" Circulante", ' ', ' ', ' '])
    ActivoC = 10
    ActivoNC = 18
    ActivoD = 32
    PasivoC = 40
    PasivoF = 43
    PasivoD = 45
    STotalA=0
    auxSI=1
    auxSD=1
    Bandera=2
    ActivoCirculante = 0
    ActivoFijo = 0
    ActivoDiferido = 0
    #Activo Circulante
    for i in range (0,ActivoC):
        for k in range(0,len(JSONCuentasC)):
            if(OrdenLista[i]==JSONCuentasC[k]["NombreCuenta"]):
                NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
                MCantidadIzq = int(0)
                MCantidadDer = int(0)
                for j in range(0,len(JSONMovIzq)):
                    if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
                for j in range(0,len(JSONMovDer)):
                    if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
                SCantidadIzq = " "
                ActivoCirculante = ActivoCirculante + MCantidadIzq-MCantidadDer
                if(MCantidadIzq>MCantidadDer):
                    if  auxSI==1:
                        auxSI = 0
                        SCantidadIzq=''.join(['$',str(MCantidadIzq-MCantidadDer)])
                    else:
                        SCantidadIzq=str(MCantidadIzq-MCantidadDer)
                Bandera = Bandera + 1
                dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    Temporal = dataP[Bandera]
    Temporal = [Temporal[0],Temporal[1],''.join(['$',str(ActivoCirculante)]),Temporal[3]]
    dataP[Bandera] = Temporal
    Titulo = Bandera
    TAFijo = 0
    TADiferido = 0
    #Activo Fijo
    for i in range (ActivoC+1,ActivoNC):
        for k in range(0,len(JSONCuentasC)):
            if(OrdenLista[i]==JSONCuentasC[k]["NombreCuenta"]):
                NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
                MCantidadIzq = int(0)
                MCantidadDer = int(0)
                for j in range(0,len(JSONMovIzq)):
                    if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
                for j in range(0,len(JSONMovDer)):
                    if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
                SCantidadIzq = " "
                ActivoFijo = ActivoFijo + MCantidadIzq-MCantidadDer
                if(MCantidadIzq>MCantidadDer):
                    if  auxSI==1:
                        auxSI = 0
                        SCantidadIzq=''.join(['$',str(MCantidadIzq-MCantidadDer)])
                    else:
                        SCantidadIzq=str(MCantidadIzq-MCantidadDer)
                Bandera = Bandera + 1
                dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    if(ActivoFijo!=0):
        Temporal = dataP[Bandera]
        Temporal = [Temporal[0],Temporal[1],str(ActivoFijo),Temporal[3]]
        dataP[Bandera] = Temporal
        Temporaldata = dataP[Titulo+1:len(dataP)]
        TAFijo = Titulo+1
        dataP[Titulo+1]= ["  Fijo", ' ', ' ', ' ']
        dataP[Titulo+2:len(dataP)]= Temporaldata 
        Bandera = Bandera+1
    #Activo Diferido
    for i in range (ActivoNC+1,ActivoD):
        for k in range(0,len(JSONCuentasC)):
            if(OrdenLista[i]==JSONCuentasC[k]["NombreCuenta"]):
                NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
                MCantidadIzq = int(0)
                MCantidadDer = int(0)
                for j in range(0,len(JSONMovIzq)):
                    if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
                for j in range(0,len(JSONMovDer)):
                    if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
                SCantidadIzq = " "
                ActivoDiferido = ActivoDiferido + MCantidadIzq-MCantidadDer
                if(MCantidadIzq>MCantidadDer):
                    if  auxSI==1:
                        auxSI = 0
                        SCantidadIzq=''.join(['$',str(MCantidadIzq-MCantidadDer)])
                    else:
                        SCantidadIzq=str(MCantidadIzq-MCantidadDer)
                Bandera = Bandera + 1
                dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    if(ActivoDiferido!=0):
        Temporal = dataP[Bandera]
        Temporal = [Temporal[0],Temporal[1],str(ActivoDiferido),''.join(['$',str(ActivoCirculante+ActivoFijo+ActivoDiferido)])]
        dataP[Bandera] = Temporal
        Temporaldata = dataP[Titulo+1:len(dataP)]
        TADiferido = Titulo+1
        dataP[Titulo+1]= ["  Diferido", ' ', ' ', ' ']
        dataP[Titulo+2:len(dataP)]= Temporaldata
        Bandera = Bandera+1
    else:
        Temporal = dataP[Bandera]
        Temporal = [Temporal[0],Temporal[1],Temporal[2],''.join(['$',str(ActivoCirculante+ActivoFijo+ActivoDiferido)])]
        dataP[Bandera] = Temporal
        ActivoDiferido
    dataP.append(["Pasivo", ' ', ' ', ' '])
    #Nueva Logica
    dataP.append(["  Circulante", ' ', ' ', ' '])
    PasivoCirculante = 0
    PasivoFijo = 0
    PasivoDiferido = 0
    #Pasivo Circulante
    TPCirculante = Bandera + 2
    Bandera +=2
    for i in range (ActivoD+1,PasivoC):
        for k in range(0,len(JSONCuentasC)):
            if(OrdenLista[i]==JSONCuentasC[k]["NombreCuenta"]):
                NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
                MCantidadIzq = int(0)
                MCantidadDer = int(0)
                for j in range(0,len(JSONMovIzq)):
                    if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
                for j in range(0,len(JSONMovDer)):
                    if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
                SCantidadIzq = " "
                PasivoCirculante = PasivoCirculante + MCantidadDer-MCantidadIzq
                if(MCantidadIzq<MCantidadDer):
                    if  auxSI==1:
                        auxSI = 0
                        SCantidadIzq=''.join(['$',str(MCantidadDer-MCantidadIzq)])
                    else:
                        SCantidadIzq=str(MCantidadDer-MCantidadIzq)
                Bandera = Bandera + 1
                dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    if(PasivoCirculante !=0):
        PasivoCirculante = PasivoCirculante - ImpuestosPagar
    else:
        PasivoCirculante = Impuestos
    dataP.append(["Impuestos por pagar", ImpuestosPagar, ''.join(['$',str(PasivoCirculante)])])
    Titulo = Bandera
    TPFijo = 0
    TPDiferido = 0
    Bandera+=1
    #Pasivo Fijo
    for i in range (PasivoC+1,PasivoF):
        for k in range(0,len(JSONCuentasC)):
            if(OrdenLista[i]==JSONCuentasC[k]["NombreCuenta"]):
                NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
                MCantidadIzq = int(0)
                MCantidadDer = int(0)
                for j in range(0,len(JSONMovIzq)):
                    if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
                for j in range(0,len(JSONMovDer)):
                    if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
                SCantidadIzq = " "
                PasivoFijo = PasivoFijo + MCantidadDer-MCantidadIzq
                if(MCantidadIzq<MCantidadDer):
                    if  auxSI==1:
                        auxSI = 0
                        SCantidadIzq=''.join(['$',str(MCantidadDer-MCantidadIzq)])
                    else:
                        SCantidadIzq=str(MCantidadDer-MCantidadIzq)
                Bandera = Bandera + 1
                dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    if(PasivoFijo!=0):
        Temporal = dataP[Bandera]
        Temporal = [Temporal[0],Temporal[1],str(PasivoFijo),Temporal[3]]
        dataP[Bandera] = Temporal
        Temporaldata = dataP[Titulo+1:len(dataP)]
        TPFijo = Titulo+1
        dataP[Titulo+1]= ["  Fijo", ' ', ' ', ' ']
        dataP[Titulo+2:len(dataP)]= Temporaldata 
    #Pasivo Diferido
    for i in range (PasivoF+1,PasivoD):
        for k in range(0,len(JSONCuentasC)):
            if(OrdenLista[i]==JSONCuentasC[k]["NombreCuenta"]):
                NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
                MCantidadIzq = int(0)
                MCantidadDer = int(0)
                for j in range(0,len(JSONMovIzq)):
                    if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
                for j in range(0,len(JSONMovDer)):
                    if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                        MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
                SCantidadIzq = " "
                PasivoDiferido = PasivoDiferido + MCantidadDer-MCantidadIzq
                if(MCantidadIzq<MCantidadDer):
                    if  auxSI==1:
                        auxSI = 0
                        SCantidadIzq=''.join(['$',str(MCantidadDer-MCantidadIzq)])
                    else:
                        SCantidadIzq=str(MCantidadDer-MCantidadIzq)
                Bandera = Bandera + 1
                dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    if(PasivoDiferido!=0):
        Temporal = dataP[Bandera]
        Temporal = [Temporal[0],Temporal[1],str(PasivoDiferido),''.join(['$',str(PasivoCirculante+PasivoFijo+PasivoDiferido)])]
        dataP[Bandera] = Temporal
        TPDiferido = Titulo + 1
        Temporaldata = dataP[Titulo+1:len(dataP)]
        dataP[Titulo+1]= ["  Diferido", ' ', ' ', ' ']
        dataP[Titulo+2:len(dataP)]= Temporaldata
    else:
        Temporal = dataP[Bandera]
        Temporal = [Temporal[0],Temporal[1],Temporal[2],''.join(['$',str(PasivoCirculante+PasivoFijo+PasivoDiferido)])]
        dataP[Bandera] = Temporal
        ActivoDiferido
    #CapitalContable
    TCcontable = Bandera+1
    dataP.append(["Capital contable", ' ', ' ', ' '])
    #Nueva Logica
    CapitalSocial = 0
    for k in range(0,len(JSONCuentasC)):
        if("Capital social"==JSONCuentasC[k]["NombreCuenta"]):
            NombreCuenta=JSONCuentasC[k]["NombreCuenta"]
            MCantidadIzq = int(0)
            MCantidadDer = int(0)
            for j in range(0,len(JSONMovIzq)):
                if(JSONMovIzq[j]["NombreCuenta"]==NombreCuenta):
                    MCantidadIzq = MCantidadIzq+ int(JSONMovIzq[j]["Cantidad"])
            for j in range(0,len(JSONMovDer)):
                if(JSONMovDer[j]["NombreCuenta"]==NombreCuenta):
                    MCantidadDer = MCantidadDer+int(JSONMovDer[j]["Cantidad"])
            SCantidadIzq = " "
            CapitalSocial = CapitalSocial + MCantidadDer-MCantidadIzq
            SCantidadIzq=str(MCantidadDer-MCantidadIzq)
            Bandera = Bandera + 1
            dataP.append([''.join(['    ',NombreCuenta]),SCantidadIzq,' ',' '])
    dataP.append(["Utilidad del ejercicio", UtilidadEjercicio, ' ', ''.join(['$',str(CapitalSocial+UtilidadEjercicio)])])
    
    fileName = 'EstadoFinanciero.pdf'
    
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
        ('ALIGN',(0,0),(0,0),'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 14),
        ('FONTNAME', (0,1), (-1,1), 'Helvetica-Bold'),
        ('FONTNAME', (0,2), (0,2), 'Helvetica-Bold'),#AC
        ('FONTNAME', (0,TAFijo), (0,TAFijo), 'Helvetica-Bold'),#AF
        ('FONTNAME', (0,TADiferido), (0,TADiferido), 'Helvetica-Bold'),#AD
        ('FONTNAME', (0,TPCirculante-1), (0,TPCirculante-1), 'Helvetica-Bold'),#TP
        ('FONTNAME', (0,TPCirculante), (0,TPCirculante), 'Helvetica-Bold'),#PC
        ('FONTNAME', (0,TPFijo), (0,TPFijo), 'Helvetica-Bold'),#PF
        ('FONTNAME', (0,TPDiferido), (0,TPDiferido), 'Helvetica-Bold'),#PDTCcontable
        ('FONTNAME', (0,TCcontable), (0,TCcontable), 'Helvetica-Bold'),#TC
        ('BOTTOMPADDING', (0,0), (-1,0), 12),
        ('BACKGROUND',(0,1),(-1,-1),colors.white),
    ])
    table.setStyle(style)

    # 2) Alternate backgroud color
    # 3) Add borders
    ts = TableStyle(
        [
        ('BOX',(0,0),(-1,-1),1,colors.black),
        #('LINEBEFORE',(4,1),(4,1),1,colors.black),
        #('LINEABOVE',(0,1),(-1,1),1,colors.black),
        ('GRID',(0,1),(-1,-1),1,colors.black),
        ]
    )
    table.setStyle(ts)

    elems = []

    elems.append(table)


    pdf.build(elems)