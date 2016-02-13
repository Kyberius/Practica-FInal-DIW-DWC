<?php

spl_autoload_register(function($class) {

    $classes = array();

    $classes[] = 'dao\\empresacrudDatabase\\ClienteTable';
    $classes[] = 'dao\\empresacrudDatabase\\ClienteTableFunctions';
    $classes[] = 'dao\\empresacrudDatabase\\ClienteDaoObject';
    $classes[] = 'dao\\empresacrudDatabase\\ClienteDaoFactory';

    if(in_array($class, $classes)) {
        require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . substr($class, 24) . '.php';
    }

});
