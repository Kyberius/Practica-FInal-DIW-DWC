/************Definimos la vista del modelo de la calculadora**************************************************/ 

//Esto ya funciona con handlebars desde consola:
$('#tabla').html(Handlebars.compile($("#table-template").html())({clientesArray:[{"id":1,"nombres":"ANA BELDA ALBERO","ciudad":"FONTANARS DELS ALFORINS","sexo":"M","telefono":"619087609","fechaNacimiento":"2016-02-10 00:00:00"}]}))

//View 
var View = (function () { 
	var HBsource;
	var HBtemplate;
	var HBdata;

	/**definimos los metodos a ejecutar para actualizar la vista***//// 
	//subscribers 
	/*
	function calculatePace(time) { 
		var pace_hours=document.getElementById('paceHours').value=time.hours;
		var pace_minutes=document.getElementById('paceMinutes').value=_2digits(time.minutes); 
		var pace_seconds=document.getElementById('paceSeconds').value=_2digits(time.seconds);
	}
*/
	return { 
		init: function () { 
			//ClientesCollection.readAll();

			//forma larga
			/*
			HBsource = $("#table-template").html(); 
			HBtemplate = Handlebars.compile(HBsource); 
			HBdata = {clientesArray: ClientesCollection.getAll()}

			$('#tabla').html(HBtemplate(HBdata));
			*/


			//forma corta
			//con model => HBdata = {clientesArray: ClientesCollection.getAll()};
			//var datos
			//$.post("CRUD.php",function(response) {
			//	datos = response
			//},"JSON");

			//HBdata = {clientesArray: []};

			//$.each(datos, function (index, value) {
			//	HBdata.clientesArray.push(value);
			//});

			//$('#tabla').html(Handlebars.compile($("#table-template").html())(HBdata));

			//events.subscribe('paceKm', calculatePace); 
		} 
	} 
}()); 

/*** añadimos eventos de click**
document.getElementById('paceCalc').addEventListener("click",function(){ 
	var m_hours=document.getElementById('markHours').value*1; 
	var m_minutes=document.getElementById('markMinutes').value*1; 
	var m_seconds=document.getElementById('markSeconds').value*1;
	var timeInSeconds=calculator.timeToSeconds({hours:m_hours,minutes:m_minutes,seconds:m_seconds});
	var distance=parseFloat(document.getElementById('distanceInput').value.replace(",","."));
	var distanceUnit = document.getElementById('distanceUnit').value;

	if (distanceUnit == "metric") {
		calculator.paceInKm(timeInSeconds,distance); 
	} else if (distanceUnit == "imperial") {
		calculator.paceInMiles(timeInSeconds,distance); 
	}
}); 

document.getElementById('markCalc').addEventListener("click",function(){ 
	var p_hours=document.getElementById('paceHours').value*1; 
	var p_minutes=document.getElementById('paceMinutes').value*1; 
	var p_seconds=document.getElementById('paceSeconds').value*1;
	var pace={hours:p_hours,minutes:p_minutes,seconds:p_seconds};
	var distance=parseFloat(document.getElementById('distanceInput').value.replace(",","."));
	var distanceUnit = document.getElementById('distanceUnit').value;

	if (distanceUnit == "metric") {
		calculator.markFromPacePerKm(pace,calculator.kmToMeters(distance)); 
	} else if (distanceUnit == "imperial") {
		calculator.markFromPacePerMile(pace,calculator.milesToImperial(distance)); 
	}
}); 

document.getElementById('markTableCalc').addEventListener("click",function(){ 
	var p_hours=document.getElementById('paceHours').value*1; 
	var p_minutes=document.getElementById('paceMinutes').value*1; 
	var p_seconds=document.getElementById('paceSeconds').value*1;
	var pace={hours:p_hours,minutes:p_minutes,seconds:p_seconds};
	var distance=parseFloat(document.getElementById('distanceInput').value.replace(",","."));
	var distanceUnit = document.getElementById('distanceUnit').value;
	var cutDistance = parseFloat(document.getElementById('stepInput').value.replace(",","."));

	if (distanceUnit == "metric") {
		calculator.tableTimeFromPacePerKm(pace,calculator.kmToMeters(distance),cutDistance); 
	} else if (distanceUnit == "imperial") {
		calculator.tableTimeFromPacePerMile(pace,distance,cutDistance); 
	}
}); 


********/ 

View.init();