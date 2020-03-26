<?php
// clearstatcache();
// header('Cache-Control: no-store');
session_start();
require_once('php/connect_database.php');

/* -------------------- */
/*       LOG IN        */
/* -------------------- */
if (isset($_GET['username'])) {
    $_SESSION['username'] = $_GET['username'];
}

if (!isset($_SESSION['username'])) {
    $_SESSION['username'] = false;
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
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <!-- calendar -->
    <link rel="stylesheet" type="text/css" href="calendar/daterangepicker.css" />
    <link rel="stylesheet" type="text/css" href="slick/slick.css" />
    <link rel="stylesheet" type="text/css" href="slick/slick-theme.css" />
    <link href="fontello/css/lato.css" rel="stylesheet">
    <link href="css/style.css" type="text/css" rel="stylesheet">
</head>

<body>
    <header>
        <?php require 'php/header.php'; ?>
    </header>
    <main id="index_content">
        <!-- <section id="about_us">
            <h2 class="title title1">DANCE ACADEMY</h2>
            <div class="content_borders views">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                </p>
            </div>
        </section> -->
        <!-- ******************************************************************* -->
        <!--                            STYLES                                 -->
        <!-- ******************************************************************* -->
        <section id="styles">
            <h2 class="title">STYLES</h2>
            <?php
            $result = $db->query("select * from dance_style;");
            if ($result->rowCount()) {
                while ($data = $result->fetch()) {
            ?>
                    <div>
                        <a class="btn" onclick="show_style(this)">
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
        </section>
        <!-- ******************************************************************* -->
        <!--                            TRAINERS                                 -->
        <!-- ******************************************************************* -->
        <section id='trainers'>
            <h2 class="title">TRAINERS</h2>
            <div class="trainers">
                <?php
                $url = "images/trainers/";
                $result = $db->query("select fname, lname, photo, description, login from trainer");
                if ($result->rowCount()) {
                    while ($data = $result->fetch()) {
                        $path = $url . $data['photo'];
                        $alt = $data['fname'] . ' ' . $data['lname'];
                ?>
                        <div class='btn trainer'>
                            <h6><?php echo $alt ?></h6>
                            <img src="<?php echo $path; ?>" alt="<?php echo $alt; ?>">
                            <div class="trainer_media">
                                <a href="#fb"><i class="fab fa-facebook-square"></i></a><br>
                                <a href="#insta"><i class="fab fa-instagram"></i></a>
                            </div>
                            <p>
                                <?php echo $data['description']; ?>
                            </p>
                        </div>
                <?php
                    }
                }
                ?>
            </div>
        </section>
        <!-- ******************************************************************* -->
        <!--                            TIMETABLE                                -->
        <!-- ******************************************************************* -->
        <section id='timetable'>
            <h2 class="title">PLAN ZAJĘĆ</h2>
            <div class="dashboard">
                <div>
                    <div>
                        <div id="week">
                            <i class="btn icon-left-open" onclick="calendar.changeDates(-7)"></i>
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
                            <i class="btn icon-right-open" onclick="calendar.changeDates(7)"></i>
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
            <h2 class="title">PRICE LIST</h2>
            <div class="content_borders prize_list">
                <div class="price_list">
                    <table class="col-10 col-md-6 ml-auto mr-auto mt-5">
                        <?php
                        $result = $db->query("select * from price_discount;");
                        $discount = array();
                        if ($result->rowCount()) {
                            echo "<tr><th class='text-uppercase text-center p-1'>dance</th>";
                            while ($data = $result->fetch()) {
                                //give tip here -> description!!!
                                echo "<th class='text-uppercase text-center' data-toggle='tooltip' data-placement='top' title='{$data['description']}'>{$data['type']}</th>";
                                $discount[$data['type']] = $data['discount'];
                            }
                            echo "<tr>";
                            $result = $db->query("select FORMAT(price,2) as price, name from price_list, dance_style where dance_style.id=price_list.style_id;");
                            if ($result->rowCount()) {
                                while ($data = $result->fetch()) {
                                    echo "<tr><td class='text-center p-1'>{$data['name']}</td>";
                                    foreach ($discount as $key => $value) {
                                        $price = number_format($value * $data['price'], 2);
                                        echo "<td class='text-center p-1'>$price €</td>";
                                    }
                                    echo "</tr>";
                                }
                            }
                        }
                        ?>
                    </table>
                    <p class="col-10 col-sm-6 mt-3 ml-auto mr-auto text-center">Prices in the table are costs per month</p>
                    <p class="col-10 col-sm-6 mt-3 ml-auto mr-auto text-center">Individual participation costs 10 € (including every dance style), while first lesson is free.</p>
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
    <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
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
    <script>
        const user = new User();
        const calendar = new Calendar();
    </script>
    <script src="js/timetable.js" type="text/babel"></script>
    <script src="js/slider.js" type="text/javascript"></script>


    <!-- CALENDAR -->
    <!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script> -->
    <script src="calendar/moment.min.js" type="text/javascript"></script>
    <script src="calendar/daterangepicker.js" type="text/javascript"></script>
    <script>
        $(function() {
            $('input[name="createDateEvent"]').daterangepicker({
                singleDatePicker: true,
                timePicker: true,
                showDropdowns: true,
                minYear: parseInt(moment().format('YYYY'), 10),
                maxYear: 2022,
                locale: {
                    format: 'YYYY-MM-DD hh:mm'
                }
            });
        });
    </script>
</body>

</html>