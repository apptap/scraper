<?php
class Scraper extends CI_Controller {


        // Download the URL specified in POST argument 'url'.
        // Modify the HTML to inject our scraper code.
        // Save the page to local webspace.
        public function index()
        {
                $thePage     = NULL;
                $context     = NULL;
                $lineNum     = NULL;
                $srcFileName = NULL;
                $doc         = NULL;
                $file        = NULL;
                $uaString    = "Mozilla/5.0 (X11; CrOS armv7l 9202.64.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.146 Safari/537.36";
                $options     = array('http'             => array( 'user_agent'       => $uaString),
                                     'ssl'              => array( 'verify_peer'      => false,
                                                                  'verify_peer_name' => false));
                $theURL      = $this->input->post('url');

                if($theURL != NULL){

                        ob_clean();

                        $context  = stream_context_create($options);

                        //flush(); // Needed to make the following headers_sent call work.
                        // clean the output buffer
                        //ob_end();
                        // Download the page
                        //$thePage = file_get_contents(urlencode($theURL), false, $context);
                        $thePage = file_get_contents("$theURL", false, $context);
                        //    $thePage = file_get_contents("$theURL");
                        error_log("Scraper.php: Downloaded URL:\n$theURL\n");

                        echo $thePage;

                        //header('Content-type: application/json');
                        //echo json_encode(['httpResponseCode'=>200]);
/*
                        if(!(headers_sent($srcFileName, $lineNum))){
                                header('Content-type: application/json');
                                echo json_encode(['httpResponseCode'=>200]);
                                headers_sent($srcFileName, $lineNum);
                                error_log("Headers sent from file: $srcFileName - Line  $lineNum.");
                        }
                        //error_log("Headers: " . print_r(headers_list()));

                        //$headers = apache_request_headers();

                        //foreach ($headers as $header => $value) {
                        //        error_log( "$header: $value" );
                        //}
 */
                        libxml_use_internal_errors(true);
                        $doc = new DOMDocument();
                        $doc->loadHTML("$thePage");
/*

$requireJSAppLoader = <<<'EOD'

    alert(window.location.href);
    var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.dataset.main = "js/page2";
    scr.src = 'http://scraper.local/js/lib/require.js';
    document.body.appendChild(scr);
EOD;

      $appElem = $doc->createElement('script', $requireJSAppLoader);

      $body = $doc->getElementsByTagName('body')->item(0);

      $body->appendChild($appElem);
      //$sequential = array("foo", "bar", "baz", "blong");
*/

                        $file = '/var/www/html/target.html';

                        $doc->saveHTMLFile("$file");

                        //print $thePage;

                        //error_log("Scraper.php Terminated.");

                }else{  // No URL specified, load main view.

                        $this->load->view('main');

                }
        }
}