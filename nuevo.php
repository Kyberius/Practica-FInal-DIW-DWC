<?php
require('functions.php');
if(isset($_POST['submit'])){
	require('clases/cliente.class.php');

	$nombres = htmlspecialchars(trim($_POST['nombres']));
	$ciudad = htmlspecialchars(trim($_POST['ciudad']));
	$sexo = htmlspecialchars(trim($_POST['alternativas']));
	$telefono = htmlspecialchars(trim($_POST['telefono']));
	$fecha_nacimiento = htmlspecialchars(trim($_POST['fecha_nacimiento']));
	
	$objCliente=new Cliente;
	if ( $objCliente->insertar(array($nombres,$ciudad,$sexo,$telefono,$fecha_nacimiento)) == true){
		echo 'Datos guardados';
	}else{
		echo 'Se produjo un error. Intente nuevamente';
	} 
}else{
?>
<form id="frmClienteNuevo" name="frmClienteNuevo" method="post" action="nuevo.php" onsubmit="GrabarDatos(); return false">
  <p><label>Nombres<br />
  <input class="text" type="text" name="nombres" id="nombres" />
  </label>
  </p>
  <p>
    <label>Ciudad<br />
    <input class="text" type="text" name="ciudad" id="ciudad" />
    </label>
  </p>
  <p>
    <label>
    <input type="radio" name="alternativas" id="masculino" value="M" />
    Masculino</label>
    <label>
    <input type="radio" name="alternativas" id="femenino" value="F" />
    Femenino</label>
  </p>
  <p>
    <label>Telefono<br />
    <input class="text" type="text" name="telefono" id="telefono" />
    </label>
  </p>
  <p>
    <label>Fecha Nacimiento <a onclick="show_calendar()" style="cursor: pointer;">
<small>(calendario)</small>
</a><br />
    <input readonly="readonly" class="text" type="text" name="fecha_nacimiento" id="fecha_nacimiento" value="<?php echo date("Y-m-j")?>" />
    <div id="calendario" style="display:none;"><?php calendar_html() ?></div>
    </label>
  </p>
  <p>
    <input type="submit" name="submit" id="button" value="Enviar" />
    <label></label>
    <input type="button" class="cancelar" name="cancelar" id="cancelar" value="Cancelar" onclick="Cancelar()" />
  </p>
</form>
<?php
}
?>