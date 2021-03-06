<?php
session_start();
require_once "connect_database.php";
define("LOGIN_QUERY", "select login, password, rights from users where login=:login or email=:login");
define("LOGIN_CHECK_QUERY", "select login from users where login=:login or email=:email");
define("REGISTER_QUERY", "insert into users(login,email,password) values(:login,:email,:password)");
define("CHANGE_PASSWORD", "update users set password = :password where login = :login");

//LOGIN
if (isset($_POST["login_submit"])) {
    $login = $_POST["login"];
    $password = $_POST["password"];
    $result = $db->prepare(LOGIN_QUERY);
    $result->bindParam(":login", $login);
    $result->execute();
    if ($result->rowCount()) {
        $user = $result->fetch();
        if (password_verify($password, $user['password'])) {
            //loggedin
            $_SESSION['login'] = $login;
            $_SESSION['rights'] = $user['rights'];
            header("Location: ../index.php");
            die();
            var_dump('loggedin');
        } else {
            //wrong password
            // var_dump('wrong password');
            header("Location: login.php");
            die();
        }
    } else {
        //no login
        // var_dump('no login');
        header("Location: login.php");
        die();
    }
}

//REGISTER
if (isset($_POST["register_submit"])) {
    $login = $_POST["login"];
    $email = $_POST["email"];
    $result = $db->prepare(LOGIN_CHECK_QUERY);
    $result->bindParam(":login", $login);
    $result->bindParam(":email", $email);
    $result->execute();
    if ($result->rowCount()) {
        //already exists
        var_dump('already exists');
        header("Location: ../php/register.php?error=exist");
        die();
    } else {
        $password = $_POST["password"];
        $password = password_hash($password, PASSWORD_BCRYPT);
        $result = $db->prepare(REGISTER_QUERY);
        $result->bindParam(":login", $login);
        $result->bindParam(":email", $email);
        $result->bindParam(":password", $password);
        if ($result->execute()) {
            //registererd
            var_dump('registererd');
            header("Location: ../php/login.php");
            die();
        } else {
            //no registererd
            var_dump('no registererd');
            header("Location: ../php/register.php");
            die();
        }
    }
}

//NEW PASSWORD

if (isset($_POST["changePassword"])) {
    if (isset($_SESSION['login'])) {
        $login = $_SESSION["login"];
        $oldPassword = $_POST["oldPassword"];
        $result = $db->prepare(LOGIN_QUERY);
        $result->bindParam(":login", $login);
        $result->execute();
        if ($result->rowCount()) {
            $user = $result->fetch();
            if (password_verify($oldPassword, $user['password'])) {
                //loggedin
                $newPassword = $_POST["newPassword"];
                $newPassword = password_hash($newPassword, PASSWORD_BCRYPT);
                $result = $db->prepare(CHANGE_PASSWORD);
                $result->bindParam(":login", $login);
                $result->bindParam(":password", $newPassword);
                if ($result->execute()) {
                    //change
                    // var_dump('done');
                    header("Location: ../index.php");
                    die();
                } else {
                    //no changed
                    // var_dump('not done');
                    header("Location: ../index.php");
                    die();
                }
            } else {
                //wrong password
                // var_dump('wrong password');
                header("Location: ../index.php");
                die();
            }
        } else {
            //no login
            // var_dump('no login');
            header("Location: ../index.php");
            die();
        }
    }
}

//IF LOGGED IN
if (isset($_SESSION['login'])) {
    echo $_SESSION['login'];
}


