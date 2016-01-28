<?php

spl_autoload_register(function($class) {

    $classes = array();

    $classes[] = 'dao\\empresaDatabase\\ClienteTable';
    $classes[] = 'dao\\empresaDatabase\\ClienteTableFunctions';
    $classes[] = 'dao\\empresaDatabase\\ClienteDaoObject';
    $classes[] = 'dao\\empresaDatabase\\ClienteDaoFactory';

    if(in_array($class, $classes)) {
        require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . substr($class, 20) . '.php';
    }

});
