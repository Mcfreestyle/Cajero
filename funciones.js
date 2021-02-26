
function abrirInicio()
{
	ventanaPrincipal.innerHTML = "";
	h2.innerHTML = "Por favor seleccione su transaccion";

	recarga.value = "Recarga";
	retiro.value = "Retiro";
	pago.value = "Pago";
	consulta.value = "Consulta";
	deposito.value = "Deposito";

	divRecarga.innerHTML = "";
	divRetiro.innerHTML = "";
	divPago.innerHTML = "";
	divConsulta.innerHTML = "";
	divDeposito.innerHTML = "";

	divRecarga.appendChild(recarga);
	ventanaPrincipal.appendChild(divRecarga);

	divRetiro.appendChild(retiro);
	ventanaPrincipal.appendChild(divRetiro);

	divPago.appendChild(pago);
	ventanaPrincipal.appendChild(divPago);

	divConsulta.appendChild(consulta);
	ventanaPrincipal.appendChild(divConsulta);

	divDeposito.appendChild(deposito);
	ventanaPrincipal.appendChild(divDeposito);

	divOtro.appendChild(otro);
	ventanaPrincipal.appendChild(divOtro);
	
	botonBillete.forEach(function(boton){
		var clon = boton.cloneNode(true);
		boton.parentNode.replaceChild(clon,boton);
	});

	botonBillete[1].addEventListener("click",abrirRetiro);
	otro.removeEventListener("click",abrirOtro);

	papel.clearRect(0,0,canvas.width,canvas.height);//limpia todo el canvas
	papelRecibo.innerHTML = "";
}

function abrirRetiro()
{	
	botonBillete[0].value = "S/.10";
	botonBillete[1].value = "S/.20";
	botonBillete[2].value = "S/.50";
	botonBillete[3].value = "S/.100";
	botonBillete[4].value = "S/.200";
	
	botonBillete[1].removeEventListener("click",abrirRetiro);

	botonBillete.forEach(function(boton,indice){//1° parametro ---> elemento del array, 2° parametro ---> indice del elemento
		boton.addEventListener("click",function(){
			console.log(indice);
			calcularDineroRapido(indice);
		});
	});
	otro.addEventListener("click",abrirOtro);
}

function abrirOtro()
{
	var modificar = document.createElement("button"),
		continuar = document.createElement("button");
			
	ventanaInterior.setAttribute("class","ventanaInterior");
	divSoles.setAttribute("class","divSoles");
	simboloSoles.setAttribute("class","simboloSoles");
	soles.setAttribute("class","soles");
	soles.setAttribute("disabled","");//deshabilita el input
	soles.setAttribute("placeholder","0");

	modificar.setAttribute("class","boton1");
	continuar.setAttribute("class","boton2");

	simboloSoles.innerHTML = "S/.";
	modificar.innerHTML = "Modificar";
	continuar.innerHTML = "Continuar";
	h2.innerHTML = "Monto a solicitar";
	ventanaPrincipal.innerHTML = "";
	ventanaInterior.innerHTML = "";
	soles.value = "";

	divSoles.appendChild(simboloSoles);
	divSoles.appendChild(soles);
	ventanaInterior.appendChild(divSoles);
	ventanaInterior.appendChild(modificar);
	ventanaInterior.appendChild(continuar);
	ventanaPrincipal.appendChild(ventanaInterior);

	modificar.addEventListener("click",function(){
		soles.value = "";
	});
	continuar.addEventListener("click",calcularDinero)
}

function escribirNumero(num)
{
	soles.value = soles.value + num;
}

function calcularDineroRapido(indice)
{
	switch(indice)
	{
		case 0:
			dineroSolicitado = 10;
		break;
		case 1:
			dineroSolicitado = 20;
		break;
		case 2:
			dineroSolicitado = 50;
		break;
		case 3:
			dineroSolicitado = 100;
		break;
		case 4:
			dineroSolicitado = 200;
		break;
	}
	if(dineroCaja >= dineroSolicitado)
	{
		retiroRapido = true;
		dineroCaja -= dineroSolicitado;
		atm.forEach(function(elem){
			if(elem.valor == dineroSolicitado)
			{
				elem.cantidad -= 1;
				if(elem.cantidad < 0)
				{
					alert("El cajero no tiene sencillo");
					elem.cantidad += 1;
					dineroCaja += dineroSolicitado;
				}
				else
				{
					abrirContinuar();
				}
			}
		});
	}
	else if(dineroCaja == 0)
	{
		abrirMensajeSaldo();
	}
	else
	{
		alert("El cajero no tiene esa cantidad");
	}
}
function calcularDinero()
{
	var	cantBillete,saldo,//copiaAtm,
		c = [],
		i = 0;
	dineroSolicitado = parseInt(soles.value);
	
	//CALCULO DE LA CANTIDAD DE BILLETES DE CADA VALOR
	
	if(!(dineroSolicitado % 10))
	{
		if(dineroCaja >= dineroSolicitado)
		{
			dineroCaja -= dineroSolicitado;
			saldo = dineroSolicitado;
			//copiaAtm = atm.slice();---> ¿Por q no funcionó?
			for(var b of atm)
			{
				cantBillete = Math.floor(saldo/b.valor);
				if(cantBillete > b.cantidad)
				{
					cantBillete = b.cantidad;
				}
				entregado.push(new billete(b.valor,cantBillete));
				c.push(b.cantidad);
				atm[i].cantidad = b.cantidad - cantBillete;
				i++;
				saldo = saldo - b.valor*cantBillete;
			}
			if(saldo == 0)
			{
				abrirContinuar();
			}
			else
			{
				alert("El cajero no tiene sencillo");
				soles.value = "";
				for(var i = 0; i < atm.length; i++)
				{
					atm[i].cantidad = c[i];
				}
				dineroCaja += dineroSolicitado; 
				//atm = copiaAtm.slice();
			}
		}
		else if(dineroCaja == 0)
		{
			abrirMensajeSaldo();
		}
		else
		{
			alert("El cajero no tiene esa cantidad");
			soles.value = "";
		}
	}
	else
	{
		alert("Solo se permite montos multiplos de 10");
		soles.value = "";
	}
}

function abrirContinuar()
{
	var botonSi = document.createElement("button"),
		botonNo =document.createElement("button");

	ventanaInterior.setAttribute("class","ventanaInterior");
	botonSi.setAttribute("class","boton1");
	botonNo.setAttribute("class","boton2");

	h2.innerHTML = "¿Quiere recibo para esta transacción?";
	ventanaPrincipal.innerHTML = "";
	ventanaInterior.innerHTML = "";
	
	botonSi.innerHTML = "Si";
	botonNo.innerHTML = "No";

	ventanaInterior.appendChild(botonSi);
	ventanaInterior.appendChild(botonNo);
	ventanaPrincipal.appendChild(ventanaInterior);

	botonSi.addEventListener("click",entregarDinero);
	botonSi.addEventListener("click",imprimirRecibo);
	botonNo.addEventListener("click",entregarDinero);	
}

function entregarDinero()
{
	var botonSi = document.createElement("button"),
		botonNo =document.createElement("button");
	
	botonSi.setAttribute("class","boton1");
	botonNo.setAttribute("class","boton2");

	//IMPRESION DE LOS BILLETES SOLICITADOS
	
	if(retiroRapido)
	{
		imprimirDinero(dineroSolicitado,1);
	}
	else
	{
		for(var e of entregado)
		{
			if(e.cantidad > 0)//si la cantidad de billetes es 0 que no imprima
			{
				imprimirDinero(e.valor,e.cantidad);
			}
		}
	}
	retiroRapido = false;
	y = 0;//la coordenada "y" vuelve a 0 una vez impreso los billetes
	entregado = [];
	h2.innerHTML = "Retire su dinero<br>¿Desea realizar otra transacción?";
	ventanaInterior.innerHTML = "";
	botonSi.innerHTML = "Si";
	botonNo.innerHTML = "No";
	
	ventanaInterior.appendChild(botonSi);
	ventanaInterior.appendChild(botonNo);

	botonSi.addEventListener("click",abrirInicio);
	botonNo.addEventListener("click",function(){
		h2.innerHTML = "<br><br>Gracias por utilizar Cajero Michael";
		ventanaInterior.innerHTML = "";
		papel.clearRect(0,0,canvas.width,canvas.height);//limpia todo el canvas
		papelRecibo.innerHTML = "";
	});
}

function imprimirDinero(valor,cantidad)
{
	for(var i=1; i <= cantidad; i++)
	{
		switch(valor)
		{
			case 200:
				papel.drawImage(doscientos.imagen,x,y,145,70);
				y = y + 10;
			break;
			case 100:
				papel.drawImage(cien.imagen,x,y,145,70);
				y = y + 10;
			break;
			case 50:
				papel.drawImage(cincuenta.imagen,x,y,145,70);
				y = y + 10;
			break;
			case 20:
				papel.drawImage(veinte.imagen,x,y,145,70);
				y = y + 10;
			break;
			case 10:
				papel.drawImage(diez.imagen,x,y,145,70);
				y = y + 10;
			break;
		}
	}
	y = y + 70;//variacion para separar los billetes de diferente valor
}

function imprimirRecibo()
{
	movAnterior.innerHTML = movActual.innerHTML;
	movActual.innerHTML = devolverFecha() + "<br>Retiro de S/." + dineroSolicitado;
	papelRecibo.appendChild(tituloAnterior);
	papelRecibo.appendChild(movAnterior);
	papelRecibo.appendChild(tituloActual);
	papelRecibo.appendChild(movActual);
	salidaRecibo.appendChild(papelRecibo);
}

function devolverFecha()
{
	var tiempo = new Date,
		año = tiempo.getFullYear(),
		mes = tiempo.getMonth()+1,
		dia = tiempo.getDate(),
		hora = tiempo.getHours(),
		minuto = tiempo.getMinutes(),
		segundo = tiempo.getSeconds();

	var fecha = "Fecha: " + dia + "/" + mes + "/" + año + "<br>Hora: " + hora + ":" + minuto + ":" + segundo;
	return fecha;
}

function abrirMensajeSaldo()
{
	h2.innerHTML = "<br><br>El cajero no tiene saldo.<br>Gracias por utilizar Cajero Michael";
	ventanaPrincipal.innerHTML = "";
}