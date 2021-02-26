//var divBillete = document.createElement("div");
class billete
{
	constructor(v,c)
	{
		this.image = new Image();
		this.valor = v;
		this.cantidad = c;
		this.image.src = imagBillete[this.valor];
	}
	alistarDinero()
	{
		divBillete.innerHTML += "<img src=" + this.image.src + ">";//no se esta usando
	}
}

var	ventanaPrincipal = document.getElementById("ventana"),
	h2 = document.getElementById("tituloVentana"),
	divSoles = document.createElement("div"),
	simboloSoles = document.createElement("p"),
	soles = document.createElement("input"),
	ventanaInterior = document.createElement("div"),
	dineroSolicitado,
	retiroRapido = false,
	entregado = [];

var canvas = document.getElementById("canvas"),
	papel = canvas.getContext("2d");

//COORDENADAS INICIALES DE LOS BILLETES IMPRESOS
var x = 0,
	y = 0;

//LISTA DE BOTONES DEL TECLADO NUMERICO
const botonNumero = document.getElementsByName("numero");

//LISTA DE BOTONES DE LOS BILLETES
var botonBillete = document.getElementsByName("billete");

//BOTONES DEL MENU INICIO
var	divRecarga = document.getElementById("divRecarga"),
	divRetiro = document.getElementById("divRetiro"),
	divPago = document.getElementById("divPago"),
	divConsulta = document.getElementById("divConsulta"),
	divDeposito = document.getElementById("divDeposito"),
	divOtro = document.getElementById("divOtro");

var	recarga = document.getElementById("recarga"),
	retiro = document.getElementById("retiro"),
	pago = document.getElementById("pago"),
	consulta = document.getElementById("consulta"),
	deposito = document.getElementById("deposito"),
	otro = document.getElementById("otro");

//URL DE LAS IMAGENES DE BILLETES
var doscientos = {},
	cien = {},
	cincuenta ={},
	veinte = {},
	diez = {};

doscientos.imagen = new Image;
doscientos.imagen.src = "images/doscientos.jpg";

cien.imagen = new Image;
cien.imagen.src = "images/cien.jpg";

cincuenta.imagen = new Image;
cincuenta.imagen.src = "images/cincuenta.jpg";

veinte.imagen = new Image;
veinte.imagen.src = "images/veinte.jpg";

diez.imagen = new Image;
diez.imagen.src = "images/diez.jpg";

//ARRAY QUE ALMACENA LAS URL DE LAS IMAGENES ----> no se esta usando
var imagBillete = [];
imagBillete["200"] = "images/doscientos.jpg";
imagBillete["100"] = "images/cien.jpg";
imagBillete["50"] = "images/cincuenta.jpg";
imagBillete["20"] = "images/veinte.jpg";
imagBillete["10"] = "images/diez.jpg";

//DINERO QUE TIENE EL CAJERO
var atm = [];
atm.push(new billete(200,4));
atm.push(new billete(100,5));
atm.push(new billete(50,2));
atm.push(new billete(20,1));
atm.push(new billete(10,1));

var dineroCaja = 0;

for(var dc of atm)
{
	dineroCaja += dc.valor * dc.cantidad;
}

//AGREGA UN ESCUCHADOR DE EVENTOS A CADA BOTON DEL TECLADO NUMERICO
botonNumero.forEach(function(boton){
	boton.addEventListener("click",function(){
		escribirNumero(boton.innerText);//si se quiere poner la funcion ahi mismo --> soles.value = soles.value + boton.value;
	});
});

//ELEMENTOS UTILIZADOS PARA LA IMPRESION DEL RECIBO
var salidaRecibo = document.getElementById("salidaRecibo"),
	papelRecibo = document.createElement("div");
var movActual = document.createElement("p"),
	movAnterior = document.createElement("p");
var tituloAnterior = document.createElement("h3"),
	tituloActual = document.createElement("h3");

papelRecibo.setAttribute("class","papelRecibo");
movActual.setAttribute("class","letraRecibo");
movAnterior.setAttribute("class","letraRecibo");
tituloAnterior.innerHTML = "Ultimo movimiento";
tituloActual.innerHTML = "Movimiento Actual";	
	
//EVENTO INICIAL
retiro.addEventListener("click",abrirRetiro);