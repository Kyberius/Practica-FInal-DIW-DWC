Date.prototype.language = "ES";
Date.prototype.locale = "es-ES";
Date.prototype.customFormat=function(formatString){ 
   formatString = this.language.toUpperCase() == "ES"?this.customFormatEs(formatString):this.customFormatEn(formatString);
   return formatString;
}
Date.prototype.customFormatEn = function(formatString) {
	var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,dMod,th;
	YY = ((YYYY=this.getFullYear())+"").substr(2,2);
	MM = (M=this.getMonth()+1)<10?('0'+M):M;
	MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substr(0,3);
	DD = (D=this.getDate())<10?('0'+D):D;
	DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substr(0,3);
	hh =(h=(hhh=this.getHours())%12)<10?('0'+h):h;
	mm = (m=this.getMinutes())<10?('0'+m):m;
	ss = (s=this.getSeconds())<10?('0'+s):s;
	ampm =hhh>=12?(hhh!=12?"pm":(m>0 || s>0)?"pm":"am"):"am";
	th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	if (formatString.includes("h#") && !formatString.includes("#hhh#")) {
		if (formatString.includes("s#")) {
			formatString = formatString.replace("s#","s# " +ampm);
		} else if (formatString.includes("m#")){
			formatString = formatString.replace("m#","m# " +ampm);
		} else {
			formatString = formatString.replace("h#","h# " +ampm);
		}
	}
	formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#m#",m).replace("#mm#",mm).replace("#s#",s).replace("#ss#",s);
	return formatString;
}

Date.prototype.customFormatEs = function(formatString) {
	var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,dMod,th;
	YY = ((YYYY=this.getFullYear())+"").substr(2,2);
	MM = (M=this.getMonth()+1)<10?('0'+M):M;
	MMM = (MMMM=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septimbre","Octubre","Noviembre","Diciembre"][M-1]).substr(0,3);
	DD = (D=this.getDate())<10?('0'+D):D;
	DDD = (DDDD=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][this.getDay()]).substr(0,3);
	hh =(h=(hhh=this.getHours())%12)<10?('0'+h):h;
	mm = (m=this.getMinutes())<10?('0'+m):m;
	ss = (s=this.getSeconds())<10?('0'+s):s;
	ampm =hhh>=12?(hhh!=12?"pm":(m>0 || s>0)?"pm":"am"):"am";
	th="º";
	if (formatString.includes("h#") && !formatString.includes("#hhh#")) {
		if (formatString.includes("s#")) {
			formatString = formatString.replace("s#","s# " +ampm);
		} else if (formatString.includes("m#")){
			formatString = formatString.replace("m#","m# " +ampm);
		} else {
			formatString = formatString.replace("h#","h# " +ampm);
		}
	}
	formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#m#",m).replace("#mm#",mm).replace("#s#",s).replace("#ss#",s);
	return formatString;
}

Date.prototype.localeCustomFormat = function(formatString) {
	var options = {};
	with (formatString) {
		options.year = includes("#YYYY#")?"numeric":includes("#YY#")?"2-digit":undefined;
		options.month = includes("#MMMM#")?"long":includes("#MMM#")?"short":includes("#MM#")?"2-digit":includes("#M#")?"numeric":undefined;
		options.weekday = includes("#DDDD#")?"long": includes("#DDD#")?"short":undefined;
		options.day = includes("#DD#")?"2-digit":includes("#D#")?"numeric":undefined;
		options.hour = includes("#h#")?"numeric":includes("#hh#")?"2-digit":includes("#hhh#")?"2-digit":undefined;
		options.hour12 = includes("#hhh#")?false:true;
		options.minute = includes("#mm#")?"2-digit":includes("#m#")?"numeric":undefined;
		options.second = includes("#ss#")?"2-digit":includes("#s#")?"numeric":undefined;
	}
	return this.toLocaleString(this.locale,options);
}
