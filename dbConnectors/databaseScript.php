<?php 
header("Access-Control-Allow-Origin: *");
include_once 'databaseClass.php';

$option = "default";
if (isset($_POST["option"])) {
    $option = $_POST["option"];
}

switch ($option) {
    case "retrieveUser":
        retrieveUser();
        break;
    case "insertSaveJob":
        insertSaveJob();
        break;
    default:
        retrieveSaveJob();
        break;
}


function retrieveSaveJob()
{
    global $db;
    $db = new Database();
    echo json_encode($db->retrieveSaveJob());
}

function insertSaveJob()
{
    global $db;
    $db = new Database();
    if (isset($_POST["job_title"])) {
        $job_title = $_POST["job_title"];
    }
    if (isset($_POST["company"])) {
        $company = $_POST["company"];
    }
    if (isset($_POST["location"])) {
        $location = $_POST["location"];
    }
    if (isset($_POST["url"])) {
        $url = $_POST["url"];
    }

    if (isset($_POST["date"])) {
        $date = date("Y-m-d",strtotime($_POST["date"]));
    }

    if (isset($_POST["salary_info"])) {
        $salary_info = $_POST["salary_info"];
    }
    
    if (isset($_POST["starred"])) {
        $starred = $_POST["starred"];
    }  

    $db->insertSaveJobs($job_title, $company, $location, $date, $url, $salary_info,$starred);
}

?>