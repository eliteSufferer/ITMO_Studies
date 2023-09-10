<?php

$start_time = microtime(true);
function circle($x, $y, $r) {
    return (($x ** 2 + $y ** 2) <= ($r) ** 2);
}

function vector ($x1, $y1, $x2, $y2){
    return $x1 * $y2 - $y1 * $x2;
}


function triangle ($x, $y, $r){
    $p = vector(0-$x, 0-$y, -$r, 0);
    $q = vector(-$r-$x, 0-$y, $r, -$r/2);
    $v_r = vector(0-$x, -$r/2-$y, 0, $r/2);

    return (($p <= 0 && $q <= 0 && $v_r <= 0) || ($p >= 0 && $q >= 0 && $v_r >= 0));
}

function rectangle($x, $y, $r){
    return ($x >= 0 && $x <= $r && $y >= 0 && $y <= $r);
}

function check_quarter($x, $y){
    if ($x > 0 && $y > 0){
        return 'first';
    } else if ($x < 0 && $y > 0){
        return 'second';
    } else if ($x < 0 && $y < 0) {
        return 'third';
    } else if ($x > 0 && $y < 0){
        return 'fourth';
    } else {
        return 'on axis';
    }
}
if ($_SERVER['REQUEST_METHOD'] != 'GET'){
    http_response_code(405);
    echo 'Incorrect, try again) Only GET method accepted.';
    exit();
}
$x = $_GET['xVal'];
$y = $_GET['yVal'];
$r = $_GET['rVal'];

$response = [];

if (!(is_numeric($x)) || !(is_numeric($y)) || !(is_numeric($r))){
    http_response_code(422);
    echo 'Incorrect, try again) Invalid data type';
    exit();
} else if (!(-3 <= $x && $x <= 5) || !(-5 <= $y && $y <= 5) || !(1 <= $r && $r <= 5)){
    http_response_code(422);
    echo 'Incorrect, try again) Invalid data range';
    exit();
} else {
    switch (check_quarter($x, $y)){
        case 'first':
            if (rectangle($x, $y, $r)){
                $response['result'] = 'In';
            } else {
                $response['result'] = 'Out';
            }
            break;
        case 'second':
            $response['result'] = 'Out';
            break;
        case 'third':
            if (triangle($x, $y, $r)){
                $response['result'] = 'In';
            } else {
                $response['result'] = 'Out';
            }
            break;
        case 'fourth':
            if (circle($x, $y, $r)){
                $response['result'] = 'In';
            } else {
                $response['result'] = 'Out';
            }
            break;
        case 'on axis':
            $response['result'] = 'In';
            break;
    }
}

$end_time = microtime(true);
$execution_time = ($end_time - $start_time);

date_default_timezone_set('Europe/Moscow');
$response['curr_time'] = date('H:i:s');
$response['exec_time'] = $execution_time;

header('Content-Type: application/json');
echo json_encode($response);




