<?php
//heroesOnline.php file

//CONNECTO TO DB
include_once('config.php');

//PREPARED STATEMENTS

//SELECT QUERY
$querySelect="select id,name from heroes";
$STMNT_SELECT=$db_connection->prepare($querySelect);
$STMNT_SELECTBYID=$db_connection->prepare("SELECT id,name from heroes WHERE id=?");

//INSERT QUERY
$STMNT_INSERT = $db_connection->prepare("INSERT INTO heroes (Name) VALUES (?)");

//UPDATE QUERY
$STMNT_UPDATE=$db_connection->prepare("UPDATE heroes SET Name=? WHERE id=?");

//DELETE QUERY
$STMNT_DELETE=$db_connection->prepare("DELETE FROM heroes WHERE id=?");

//CHECK VERB  'REQUEST TYPE'
$verb=$_SERVER['REQUEST_METHOD'];

//ARRAY TO RETURN THE RESULT SET INTO
$result_set=array();

//CHECK verb type
if ($verb=='GET'){

    //Check if ID has been passed to the page
    if (isset($_GET['id']))
    {

        //Check if it is queryable        
        $STMNT_SELECTBYID->bind_param("i",$_GET['id']);

        if ($STMNT_SELECTBYID->execute()){
            
            $STMNT_SELECTBYID->bind_result($id,$name);

            //CONVERT RESULT COMING FORM PREPARED STATEMENT INTO 'mysqli_result'
            //TO BE ABLE TO USE THE METHOD 'fetch_assoc' 

            $result= $STMNT_SELECTBYID->get_result();          

            $row=$result->fetch_assoc();

            echo json_encode($row);
            

        } else {

            echo 'ERROR RETURNING DATA WITH THIS ID';
        }

    } else{

        //if $STMNT has data
        if ($STMNT_SELECT){

            $STMNT_SELECT->execute();
            $STMNT_SELECT->bind_result($id,$name);       
            
            //CONVERT RESULT COMING FORM PREPARED STATEMENT INTO 'mysqli_result'
            //TO BE ABLE TO USE THE METHOD 'fetch_assoc' 

            $result= $STMNT_SELECT->get_result();

            while ($row=$result->fetch_assoc()){

                //printf ("%d %s <br>", $row["id"], $row["name"]);
                //ADD EACH ROW TO THE ARRAY
                $result_set[]=$row;            
            }

            //RETURN JOSN OBJECT OF THE WHOLE ARRAY
            echo json_encode($result_set);       
            
            
        } //IF

    }
    
    $STMNT_SELECTBYID->close();
    $STMNT_SELECT->close();


} elseif ($verb=='POST'){

    echo 'POST method was called';
    $STMNT_INSERT->bind_param("s",$_POST['name']);

    if ($STMNT_INSERT->execute()){

        echo 'INSERTED';
    } else {  echo 'INSERT_ERROR'; }

        $STMNT_INSERT->close();

} elseif ($verb=='DELETE'){

    echo 'DELETE method was called';
    parse_str(file_get_contents('php://input'),$_DELETE);
    $STMNT_DELETE->bind_param("i",$_DELETE['id']);

    if ($STMNT_DELETE->execute() ){

        echo 'DELETED' . $_DELETE['id'];
    } else {  echo 'DELETE_ERROR';  }

    $STMNT_DELETE->close();

} elseif ($verb=='PUT'){

    echo 'PUT method was called';
    parse_str(file_get_contents('php://input'),$_PUT);
    $STMNT_UPDATE->bind_param("si",$_PUT['name'],$_PUT['id']);

    if ($STMNT_UPDATE->execute()){

        echo 'UPDATED';
    } else {  echo 'UPDATE_ERROR'; }
    
    $STMNT_UPDATE->close();
}

//close connection
$db_connection->close();

?>