<?php
session_start();
if (isset($_SESSION['login'])) {
    header("Location: ../index.php");
    die();
}

if (isset($_GET['error'])) {
    // var_dump("cos poszlo nie tak");
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
        <h2>REJESTRACJA</h2>
        <form id="register" method="POST" action="../php/accountManager.php" target="_self">
            <label for="login">Login:</label>
            <input class="login" type="text" name="login" placeholder="login" required pattern="(?!.*\W)(?!.*\s).{5,}" title="Login musi zawierać przynajmniej 5 znaków w tym żadnych znaków specjalnych">
            <label for="email">Email:</label>
            <input class="email" type="email" name="email" placeholder="e-mail"
             required pattern="(?!.*\s).{3,}" title="Nie poprawny adres email">
            <label for="password">Hasło:</label>
            <input class="password" type="password" name="password" placeholder="hasło" required pattern="(?=.*\W)(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Hasło musi zawierać przynajmniej jedną wielką literę, małą literę, cyfrę, znak specjalny i mieć długość przynajmniej 8 znaków.">
            <label for="password">Powtórz hasło:</label>
            <input class="passwordRepeat" type="password" name="passwordRepeat" placeholder="hasło" required>
            <button class="btn" type="submit" name="register_submit">Zarejestruj</button>
        </form>
        <a class="btn" href="login.php"><i class="icon-login"></i>Wróc do logowania</a>
    </main>

    <div id='tip'>
        <p></p>
    </div>
    <script src="../js/account.js" type="text/javascript"></script>

    <?php if (isset($_GET['error'])) { ?>
        <script>
            setTip("Coś poszło nie tak!");
        </script>
    <?php } ?>
</body>

</html>