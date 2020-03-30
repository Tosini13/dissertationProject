<i id='hamburger' class="icon-menu btn"></i>
<nav id='menu'>
    <img src='#' alt='logo'>
    <ul>
        <li>
            <a class="btn">ACCADEMIA</a>
            <ul class="submenu">
                <li>
                    <a class="btn btnPress" data-section="about_us">O NAS</a>
                    <?php
                    if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
                    ?>
                        <div>
                            <a data-popup='createEvent'><i class="icon-plus"></i></a>
                            <a data-popup='createEvent'><i class="icon-minus"></i></a>
                        </div>
                    <?php
                    }
                    ?>
                </li>
                <li>
                    <a class="btn btnPress" data-section="trainers">TRENERZY</a>
                    <?php
                    if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
                    ?>
                        <div>
                            <a data-popup='createTrainer'><i class="icon-plus"></i></a>
                            <a data-popup='createTrainer'><i class="icon-minus"></i></a>
                        </div>
                    <?php
                    }
                    ?>
                </li>
                <li>
                    <a class="btn btnPress" data-section="styles">STYLE</a>
                    <?php
                    if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
                    ?>
                        <div>
                            <a data-popup='createStyle'><i class="icon-plus"></i></a>
                            <a data-popup='createStyle'><i class="icon-minus"></i></a>
                        </div>
                    <?php
                    }
                    ?>
                </li>
            </ul>
        </li>

        <li>
            <a class="btn">BALLERINI</a>
            <ul class="submenu">
                <li>
                    <a class="btn btnPress" data-section="timetable">TRENNINGI</a>
                    <?php
                    if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
                    ?>
                        <div>
                            <a data-popup='createEvent'><i class="icon-plus"></i></a>
                            <a data-popup='createEvent'><i class="icon-minus"></i></a>
                        </div>
                    <?php
                    }
                    ?>
                </li>
                <li>
                    <a class="btn btnPress" data-section="prices">PŁATNOŚCI</a>
                    <?php
                    if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
                    ?>
                        <div>
                            <a data-popup='createEvent'><i class="icon-plus"></i></a>
                            <a data-popup='createEvent'><i class="icon-minus"></i></a>
                        </div>
                    <?php
                    }
                    ?>
                </li>
            </ul>
        </li>

        <li>
            <a class="btn">KONTO</a>
            <ul class="submenu">
                <?php if (!isset($_SESSION['login'])) { ?>
                    <li><a class="btn btnPress" href="php/login.php">ZALOGUJ</a></li>
                    <li><a class="btn btnPress" href="php/register.php">ZAREJESTRUJ</a></li>
                <?php } else { ?>
                    <li><a class="btn" href="php/login.php?logout=true" onclick="logout()">WYLOGUJ</a></li>
                <?php } ?>
            </ul>
        </li>
    </ul>
</nav>