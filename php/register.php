<?php
session_start();
if (isset($_SESSION['login'])) {
    header("Location: ../index.php");
    die();
}

if (isset($_GET['error'])) {
    var_dump("cos poszlo nie tak");
}

?>
<!DOCTYPE html>
<html>

<head>
    <title>Accademia Ballerino</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- CSS -->
    <link href="../css/account.css" type="text/css" rel="stylesheet">
</head>

<body>
    <h2>REJESTRACJA</h2>
    <form method="POST" action="../php/accountManager.php" target="_self">
        <label for="login">Login:</label>
        <input type="text" name="login" placeholder="login" required pattern="(?!.*\W)(?!.*\s).{5,}" title="Login musi zawierać przynajmniej 5 znaków w tym żadnych znaków specjalnych">
        <label for="email">Email:</label>
        <input type="email" name="email" placeholder="e-mail" required pattern="(?!.*\s).{3,}" title="Nie poprawny adres email">
        <label for="password">Hasło:</label>
        <input type="password" name="password" placeholder="hasło" required pattern="(?=.*\W)(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Hasło musi zawierać przynajmniej jedną wielką literę, małą literę, cyfrę, znak specjalny i mieć długość przynajmniej 8 znaków.">
        <label for="password">Powtórz hasło:</label>
        <input type="password" name="passwordRepeat" placeholder="hasło" required>
        <button class="btn" type="submit" name="register_submit">Zaloguj</button>
    </form>
    <div>
        <p>Nie masz jeszcze konta?</p>
        <a href="login.php">Wróc do logowania</a>
        <a href="../index.php">Kontynuuj bez logowania</a>
    </div>
</body>

</html>