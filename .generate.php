<?php
include("Parm/vendor/autoload.php");
\Parm\Config::addConnection('empresa', new Doctrine\DBAL\Connection([
    'dbname' => 'empresa',
    'user' => 'root',
    'password' => '',
    'host' => 'localhost'
], new Doctrine\DBAL\Driver\PDOMySql\Driver(), null, null));
$generator = new Parm\Generator\Generator(Parm\Config::getConnection('empresa'),'./clases/dao/empresaDatabase',"Dao\\empresaDatabase");
$generator->generate();
?>
