<?php
session_start();
require_once "connect_database.php";

define("LOGIN_CHECK_QUERY", "select login from users where login=:login or email=:email");
define("REGISTER_QUERY", "insert into users(login,email,password) values(:login,:email,:password)");

$response = "";



// GET EVENTS
if (isset($_GET["getEvents"]) && isset($_GET["trainer"]) && isset($_GET["style"])) {
    try {
        $result = $db->prepare("select trainer.login as 'trainer', dance_style.id as 'id', time_table.id as 'eventId', dance_style.name as 'dance', time_table.date_and_time as 'date' from time_table, trainer, dance_style where time_table.trainer_id=trainer.id and time_table.dance_style=dance_style.id and time_table.trainer_id=:trainer and time_table.dance_style=:style");
        $result->bindParam(":trainer", $_GET["trainer"]);
        $result->bindParam(":style", $_GET["style"]);
        $result->execute();
        echo json_encode($result->fetchAll());
        // echo $result->fetchAll();
    } catch (PDOException $e) {
        $response = "error -> " + $e;
    }
    echo $response;
}

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
if (isset($_POST["addEvent"])) {
    $styleId = $_POST['styleId'];
    $trainerId = $_POST['trainerId'];
    $date = $_POST['date'];
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

// UPDATE EVENTS
if (isset($_POST["updateEvent"])) {
    $id = $_POST['id'];
    $styleId = $_POST['styleId'];
    $trainerId = $_POST['trainerId'];
    $date = $_POST['date'];
    try {
        $result = $db->prepare("update time_table set trainer_id = :trainerId, dance_style = :styleId, date_and_time = :date where id=:id");
        $result->bindParam(":id", $id);
        $result->bindParam(":styleId", $styleId);
        $result->bindParam(":trainerId", $trainerId);
        $result->bindParam(":date", $date);
        $response = $result->execute();
    } catch (PDOException $e) {
        $response = 0;
    }
    echo $response;
}

// DELETE EVENTS
if (isset($_POST["deleteEvent"])) {
    $id = $_POST['deleteEvent'];
    try {
        $result = $db->prepare("delete from time_table where id=:id");
        $result->bindParam(":id", $id);
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
        $result = $db->prepare("select * from participation, time_table where login=:login and participation.time_table_id = time_table.id;");
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
            $result->bindValue(':danceId', $dance_id); //?! EVENT ID
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
if (isset($_POST["addTrainer"])) {


    try {
        //USER

        $login = $_POST["login"];
        $email = $_POST["email"];
        $result = $db->prepare(LOGIN_CHECK_QUERY);
        $result->bindParam(":login", $login);
        $result->bindParam(":email", $email);
        $result->execute();
        if ($result->rowCount()) {
            echo -2;
        } else {
            $password = "Default#1"; //temporary password!
            $password = password_hash($password, PASSWORD_BCRYPT);
            $result = $db->prepare(REGISTER_QUERY);
            $result->bindParam(":login", $login);
            $result->bindParam(":email", $email);
            $result->bindParam(":password", $password);
            if ($result->execute()) {
                //TRAINER
                $fname = $_POST['fname'];
                $lname = $_POST['lname'];
                $phone = $_POST['phone'];
                $desc = $_POST['desc'];
                $fb = $_POST['fb'];
                $insta = $_POST['insta'];
                $yt = $_POST['yt'];
                $twitter = $_POST['twitter'];
                $photo = $_POST['photo'];

                try {
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
            } else {
                echo -1;
            }
        }
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

// DELETE TRAINER
if (isset($_POST["deleteTrainer"])) {
    $response = "";
    $id = $_POST["deleteTrainer"];
    try {
        $result = $db->prepare("delete from time_table where trainer_id=:id");
        $result->bindParam(":id", $id);
        if ($result->execute()) {
            try {
                $result = $db->prepare("delete from trainer where id=:id");
                $result->bindParam(":id", $id);
                $response = $result->execute();
            } catch (PDOException $e) {
                $response = 0;
            }
        } else {
            echo -2;
        }
    } catch (PDOException $e) {
        $response = 0;
    }

    echo $response;
}

// UPDATE TRAINER
if (isset($_POST["updateTrainer"])) {
    $id = $_POST['id'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $login = $_POST['login'];
    $desc = $_POST['desc'];
    $phone = $_POST['phone'];
    $fb = $_POST['fb'];
    $insta = $_POST['insta'];
    $yt = $_POST['yt'];
    $twitter = $_POST['twitter'];
    $photo = $_POST['photo'];


    try {
        //INSERT TO DB
        if ($photo == "") {
            $result = $db->prepare("update trainer set 
            fname =:fname, lname =:lname, login = :login, description = :desc, phone = :phone, fb = :fb, insta = :insta, yt = :yt, twitter = :twitter where id=:id");
        } else {
            $result = $db->prepare("update trainer set fname =:fname, lname =:lname, login = :login, description = :desc, 
            phone = :phone, fb = :fb, insta = :insta, yt = :yt, twitter = :twitter, photo = :photo where id=:id");
        }
        $result->bindParam(":id", $id);
        $result->bindParam(":fname", $fname);
        $result->bindParam(":lname", $lname);
        $result->bindParam(":login", $login);
        $result->bindParam(":desc", $desc);
        $result->bindParam(":phone", $phone);
        $result->bindParam(":fb", $fb);
        $result->bindParam(":insta", $insta);
        $result->bindParam(":yt", $yt);
        $result->bindParam(":twitter", $twitter);
        if ($photo != "") {
            $result->bindParam(":photo", $photo);
        }
        $response = $result->execute();
    } catch (PDOException $e) {
        echo $e;
        $response = 0;
    }
    echo $response;
}


// SET STYLE
if (isset($_POST["addStyle"])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
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

// DELETE STYLE
if (isset($_POST["deleteStyle"])) {
    $response = "";
    $id = $_POST["deleteStyle"];
    
    try {
        $result = $db->prepare("delete from time_table where dance_style=:id");
        $result->bindParam(":id", $id);
        if ($result->execute()) {
            try {
                $result = $db->prepare("delete from dance_style where id=:id");
                $result->bindParam(":id", $id);
                $response = $result->execute();
            } catch (PDOException $e) {
                $response = 0;
            }
        } else {
            echo -2;
        }
    } catch (PDOException $e) {
        $response = 0;
    }
    echo $response;
}

// UPDATE STYLE
if (isset($_POST["updateStyle"])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    try {
        $result = $db->prepare("update dance_style set name=:name, description=:desc where id=:id");
        $result->bindParam(":name", $name);
        $result->bindParam(":desc", $description);
        $result->bindParam(":id", $id);
        $response = $result->execute();
    } catch (PDOException $e) {
        $response = 0;
    }
    echo $response;
}
