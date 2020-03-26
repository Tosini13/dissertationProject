<i id='hamburger' class="icon-menu btn"></i>
<nav id='menu'>
    <img src='#' alt='logo'>
    <ul>
        <li>
            <a class="btn">ACCADEMIA</a>
            <ul class="submenu">
                <li>
                    <a class="btn" data-section="trainers">O NAS</a>
                    <div>
                        <a data-popup='createEvent'><i class="icon-plus"></i></a>
                        <a data-popup='createEvent'><i class="icon-pencil-1"></i></a>
                    </div>
                </li>
                <li>
                    <a class="btn" data-section="trainers">TRENERZY</a>
                    <div>
                        <a data-popup='createTrainer'><i class="icon-plus"></i></a>
                        <a data-popup='createTrainer'><i class="icon-pencil-1"></i></a>
                    </div>
                </li>
                <li>
                    <a class="btn" data-section="styles">STYLE</a>
                    <div>
                        <a data-popup='createEvent'><i class="icon-plus"></i></a>
                        <a data-popup='createEvent'><i class="icon-pencil-1"></i></a>
                    </div>
                </li>
            </ul>
        </li>

        <li>
            <a class="btn">BALLERINI</a>
            <ul class="submenu">
                <li>
                    <a class="btn" data-section="timetable">TRENNINGI</a>
                    <div>
                        <a data-popup='createEvent'><i class="icon-plus"></i></a>
                        <a data-popup='createEvent'><i class="icon-pencil-1"></i></a>
                    </div>
                </li>
                <li>
                    <a class="btn" data-section="prices">PŁATNOŚCI</a>
                    <div>
                        <a data-popup='createEvent'><i class="icon-plus"></i></a>
                        <a data-popup='createEvent'><i class="icon-pencil-1"></i></a>
                    </div>
                </li>
            </ul>
        </li>

        <li>
            <a class="btn">KONTO</a>
            <ul class="submenu">
                <?php if (!isset($_SESSION['login'])) { ?>
                    <li><a class="btn" href="php/login.php">ZALOGUJ</a></li>
                    <li><a class="btn" href="php/register.php">ZAREJESTRUJ</a></li>
                <?php } else { ?>
                    <li><a class="btn" href="php/login.php?logout=true" onclick="logout()">WYLOGUJ</a></li>
                <?php } ?>
            </ul>
        </li>
    </ul>
</nav>