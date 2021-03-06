<?php
session_start();
require_once('php/connect_database.php');

if (!isset($_SESSION['login'])) {
    unset($_SESSION['rights']);
} elseif ($_SESSION['login'] == null) {
    $_SESSION['rights'] = null;
}

/* -------------------- */
/*       LOG OUT        */
/* -------------------- */
if (isset($_GET['logout'])) {
    $_SESSION = array();
    header("Location: _account/login.php");
    die();
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Accademia di Bellerino</title>
    <meta name="description" content="Web developer create website for business">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One|Luckiest+Guy|Monoton|Press+Start+2P|Righteous&display=swap&subset=latin-ext" rel="stylesheet">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <!-- calendar -->
    <link rel="stylesheet" type="text/css" href="calendar/daterangepicker.css" />
    <link rel="stylesheet" type="text/css" href="slick/slick.css" />
    <link rel="stylesheet" type="text/css" href="slick/slick-theme.css" />
    <link href="fontello/css/montserrat.css" rel="stylesheet">
    <link href="css/style.css" type="text/css" rel="stylesheet">
</head>

<body>
    <header>
        <?php require 'php/header.php'; ?>
    </header>
    <main id="index_content">
        <section id="about_us">
            <h2 class="title">Accademia di Bellerino</h2>
            <div class="content_borders views">
                <p>
                    Szkoła tańca Accademia di Ballerino została założona w 2000 roku przez znanego włoskiego tancerza Francesco Cotadiniego.
                    Był jednym z najlepszych w Europie tancerzy latynoskich. Tak i szkoła odziedziczyła po nim style tańca w tym klimacie.
                    Szkoła oferuje treningi prowadzone przez jednych z najlepszych trenerów w Polsce w zakresie stylów latynoskich.
                </p>
            </div>
        </section>
        <!-- ******************************************************************* -->
        <!--                            STYLES                                 -->
        <!-- ******************************************************************* -->
        <section id="styles">
            <h2 class="title">STYLE TAŃCA</h2>
            <div>
            </div>
        </section>
        <!-- ******************************************************************* -->
        <!--                            TRAINERS                                 -->
        <!-- ******************************************************************* -->
        <?php
        $url = "images/trainers/";
        $result = $db->query("select * from trainer");
        if ($result->rowCount()) {
        ?>
            <section id='trainers'>
                <h2 class="title">TRENERZY</h2>
                <div class="trainers">
                    <?php
                    while ($data = $result->fetch()) {
                        if ($data['photo'] == "" || $data['photo'] === null) {
                            $path = $url . "trainer.jpg";
                        } else {
                            $path = $url . $data['photo'];
                        }
                        $alt = $data['fname'] . ' ' . $data['lname'];
                    ?>
                        <div>
                            <div class='btn trainer'>
                                <div>
                                    <h6><?php echo $alt ?></h6>
                                    <img src="<?php echo $path; ?>" alt="<?php echo $alt; ?>">
                                    <div class="trainerMedia">
                                        <?php
                                        if ($data['fb'] != "" && $data['fb'] !== null) {
                                        ?>
                                            <a href="<?php echo $data['fb']; ?>" target="_blank"><i class="icon-facebook"></i></a>
                                        <?php
                                        }
                                        if ($data['insta'] != "" && $data['insta'] !== null) {
                                        ?>
                                            <a href="<?php echo $data['insta']; ?>" target="_blank"><i class="icon-instagram"></i></a>
                                        <?php
                                        }
                                        if ($data['yt'] != "" && $data['yt'] !== null) {
                                        ?>
                                            <a href="<?php echo $data['yt']; ?>" target="_blank"><i class="icon-youtube"></i></a>
                                        <?php
                                        }
                                        if ($data['twitter'] != "" && $data['twitter'] !== null) {
                                        ?>
                                            <a href="<?php echo $data['twitter']; ?>" target="_blank"><i class="icon-twitter"></i></a>
                                        <?php
                                        }
                                        ?>
                                    </div>
                                </div>
                                <p>
                                    <?php echo $data['description']; ?>
                                </p>
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            </section>
        <?php
        }
        ?>
        <!-- ******************************************************************* -->
        <!--                            TIMETABLE                                -->
        <!-- ******************************************************************* -->
        <section id='timetable'>
            <h2 class="title">PLAN ZAJĘĆ</h2>
            <div class="dashboard">
                <div>
                    <div>
                        <!-- <i id="userEvents" class="icon-calendar-check-o"></i> -->
                        <div id="week">
                            <a class="btn btnPress icon-left-open" onclick="calendar.changeDates(-7)"><i></i></a>
                            <div>
                                <h6 id="month1"></h6>
                                <h3 id="day1"></h3>
                            </div>
                            <div>
                                <h6 id="year"></h6>
                                <h3>-</h3>
                            </div>
                            <div>
                                <h6 id="month2"></h6>
                                <h3 id="day2"></h3>
                            </div>
                            <a class="btn btnPress icon-right-open" onclick="calendar.changeDates(7)"><i></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div id='timetableEvents'>
            </div>
        </section>
        <!-- ******************************************************************* -->
        <!--                            PRICE LIST                               -->
        <!-- ******************************************************************* -->
        <section id='prices'>
            <h2 class="title">CENY</h2>
            <div class="content_borders prize_list">
                <div class="price_list">
                    <p>Udział w pojedynczych lekcjach wynosi 20zł za jedną jednostkę treningową obejmuje każdy styl tańca (czas trwania treningu to 1 godzina)<br><span class="emphasise">(Pierwsza lekcja gratis!!!)</span></p>
                    <p>Opłata za cały kurs to 60zł</p>
                    <p>
                        Nr konta Accademia di Ballerino:
                        00 0000 0000 0000 0000 0000 0000
                    </p>
                    <p>
                        w tytule wpłaty proszę podać imię, nazwisko i określić jakiego kursu dotyczy wpłata.
                    </p>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <?php require 'html/footer.html'; ?>
    </footer>
    <?php require "html/popup.html" ?>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <!-- BOOTSTRAP -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!-- SLIDER -->
    <script type="text/javascript" src="slick/slick.min.js"></script>
    <!-- MOJE -->
    <script src="js/JsStyles.js" type="text/javascript"></script>
    <?php
    if (isset($_SESSION['login']) && ($_SESSION['login'] != null)) {
    ?>
        <script src="js/user.js" type="text/javascript"></script>
    <?php
    }
    ?>
    <script src="js/JsModifyEvent.js" type="text/javascript"></script>
    <script src="js/JsTimetable.js" type="text/javascript"></script>
    <script src="js/JsUserEvents.js" type="text/javascript"></script>
    <script src="js/classes.js" type="text/javascript"></script>
    <script src="js/funcitons.js" type="text/javascript">
    </script>
    <script src="js/popup.js" type="text/javascript"></script>

    <!-- SLIDER -->
    <script>
        $(document).ready(function() {
            $(".trainers").slick({
                prevArrow: '<i class="demo-icon icon-ico_arrow-left slick-my-next"></i>',
                nextArrow: '<i class="demo-icon icon-ico_arrow-right slick-my-prev"></i>',
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                arrows: false,
                responsive: [{
                    breakpoint: 980,
                    settings: {
                        dots: true,
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 650,
                    settings: {
                        dots: true,
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }]
            });

        });
    </script>

    <?php
    // if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
    ?>
    <!-- CALENDAR -->
    <script src="calendar/moment.min.js" type="text/javascript"></script>
    <script src="calendar/daterangepicker.js" type="text/javascript"></script>
    <script>
        $(function() {
            $('input[name="createDateEvent"]').daterangepicker({
                singleDatePicker: true,
                timePicker: true,
                showDropdowns: true,
                timePicker24Hour: true,
                minYear: parseInt(moment().format('YYYY'), 10),
                maxYear: 2025,
                locale: {
                    format: 'YYYY-MM-DD HH:mm'
                }
            });
        });
    </script>
    <?php
    // }
    ?>
</body>

</html>