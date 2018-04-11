<?php

class Database
{
    private $host;
    private $username;
    private $password;
    private $db;
    private $cs;
    private $conStrg;

    public function __construct()
    {
        $this->host = "localhost";
        $this->username = "root";
        $this->db = "job_db";
        $this->cs = 'utf8';
        $this->password = '';
        $this->connection();

    }

    public function connection()
    {
        try {
            $dsn = "mysql:host=" . $this->host . ";port=3306;dbname=" . $this->db . ";charset=" . $this->cs;

            $opt = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                PDO::ATTR_EMULATE_PREPARES => false,
            );
            $conStrg = new PDO($dsn, $this->username, $this->password, $opt);

            if ($conStrg) {
                $this->conStrg = $conStrg;
            }

        } catch (PDOException $message) {
            echo "<h2>Connection error: </h2>" . $message->getMessage();
        }
    }

    //Inset Saved Jobs
    public function insertSaveJobs($job_title, $company, $location, $date, $url,$salary_info,$starred)
    {
        
        try {
            $stmt = $this->conStrg->prepare("CALL `insert_tblsavejobs`(?,?,?,?,?,?,?)");
            $stmt->bindParam(1, $job_title, PDO::PARAM_STR, 0);
            $stmt->bindParam(2, $company,PDO::PARAM_STR, 0);
            $stmt->bindParam(3, $location, PDO::PARAM_STR, 0);
            $stmt->bindParam(4, $date,PDO::PARAM_STR, 0);
            $stmt->bindParam(5, $url, PDO::PARAM_STR, 0);
            $stmt->bindParam(6, $salary_info, PDO::PARAM_STR, 0);
            $stmt->bindParam(7, $starred, PDO::PARAM_STR, 0);
            $stmt->execute();

        } catch (PDOException $message) {
            echo "<h2>Insert Save Jobs error: </h2>" . $message->getMessage();
        }
    }

    //Retrieve Saved Jobs
    public function retrieveSaveJob()
    {
        try {
            $stmt = $this->conStrg->prepare("CALL `retrieve_savejobs`");
            $stmt->execute();

            while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                $result[] = $row;
            }

            return $result;

        } catch (PDOException $message) {
            echo "<h2>Retrieve Save Jos error: </h2>" . $message->getMessage();
        }

    }
}
