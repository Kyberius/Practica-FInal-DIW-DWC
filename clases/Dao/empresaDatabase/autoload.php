<?php

spl_autoload_register(function($class) {

    $classes = array();
    $classes[] = '\\Dao\\empresaDatabase\\ClienteTable';
    $classes[] = '\\Dao\\empresaDatabase\\ClienteTableFunctions';
    $classes[] = '\\Dao\\empresaDatabase\\ClienteDaoObject';
    $classes[] = '\\Dao\\empresaDatabase\\ClienteDaoFactory';
    
    if(in_array($class, $classes)) {
        require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . substr($class, 21) . '.php';
    }
});
