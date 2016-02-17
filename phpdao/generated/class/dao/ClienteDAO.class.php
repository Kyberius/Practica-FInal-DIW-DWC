<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2016-02-17 15:22
 */
interface ClienteDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @Return Cliente 
	 */
	public function load($id);

	/**
	 * Get all records from table
	 */
	public function queryAll();
	
	/**
	 * Get all records from table ordered by field
	 * @Param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn);
	
	/**
 	 * Delete record from table
 	 * @param cliente primary key
 	 */
	public function delete($id);
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Cliente cliente
 	 */
	public function insert($cliente);
	
	/**
 	 * Update record in table
 	 *
 	 * @param Cliente cliente
 	 */
	public function update($cliente);	

	/**
	 * Delete all rows
	 */
	public function clean();

	public function queryByNombres($value);

	public function queryByCiudad($value);

	public function queryBySexo($value);

	public function queryByTelefono($value);

	public function queryByFechaNacimiento($value);


	public function deleteByNombres($value);

	public function deleteByCiudad($value);

	public function deleteBySexo($value);

	public function deleteByTelefono($value);

	public function deleteByFechaNacimiento($value);


}
?>