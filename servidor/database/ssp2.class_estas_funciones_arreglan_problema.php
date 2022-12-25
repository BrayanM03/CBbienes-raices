<?php
/* 
static function sql_connect ( $sql_details )
{
    try {
        $db = @new PDO(
            "mysql:host={$sql_details['host']};dbname={$sql_details['db']}",
            $sql_details['user'],
            $sql_details['pass'],
            array( PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION )
        );
        $db->exec("SET NAMES 'utf8'");
        $db->exec("SET CHARACTER SET 'utf8'");
        $db->exec("SET character_set_connection = 'utf8'");
    }
    catch (PDOException $e) {
        self::fatal(
            "An error occurred while connecting to the database. ".
            "The error reported by the server was: ".$e->getMessage()
        );
    }
 
    return $db;


    //ESTAS FUNCIONES ARREGLAN PROBLEM CON ACENTOS
}
  */
 
 
 
static function filter ( $request, $columns, &$bindings )
{
    $globalSearch = array();
    $columnSearch = array();
    $dtColumns = self::pluck( $columns, 'dt' );
 
    if ( isset($request['search']) && $request['search']['value'] != '' ) {
        $str = $request['search']['value'];
        $regexp = $request['search']['regex'];
 
        for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
            $requestColumn = $request['columns'][$i];
            $columnIdx = array_search( $requestColumn['data'], $dtColumns );
            $column = $columns[ $columnIdx ];
 
            if ( $requestColumn['searchable'] == 'true' ) {
                if(!empty($column['db'])){
                    if($regexp){
                        $binding = self::bind( $bindings, $str, PDO::PARAM_STR );
                        $globalSearch[] = "`".$column['db']."` REGEXP ".$binding;
                    }
                    else {
                        $binding = self::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
                        $globalSearch[] = "`".$column['db']."` LIKE ".$binding;
                    }
                }
            }
        }
    }
 
    // Individual column filtering
    if ( isset( $request['columns'] ) ) {
        for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
            $requestColumn = $request['columns'][$i];
            $regexp = $requestColumn['search']['regex'];
            $columnIdx = array_search( $requestColumn['data'], $dtColumns );
            $column = $columns[ $columnIdx ];
 
            $str = $requestColumn['search']['value'];
 
            if ( $requestColumn['searchable'] == 'true' &&
             $str != '' ) {
                if(!empty($column['db'])){
 
                    if($regexp){
                        $binding = self::bind( $bindings, $str, PDO::PARAM_STR );
                        $columnSearch[] = "`".$column['db']."` REGEXP ".$binding;
                    }
                    else {
                        $binding = self::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
                        $columnSearch[] = "`".$column['db']."` LIKE ".$binding;
                    }
                }
            }
        }
    }
 
    // Combine the filters into a single string
    $where = '';
 
    if ( count( $globalSearch ) ) {
        $where = '('.implode(' OR ', $globalSearch).')';
    }
 
    if ( count( $columnSearch ) ) {
        $where = $where === '' ?
            implode(' AND ', $columnSearch) :
            $where .' AND '. implode(' AND ', $columnSearch);
    }
 
    if ( $where !== '' ) {
        $where = 'WHERE '.$where;
    }
 
    return $where;
}

?>