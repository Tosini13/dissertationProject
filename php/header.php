<i id='hamburger' class="icon-menu btn"></i>
<nav id='menu'>
    <img src='#' alt='logo'>
    <ul>
        <li>
            <a class="btn">ACCADEMIA</a>
            <ul class="submenu">
                <li class="btn"><a href="#">O NAS</a></li>
                <li class="btn"><a href="#">TRENERZY</a></li>
                <li class="btn"><a href="#">STYLE</a></li>
            </ul>
        </li>

        <li>
            <a class="btn">BALLERINI</a>
            <ul class="submenu">
                <li class="btn"><a href="#">TRENNINGI</a></li>
                <li class="btn"><a href="#">PŁATNOŚCI</a></li>
            </ul>
        </li>

        <li>
            <a class="btn">KONTO</a>
            <ul class="submenu">
                <?php if (!isset($_SESSION['login'])) { ?>
                    <li class="btn"><a href="php/login.php">ZALOGUJ</a></li>
                    <li class="btn"><a href="php/register.php">ZAREJESTRUJ</a></li>
                <?php } else { ?>
                    <li class="btn"><a href="php/login.php?logout=true" onclick="logout()">WYLOGUJ</a></li>
                <?php } ?>
            </ul>
        </li>
    </ul>
</nav>