
<?php
// SET TRAINER's PHOTO
if ($_FILES["photo"]['name'] != "") {
    //PHOTO
    $imageFile = $_FILES['photo']['name'];
    $tempName = $_FILES['photo']['tmp_name'];
    $path = "../images/trainers/" . $imageFile;
    if (!file_exists($path)) {
        //ADD FILE TO SERVER
        move_uploaded_file($tempName, $path);
        $response = $path . " - " . $tempName . " - " . $imageFile;
    } else {
        $response = "Plik o takiej nazwie już istnieje";
    }
    echo $response;
}
