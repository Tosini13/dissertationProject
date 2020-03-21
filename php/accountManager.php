<?php
session_start();
require_once "connect_database.php";

//LOGIN
if (isset($_POST["login_submit"])) {
    $login = $_POST["login"];
    $password = $_POST["password"];
    $result = $db->prepare("select login, password from users where login=:login or email=:login");
    $result->bindParam(":login", $login);
    $result->execute();
    if ($result->rowCount()) {
        $user = $result->fetch();
        if (password_verify($password, $user['password'])) {
            //loggedin
            $_SESSION['login'] = $login;
            header("Location: ../index.php");
            die();
            var_dump('loggedin');
        } else {
            //wrong password
            var_dump('wrong password');
            header("Location: ../html/login.html");
            die();
        }
    } else {
        //no login
        var_dump('no login');
        header("Location: ../html/login.html");
        die();
    }
}

//REGISTER
if (isset($_POST["register_submit"])) {
    $login = $_POST["login"];
    $email = $_POST["email"];
    $result = $db->prepare("select login from users where login=:login or email=:email");
    $result->bindParam(":login", $login);
    $result->bindParam(":email", $email);
    $result->execute();
    if ($result->rowCount()) {
        //already exists
        var_dump('already exists');
        header("Location: ../html/register.html?error=exist");
        die();
    } else {
        $password = $_POST["password"];
        $password = password_hash($password, PASSWORD_BCRYPT);
        $rights = 'xxx';
        $result = $db->prepare("insert into users values(:login,:email,:password,:rights)");
        $result->bindParam(":login", $login);
        $result->bindParam(":email", $email);
        $result->bindParam(":password", $password);
        $result->bindParam(":rights", $rights);
        if ($result->execute()) {
            //registererd
            var_dump('registererd');
            header("Location: ../html/login.html");
            die();
        } else {
            //no registererd
            var_dump('no registererd');
            header("Location: ../html/register.html");
            die();
        }
    }
}

//IF LOGGED IN
if (isset($_SESSION['login'])) {
    echo $_SESSION['login'];
}
