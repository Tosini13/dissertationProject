<?php
// clearstatcache();
// header('Cache-Control: no-store');
session_start();
require_once('php/connect_database.php');

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
            <h2 class="title">DANCE ACADEMY</h2>
            <div class="content_borders views">
                <p>
                    Współczesna dziedzina informatyki cechuje się ogromną różnorodnością, w dodatku używaną na co dzień wielu innych dziedzinach nauk i życia. Jedną z nich jest webmastering, czyli projektowanie, wdrożenie i rozwój serwisów internetowych, z którą jest powiązanych szereg możliwości rozwiązań i jeszcze większej ilości problemów. Na pewno szybkość działania strony, wybór i pozycja w przeglądarce, ilość osób odwiedzających serwis wraz z ilością danych i doborem odpowiedniego hostingu, aż w końcu bezpieczeństwo przechowywania danych. W dobie dzisiejszych możliwości jak i regulacji prawnych, dane muszą być przechowywane i chronione w odpowiedni sposób.
                    Jak zatem stworzyć bezpieczną aplikację webową do zarządzania profilowaną szkołą?
                </p>
            </div>
        </section>
        <!-- ******************************************************************* -->
        <!--                            STYLES                                 -->
        <!-- ******************************************************************* -->
        <section id="styles">
            <h2 class="title">STYLE TAŃCA</h2>
            <div>
                <?php
                $result = $db->query("select * from dance_style;");
                if ($result->rowCount()) {
                    while ($data = $result->fetch()) {
                ?>
                        <div>
                            <a class="btn btnPress" onclick="show_style(this)">
                                <!-- <a class="btn"> -->
                                <?php echo $data['name'] ?>
                            </a>
                            <p class="list">
                                <?php echo $data['description'] ?>
                            </p>
                        </div>
                <?php
                    }
                }
                ?>
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
                    <table>
                        <?php
                        $result = $db->query("select * from price_discount;");
                        $discount = array();
                        if ($result->rowCount()) {
                            echo "<tr><th>dance</th>";
                            while ($data = $result->fetch()) {
                                //give tip here -> description!!!
                                echo "<th class='text-uppercase text-center' data-toggle='tooltip' data-placement='top' title='{$data['description']}'>{$data['type']}</th>";
                                $discount[$data['type']] = $data['discount'];
                            }
                            echo "<tr>";
                            $result = $db->query("select FORMAT(price,2) as price, name from price_list, dance_style where dance_style.id=price_list.style_id;");
                            if ($result->rowCount()) {
                                while ($data = $result->fetch()) {
                                    echo "<tr><td>{$data['name']}</td>";
                                    foreach ($discount as $key => $value) {
                                        $price = number_format($value * $data['price'], 2);
                                        echo "<td>$price</td>";
                                    }
                                    echo "</tr>";
                                }
                            }
                        }
                        ?>
                    </table>
                    <p>* Udział w pojedynczych lekcjach wynosi 20zł za jedną jednostkę treningową obejmuje każdy styl tańca (czas trwania treningu to 1 godzina)<br><span class="emphasise">(Pierwsza lekcja gratis!!!)</span></p>
                    <p>* Koszty są wyrażone w zł i przedstawiona jest cena obejmująca cały kurs<br>(czas trwania w opisie kursu)</p>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <?php require 'html/footer.html'; ?>
    </footer>
    <?php require "html/popup.html" ?>
    <!-- jQuery -->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
    <!-- BOOTSTRAP -->
    <!-- <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script> -->
    <!-- JavaScript -->
    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!-- JSX -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <!-- SLIDER -->
    <script type="text/javascript" src="slick/slick.min.js"></script>
    <!-- MOJE -->
    <script src="js/classes.js" type="text/javascript"></script>
    <script src="js/funcitons.js" type="text/javascript"></script>
    <script src="js/popup.js" type="text/javascript"></script>
    <script src="js/timetable.js" type="text/babel"></script>
    <!-- SLIDER -->
    <script>
        let events = document.querySelectorAll("#timetableEvents ul li ul li");
        console.log(events);

        $(document).ready(function() {
            $(".trainers").slick({
                prevArrow: '<i class="demo-icon icon-ico_arrow-left slick-my-next"></i>',
                nextArrow: '<i class="demo-icon icon-ico_arrow-right slick-my-prev"></i>',
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: false,
                autoplaySpeed: 5000,
                dots: true,
                arrows: false,
                responsive: [{
                    breakpoint: 980,
                    settings: {
                        // centerMode: true,
                        dots: true,
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 650,
                    settings: {
                        // centerMode: true,
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
    if (isset($_SESSION['rights']) && !strcmp($_SESSION['rights'], "admin")) {
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
                    maxYear: 2022,
                    locale: {
                        format: 'YYYY-MM-DD HH:mm'
                    }
                });
            });
        </script>
    <?php
    }
    ?>
</body>

</html>