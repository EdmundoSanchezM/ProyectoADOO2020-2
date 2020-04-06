
def CuentaM (id):
    Cuentas = dict()
    if(int(id)==0):
        Cuentas = {0:'Almacen',1:'Ventas',2:'Costo de ventas'}
    else:
        Cuentas = {0:"Inventario",1:"Compras",2:"Gasto de Compra",3:"Devoluciones sobre compra",4:"Rebajas sobre compra",
        5:"Ventas",6:"Devoluciones sobre venta",7:"Rebajas sobre venta"}
    return Cuentas

def CuentasExistentes():
    ArregloC = {
        0:'Caja',1:'Fondo de caja chica',2:'Bancos',3:'Inversiones temporales',
        4:'Mercancías',5:'Clientes',6:'Documentos por cobrar',7:'Deudores diversos',
        8:'Anticipo a proveedores',9:'Terrenos',10:'Edificios',11:'Mobiliario y equipo',
        12:'Equipo de cómputo electrónico',13:'Equipo de reparto',14:'Depósitos en garantía',
        15:'Inversiones permanentes',16:'Gastos de investigación y desarrollo',17:'Gastos en etapas preoperativas de organización y administración',
        18:'Gastos de mercadotecnia',19:'Gastos de organización',20:'Gastos de instalación',21:'Papelería y útiles',22:'Propaganda y publicidad',
        23:'Primas de seguros',24:'Rentas pagadas por anticipado',25:'Intereses pagados por anticipado',26:'Proveedores',27:'Documentos por pagar',
        28:'Acreedores diversos',29:'Anticipo de clientes',30:'Gastos pendientes de pago, gastos por pagar o gastos acumulados',
        31:'Impuestos pendientes de pago, impuestos por pagar o impuestos acumulados',32:'Acreedores hipotecarios o hipotecas por pagar',
        33:'Rentas cobradas por anticipado',34:'Intereses cobrados por anticipado'
        }
    return ArregloC