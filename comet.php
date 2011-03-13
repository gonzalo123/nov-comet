<?php
include('NovComet.php');

$comet = new NovComet();
$publish = filter_input(INPUT_GET, 'publish', FILTER_SANITIZE_STRING);
if ($publish != '') {
    echo $comet->publish($publish);
} else {
    foreach (filter_var_array($_GET['subscribed'], FILTER_SANITIZE_NUMBER_INT) as $key => $value) {
        $comet->setVar($key, $value);
    }
    echo $comet->run();
}