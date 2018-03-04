<?php 

$doc = new DOMDocument;

// We don't want to bother with white spaces
$doc->preserveWhiteSpace = false;

// Most HTML Developers are chimps and produce invalid markup...
$doc->strictErrorChecking = false;
$doc->recover = true;

$doc->loadHTMLFile('http://www.isitdownrightnow.com/check.php?domain=youtube.com');

$xpath = new DOMXPath($doc);

$query = "//div[@class='statusup']";

$entries = $xpath->query($query);
var_dump($entries->item(0)->textContent);

?>
