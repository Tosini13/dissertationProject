<?php
session_start();
require_once "connect_database.php";


$response = "";



// GET EVENTS
if (isset($_GET["from"]) && isset($_GET["to"])) {
    try {
        $result = $db->prepare("select trainer.login as 'trainer', dance_style.id as 'id', time_table.id as 'eventId', dance_style.name as 'dance', time_table.date_and_time as 'date' from time_table, trainer, dance_style where time_table.trainer_id=trainer.id and time_table.dance_style=dance_style.id and date_and_time > :from and date_and_time < :to");
        $result->bindParam(":from", $_GET["from"]);
        $result->bindParam(":to", $_GET["to"]);
        $result->execute();
        echo json_encode($result->fetchAll());
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}

// SET EVENTS
if (isset($_GET["addEvent"])) {
    $styleId = $_GET['styleId'];
    $trainerId = $_GET['trainerId'];
    $date = $_GET['date'];
    try {
        $result = $db->prepare("insert into time_table(trainer_id, dance_style, date_and_time) values(:trainerId, :styleId, :date)");
        $result->bindParam(":styleId", $styleId);
        $result->bindParam(":trainerId", $trainerId);
        $result->bindParam(":date", $date);
        $response = $result->execute();
    } catch (PDOException $e) {
        $response = 0;
    }
    echo $response;
}

// GET COMMENT
if (isset($_GET["getComments"])) {
    $dance_id = $_GET["getComments"];
    try {
        $result = $db->prepare("select review.comment as 'comment', users.login as 'login' from review, users where review.login=users.login and review.dance_style_id = ?;");
        $result->bindParam(1, $dance_id);
        $result->execute();
        if ($result->rowCount()) {
            echo json_encode($result->fetchAll());
        } else {
            $response = "null";
        }
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}

// SET COMMENT
if (isset($_GET["setComment"]) && isset($_GET["danceId"])) {

    $content = $_GET["setComment"];
    $dance_id = $_GET["danceId"];
    $login = $_SESSION['login'];

    try {
        $result = $db->prepare("insert into review values(:danceId, :login, :content);");
        $result->bindParam(':danceId', $dance_id);
        $result->bindParam(':login', $login);
        $result->bindParam(':content', $content);
        $result->execute();
        $response = true;
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}

// GET PARTICIPANT'S EVENTS
if (isset($_GET["getUserEvents"])) {
    $login = $_SESSION['login'];
    $response = "";
    try {
        $result = $db->prepare("select time_table_id as id from participation where login=:login");
        $result->bindValue(':login', $login);
        $result->execute();
        echo json_encode($result->fetchAll());
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}

// SET PARTICIPANT
if (isset($_GET["setParticipant"])) {
    $response = 'nic';
    if (isset($_SESSION['login'])) {
        $dance_id = $_GET["setParticipant"];
        $login = $_SESSION['login'];
        try {
            $result = $db->prepare("insert into participation values(:danceId, :login);");
            $result->bindParam(':danceId', $dance_id);
            $result->bindParam(':login', $login);
            $result->execute();
            $response = 1;
        } catch (PDOException $e) {
            $response = -1;
        }
    } else {
        $response = 0;
    }
    echo $response;
}

// DELETE PARTICIPANT
if (isset($_GET["removeParticipant"])) {
    $response = 'nic';
    if (isset($_SESSION['login'])) {
        $dance_id = $_GET["removeParticipant"];
        $login = $_SESSION['login'];
        try {
            $result = $db->prepare("delete from participation where login=:login and time_table_id=:danceId");
            $result->bindValue(':danceId', $dance_id);
            $result->bindValue(':login', $login);
            $result->execute();
            $response = 2;
        } catch (PDOException $e) {
            $response = -1;
        }
    } else {
        $response = 0;
    }
    echo $response;
}

// SET TRAINER
if (isset($_GET["addTrainer"])) {
    $fname = $_GET['fname'];
    $lname = $_GET['lname'];
    $login = $_GET['login'];
    $desc = $_GET['desc'];
    $phone = $_GET['phone'];
    $fb = $_GET['fb'];
    $insta = $_GET['insta'];
    $yt = $_GET['yt'];
    $twitter = $_GET['twitter'];
    $photo = $_GET['photo'];


    try {
        //INSERT TO DB
        $result = $db->prepare("insert into trainer(fname, lname, login, description, phone, fb, insta, yt, twitter, photo) values(:fname, :lname, :login, :desc, :phone, :fb, :insta, :yt, :twitter, :photo);");
        $result->bindParam(":fname", $fname);
        $result->bindParam(":lname", $lname);
        $result->bindParam(":login", $login);
        $result->bindParam(":desc", $desc);
        $result->bindParam(":phone", $phone);
        $result->bindParam(":fb", $fb);
        $result->bindParam(":insta", $insta);
        $result->bindParam(":yt", $yt);
        $result->bindParam(":twitter", $twitter);
        $result->bindParam(":photo", $photo);
        $response = $result->execute();
    } catch (PDOException $e) {
        $response = 0;
    }
    echo $response;
}

// GET TRAINERS
if (isset($_GET["getTrainers"])) {
    $response = "";
    try {
        $result = $db->prepare("select * from trainer");
        $result->execute();
        echo json_encode($result->fetchAll());
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}

// SET STYLE
if (isset($_GET["addStyle"])) {
    $name = $_GET['name'];
    $description = $_GET['description'];
    try {
        $result = $db->prepare("insert into dance_style(name, description) values(:name, :desc);");
        $result->bindParam(":name", $name);
        $result->bindParam(":desc", $description);
        $response = $result->execute();
    } catch (PDOException $e) {
        $response = 0;
    }
    echo $response;
}

// GET STYLES
if (isset($_GET["getStyles"])) {
    $response = "";
    try {
        $result = $db->prepare("select * from dance_style");
        $result->execute();
        echo json_encode($result->fetchAll());
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}
