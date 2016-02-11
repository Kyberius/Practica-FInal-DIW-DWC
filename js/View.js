var View = (function () { 
	//Jquery center functtion
	$.fn.center = function() {
		this.css("position","absolute").css("z-index","5000")
		.css("top","50%").css("left","50%")
		.css("margin",(-(this.height()/2))+"px 0 0 "+(-(this.width()/2))+"px"); 
		return this;
	};

	//Page ojects variables
	var divTable;
	var divForm;
	var alert;


	//HandleBars variables
	var HBtableSource;
	var HBtableTemplate;
	var HBtableData;
	var HBrowSource;
	var HBrowTemplate;

	
	//HandleBars templates functions
	function HBTableCreator(clientsArray) {
		HBtableSource = (typeof HBtableSource === "undefined")?$("#table-template").html():HBtableSource; 
		HBtableTemplate = (typeof HBtableTemplate === "undefined")?Handlebars.compile(HBtableSource):HBtableTemplate; 
		HBtableData = {clientsArray: clientsArray};
		if (typeof HBrowSource === "undefined") {
			HBrowSource = $("#row-template").html();
			Handlebars.registerPartial("rowtemplate", HBrowSource);
		}
		return HBtableTemplate(HBtableData);
	}

	function HBRowCreator(cJson) {
		HBrowTemplate = (typeof HBrowTemplate === "undefined")?Handlebars.compile(HBrowSource):HBrowTemplate; 
		return HBrowTemplate(cJson);
	}


	//set elements pointers functions
	function setParentsPointers() {
		divTable = $("div#tabla");
		divForm = $("div#formulario");
		alert = $("div[id$=alert]");
	}

	function setChildrenPointers() {
		//divTable children
		divTable.tBody = divTable.find("table>tbody");

		divTable.selectPageSize = divTable.find("nav select[name=pageSize]");
		divTable.ulPag = divTable.find("nav ul.pagination");
		divTable.ulPag.firstUl = divTable.ulPag.find("li:first-child");
		divTable.ulPag.lastUl = divTable.ulPag.find("li:last-child");
		divTable.ulPag.activeUl = divTable.ulPag.find("li.active");
		//alerts pointers
		alert.added = alert.eq(0);
		alert.edited = alert.eq(1);
		alert.deleted = alert.eq(2);

		//divForm children
		divForm.inputNombre = divForm.find("input[name=nombres]");
		divForm.inputCiudad = divForm.find("input[name=ciudad]");
		var radios = divForm.find("input[type=radio]");
		divForm.radioSexoM = radios.eq(0);
		divForm.radioSexoF = radios.eq(1);
		divForm.inputTelefono = divForm.find("input[name=telefono]");
		divForm.inputFechaNacimiento = divForm.find("input[name=fechaNacimiento]");
		divForm.inputImage = divForm.find("input[name=imagen]");
		ClienteModel.setImageReference(divForm.inputImage);
		divForm.buttonReset = divForm.find("button[name=reset]"); 
		divForm.buttonSubmit = divForm.find("button[name=submit]"); 
		divForm.buttonBack = divForm.find("button[name=back]");
	}


	//form functions
	function fillForm(){
		var value = ClienteModel.getNombre() || "";
		divForm.inputNombre.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputNombre);		
		value = ClienteModel.getCiudad() || "";
		divForm.inputCiudad.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputCiudad);
		var sexo = ClienteModel.getSexo() || "";
		if (sexo == "M") {
			divForm.radioSexoM.attr('checked', 'checked');
			divForm.radioSexoF.prop('checked', false);
		}
		else if (sexo == "F") {
			divForm.radioSexoF.attr('checked', 'checked');
			divForm.radioSexoM.prop('checked', false);
		}
		value = ClienteModel.getTelefono() || "";
		divForm.inputTelefono.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputTelefono);
		value = ClienteModel.getFechaNacimiento() || "";
		divForm.inputFechaNacimiento.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputFechaNacimiento);
		divForm.inputImage.val("");
		divForm.buttonSubmit.prop('disabled',false);
		function emptyFormValidate(elem) {
			elem.parent().parent().removeClass('has-error has-success')
		}
	}

	function submitForm(event) {
		if (confirm("Guardar Cambios?")) {
			ClienteModel.save();
		}
	}

	function resetForm(event) {
		if (confirm("Borrar Cambios?")) {
			ClienteModel.reload();
			divForm.inputNombre.val(function() { return $(this).prop('defaultValue')});
			divForm.inputCiudad.val(function() { return $(this).prop('defaultValue')});
			if (divForm.radioSexoM.attr('checked') == "checked")
				divForm.radioSexoM.prop("checked",true);
			else if (divForm.radioSexoF.attr('checked') == "checked")
				divForm.radioSexoF.prop("checked",true);
			divForm.inputTelefono.val(function() { return $(this).prop('defaultValue')});
			divForm.inputFechaNacimiento.val(function() { return $(this).prop('defaultValue')});
		}
	}


	//Show/hide functions
	function showForm() {
		divTable.slideUp(200, function(){divForm.slideDown(200)});
	}

	function showTable() {
		divForm.slideUp(200, function(){divTable.slideDown(200)});
	}


	//Add event listeners functions
	function addTableEventListeners() {
		divTable.find(">#new").click(newClick);
		divTable.tBody.find("tr .tdDelete").click(deleteClick);
		divTable.tBody.find("tr .tdEdit").click(editClick);
		divTable.selectPageSize.change(pageSizeChange);
	}

	function addRowEventListeners(id) {
		divTable.tBody.find("tr#" + id + " .tdDelete").click(deleteClick);
		divTable.tBody.find("tr#" + id + " .tdEdit").click(editClick);
	}

	function addFormEventListeners() {
		divForm.inputNombre.bind("keyup change",function(event) {
			validate($(this),/^[a-zñ]+( [a-zñ]+)*$/gi);
			ClienteModel.setNombre($(this).val());
		});
		divForm.inputCiudad.bind("keyup change",function(event) {
			validate($(this),/^[a-zñ]+( [a-zñ]+)*$/gi);
			ClienteModel.setCiudad($(this).val());
		});
		divForm.radioSexoM.change(function() {
			if ($(this).prop("checked")) 
				ClienteModel.setSexo("M");
		});
		divForm.radioSexoF.change(function() {
			if ($(this).prop("checked")) 
				ClienteModel.setSexo("F");
		});
		divForm.inputTelefono.bind("keyup change",function(event) {
			validate($(this),/^[+[0-9]{1,2}-?[0-9]{1,3}\s?]?[0-9]*$/);
			ClienteModel.setTelefono($(this).val());
		});
		divForm.inputFechaNacimiento.change(function(event) {
			validate($(this),/\d{4}\-\d{2}-\d{2}/);
			ClienteModel.setFechaNacimiento($(this).val());
		});
		divForm.inputFechaNacimiento.datepicker({
			changeMonth: true,
      		changeYear: true,
      		dateFormat:"yy-mm-dd",
      		yearRange: "1900:c",
      		firstDay: 1,
      		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
      		monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec" ]
		});
		divForm.buttonSubmit.click(submitForm);
		divForm.buttonReset.click(resetForm);
		divForm.buttonBack.click(showTable)
	}

	function validate(element,pattern) {
		pattern.test(element.val())?successCotent():errorContent();
		function errorContent() {
			element.parent().parent().removeClass('has-success');
			element.parent().parent().addClass('has-error');
			divForm.buttonSubmit.prop('disabled',true);
		}
		function successCotent() {
			element.parent().parent().removeClass('has-error');
			element.parent().parent().addClass('has-success');
			divForm.buttonSubmit.prop('disabled',false);
		}
	}

	


	//table events handle functions
	function newClick(event) {
		ClienteModel.new();
		fillForm();
		showForm();
	};

	function deleteClick(event) {
		if (confirm("Eliminar Cliente?"))
			ClienteModel.remove($(this).parent().attr("id"));
	};

	function editClick(event) {
		ClienteModel.edit($(this).parent().attr("id"));
		fillForm();
		showForm();
	}

	function pageSizeChange(event) {
		console.log("pagesize changed=> " + $(this).val());
		var pageSize = $(this).val();
		var pageNumber = divTable.ulPag.activeUl.children().first().html();
		appendTable(HBTableCreator(ClientesCollection.getPage(pageSize,1)));
		
		setChildrenPointers();

		// add event listeners
		addTableEventListeners();
	}

	//subscribers for model publishers
	function rowInsert(_,clienteJSON) { 
		divTable.tBody.append(HBRowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
		showTable();
		showAlert(alert.added);
	}	

	function rowUpdate(_,clienteJSON) { 
		divTable.tBody.find('#' + clienteJSON.id).replaceWith(HBRowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
		showTable();
		showAlert(alert.edited);
	}

	function rowRemove(_,id) { 
		divTable.tBody.find('#' + id).remove();
		showTable();
		showAlert(alert.deleted);
	}

	//alert model changes
	function showAlert(alert) {
		alert.fadeIn(600).center().delay(1500).fadeOut(300);
	}

	//table appender
	function appendTable(table) {
		divTable.html(table);
		setChildrenPointers();
		addTableEventListeners();
	}

	//initialization method
	function init(_) { 
		setParentsPointers();

		//create, set pointers and event listeners and append the table
		appendTable(HBTableCreator(ClientesCollection.getAll()));
		
		addFormEventListeners();

		//subscribe to Model publish events
		$.subscribe("insertado",rowInsert);
		$.subscribe("actualizado",rowUpdate);
		$.subscribe("borrado",rowRemove);

	}

	//	INITIALIZATION SUBSCRIBER
	$.subscribe("modeloCargado",init);	
}()); 