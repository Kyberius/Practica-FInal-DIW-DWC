/************Definimos la vista del modelo de la calculadora**************************************************/ 
//View 
var calculatorView = (function () { 
	function _2digits(value) { 
		return value<10?"0"+value:value;
	}; 
	/**definimos los metodos a ejecutar para actualizar la vista***//// 
	function calculatePace(time) { 
		var pace_hours=document.getElementById('paceHours').value=time.hours;
		var pace_minutes=document.getElementById('paceMinutes').value=_2digits(time.minutes); 
		var pace_seconds=document.getElementById('paceSeconds').value=_2digits(time.seconds);
	}

	function calculateMark(time) { 
		var mark_hours=document.getElementById('markHours').value=time.hours;
		var mark_minutes=document.getElementById('markMinutes').value=_2digits(time.minutes); 
		var mark_seconds=document.getElementById('markSeconds').value=_2digits(time.seconds);
	}

	function calculateTable(arr) {
		var divTable = document.getElementById('markTable');
		divTable.innerHTML = "";
		var table = document.createElement("table");
		table.setAttribute("border","1");
		var cabecera = document.createElement("tr");
		cabecera.setAttribute("style","font-weight: bold; text-align: center;");
		var tdDistancia = document.createElement("td");
		tdDistancia.innerHTML = "Distancia";
		var tdMarca = document.createElement("td");
		tdMarca.innerHTML = "Marca";
		cabecera.appendChild(tdDistancia);
		cabecera.appendChild(tdMarca);
		table.appendChild(cabecera);

		arr.forEach(function(fila) {
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.setAttribute("style","text-align: right;");
			if (typeof(fila.distance) == "number") {
				td1.innerHTML = fila.distance;
			} else {
				td1.innerHTML = fila.distance.miles + " millas  " + fila.distance.yards + " yardas  " + fila.distance.feet + " pies";
			}
			var td2 = document.createElement("td");
			td2.setAttribute("style","text-align: right;");
			td2.innerHTML = fila.mark.hours + " h  " + _2digits(fila.mark.minutes) + " m  " + _2digits(fila.mark.seconds) + " s";
			tr.appendChild(td1);
			tr.appendChild(td2);
			table.appendChild(tr);
		})
		divTable.appendChild(table);
	}



	return { 
		init: function () { 
			events.subscribe('paceKm', calculatePace); 
			events.subscribe('paceMile', calculatePace); 
			events.subscribe('markKm', calculateMark); 
			events.subscribe('markMile', calculateMark); 
			events.subscribe('markTableMile', calculateTable); 
			events.subscribe('markTableKm', calculateTable); 
		} 
	} 
}()); 
/*** añadimos eventos de click**********/ 
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

/*** sincronizacion de unidades**********/ 
function syncUnits(source,destinations){
	for (var i = 0; i < destinations.length; i++) {
		if (destinations[i] !== source)
			destinations[i].selectedIndex = source.selectedIndex;
	};
}

var selectsUnidad = document.querySelectorAll('select.selectUnit');

for (var i = 0; i < selectsUnidad.length; i++) {
	selectsUnidad[i].addEventListener("change", function() {
		syncUnits(this,selectsUnidad);
	});
};



calculatorView.init();