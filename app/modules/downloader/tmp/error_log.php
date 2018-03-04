<?php
function my_error_handler($type, $message, $file, $line, $vars)
{
    switch($type) 
    { 
        case 1: // 1 // 
            $type_str = 'ERROR'; 
            break;
        case 2: // 2 // 
            $type_str = 'WARNING';
            break;
        case 4: // 4 // 
            $type_str = 'PARSE';
            break;
        case 8: // 8 // 
            $type_str = 'NOTICE'; 
            break;
        case 16: // 16 // 
            $type_str = 'CORE_ERROR'; 
            break;
        case 32: // 32 // 
            $type_str = 'CORE_WARNING'; 
            break;
        case 64: // 64 // 
            $type_str = 'COMPILE_ERROR'; 
            break;
        case 128: // 128 // 
            $type_str = 'COMPILE_WARNING'; 
            break;
        case 256: // 256 // 
            $type_str = 'USER_ERROR'; 
            break;
        case 512: // 512 // 
            $type_str = 'USER_WARNING'; 
            break;
        case 1024: // 1024 // 
            $type_str = 'USER_NOTICE'; 
            break;
        case 2048: // 2048 // 
            $type_str = 'STRICT'; 
            break;
        case 4096: // 4096 // 
            $type_str = 'RECOVERABLE_ERROR'; 
            break;
        case 8192: // 8192 // 
            $type_str = 'DEPRECATED'; 
            break;
        case 16384: // 16384 // 
            $type_str = 'USER_DEPRECATED'; 
            break;
    }

    $errormessage =  '[ '.date(r).' ] '.$type_str.': '.$message.' in '.$file.' on line '.$line."\n";
   // for development simply ECHO $errormessage;

        $file = 'my_errors.log';
        file_put_contents($file, $errormessage, FILE_APPEND);
}

error_reporting(E_ALL);
ini_set('display_errors', '0');
set_error_handler('my_error_handler');

?>
