<?php
require('functions.php');
if(isset($_POST['submit'])){
	require('clases/cliente.class.php');
	$objCliente=new Cliente;
	
	$cliente_id = htmlspecialchars(trim($_POST['cliente_id']));
	$nombres = htmlspecialchars(trim($_POST['nombres']));
	$ciudad = htmlspecialchars(trim($_POST['ciudad']));
	$sexo = htmlspecialchars(trim($_POST['alternativas']));
	$telefono = htmlspecialchars(trim($_POST['telefono']));
	$fecha_nacimiento = htmlspecialchars(trim($_POST['fecha_nacimiento']));
	
	if ( $objCliente->actualizar(array($nombres,$ciudad,$sexo,$telefono,$fecha_nacimiento),$cliente_id) == true){
		echo 'Datos guardados';
	}else{
		echo 'Se produjo un error. Intente nuevamente';
	} 
}else{
	if(isset($_GET['id'])){
		
		require('clases/cliente.class.php');
		$objCliente=new Cliente;
		$consulta = $objCliente->mostrar_cliente($_GET['id']);
		$cliente = mysql_fetch_array($consulta);
	?>
	<form id="frmClienteActualizar" name="frmClienteActualizar" method="post" action="actualizar.php" onsubmit="ActualizarDatos(); return false">
    	<input type="hidden" name="cliente_id" id="cliente_id" value="<?php echo $cliente['id']?>" />
        <p>
	  <label>Nombres<br />
	  <input class="text" type="text" name="nombres" id="nombres" value="<?php echo $cliente['nombres']?>" />
	  </label>
      </p>
	  <p>
		<label>Ciudad<br />
		<input class="text" type="text" name="ciudad" id="ciudad" value="<?php echo $cliente['ciudad']?>" />
		</label>
	  </p>
	  <p>
		<label>
		<input type="radio" name="alternativas" id="masculino" value="M" <?php if($cliente['sexo']=="M") echo "checked=\"checked\""?> />
		Masculino</label>
		<label>
		<input type="radio" name="alternativas" id="femenino" value="F" <?php if($cliente['sexo']=="F") echo "checked=\"checked\""?> />
		Femenino</label>
	  </p>
	  <p>
		<label>Telefono<br />
		<input class="text" type="text" name="telefono" id="telefono" value="<?php echo $cliente['telefono']?>" />
		</label>
	  </p>
	  <p>
        <label>Fecha Nacimiento <a onclick="show_calendar()" style="cursor: pointer;"><small>(calendario)</small></a><br />
        <input readonly="readonly" class="text" type="text" name="fecha_nacimiento" id="fecha_nacimiento" value="<?php echo $cliente['fecha_nacimiento'] ?>" />
        <div id="calendario" style="display:none;"><?php calendar_html() ?></div>
        </label>
	  </p>
	  <p>
		<input type="submit" name="submit" id="button" value="Enviar" />
		<label></label>
		<input type="button" name="cancelar" id="cancelar" value="Cancelar" onclick="Cancelar()" />
	  </p>
	</form>
	<?php
	}
}
?>