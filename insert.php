<?php
namespace Dao\empresaDatabase;
include("clases/Dao/empresaDatabase/autoload.php");
$user = new ClienteDaoObject();
$user->setNombres("luis");
$user->setCiudad("ciudad");
$user->setSexo('M');
$user->setTelefono("1234");
$user->setFechaNacimiento("1996-02-15");
$user->save();
echo $user->getId() // will print the new primary key
 ?>