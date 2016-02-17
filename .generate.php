<?php
include("Parm/vendor/autoload.php");
\Parm\Config::addConnection('empresacrud', new Doctrine\DBAL\Connection([
    'dbname' => 'empresacrud',
    'user' => 'usercrud',
    'password' => 'passwordcrud',
    'host' => 'db4free.net'
], new Doctrine\DBAL\Driver\PDOMySql\Driver(), null, null));
$generator = new Parm\Generator\Generator(Parm\Config::getConnection('empresacrud'),'./clases/dao/empresacrudDatabase',"dao\\empresacrudDatabase");
$generator->generate();
?>
