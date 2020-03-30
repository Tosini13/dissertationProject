<?php
session_start();

// LOGOUT
if (isset($_GET['logout'])) {
    unset($_SESSION['login']);
    header("Location: ../php/login.php");
    die();
}

// LOGGEDIN
if (isset($_SESSION['login']) && !isset($_GET['logout'])) {
    header("Location: ../index.php");
    die();
}

?>
<!DOCTYPE html>
<html>

<head>
    <title>Accademia Ballerino</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- CSS -->
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One|Luckiest+Guy|Monoton|Press+Start+2P|Righteous&display=swap&subset=latin-ext" rel="stylesheet">
    <link href="../fontello/css/montserrat.css" rel="stylesheet">
    <link href="../css/account.css" type="text/css" rel="stylesheet">
</head>

<body>
    <main>
        <h2>LOGOWANIE</h2>
        <form method="POST" action="../php/accountManager.php" target="_self">
            <label for="login">Login:</label>
            <input type="text" name="login" placeholder="login lub e-mail" required pattern="(?!.*\s).{3,}" title="Niepoprawy login lub email">
            <label for="password">Hasło:</label>
            <input type="password" name="password" placeholder="hasło" required pattern="(?=.*\W)(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Niepoprawe hasło">
            <button class="btn" type="submit" name="login_submit">Zaloguj</button>
        </form>
        <div>
            <p>Nie masz jeszcze konta?</p>
            <a class="btn" href="register.php">Zarejestruj się!</a>
            <a class="btn" href="../index.php">Kontynuuj bez logowania</a>
        </div>
    </main>

    <div id='tip'>
        <p></p>
    </div>
    <script src="../js/account.js" type="text/javascript"></script>
</body>

</html>