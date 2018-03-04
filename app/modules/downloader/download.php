<?php
        ini_set('display_errors', 'On');

        error_reporting(E_ALL | E_STRICT);

        // Turn off error checking.
        libxml_use_internal_errors(true);

        
        /*
         * Display $msg on STDERR.
         * */
        function errlog($msg) {
                file_put_contents('php://stderr', $msg );
        }

        /* Send back JSON object containing two members,
         * 'html', which representsthe page, or part of,
         * just downloaded as a string, and 'url'
         * showing where the html originated from.
         */
        function send_back_data($html) {
                $arr = array('html' => $html, 'url' => $_POST['url']);
                echo json_encode($arr);
                return;
        }

        /*
         * Check Wget output (passed as $errmsg) for errors getting the page.
         * If we have the page, set it's pathname in $page_path.
         * */
        function validate_wget($errmsg, &$page_path) {

                //errlog("validate_wget(): \$errmsg is " . strlen($errmsg) . " chars long.\n");

                $wget_messages = array('Read error','Scheme missing','ERROR 404');
                $patterns_flattened = implode('|', $wget_messages);

                if ( preg_match('/('. $patterns_flattened .')/', $errmsg, $matches) === true)
                {
                        errlog("Read error, Scheme missing or 404, aborting.\n");
                        return false;
                }

                $wget_messages = array(".*Saving to: ‘(.*)’",".*File ‘(.*)’ already there");
                $patterns_flattened = implode('|', $wget_messages);

                if ( preg_match('/('. $patterns_flattened .')/', $errmsg, $matches) )
                {
                        $page_path = $matches[2];
                        errlog("Download Message from WGet:\n$matches[0]: " . $matches[0] . "\n");
                        return true;
                } else {
                        errlog("validate_wget(): WGet returned no filename.\n\$errmsg: " . $errmsg . "\n");
                        return false;
                }
        }

	/************************    MAIN PROGRAM START   *************************/


	shell_exec('rm /srv/localhost/htdocs/target.html');

        // Download the URL save under 'dir_this_file'/product_pages/'domain'.
        // URL is supplied via AJAX POST
        $url                  = $_GET['url'];
        $matches              = [];
        $ua                   = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36';
        $page_path            = '';
        $wget_opts            = "-nc -p -O /srv/localhost/htdocs/target.html -U'$ua' -e robots=off -x ";
        //$wget_opts            = " -P./product_pages -nc -U'$ua' -e robots=off -x ";
        $html                 = '';

        $today= shell_exec('date');
        $settings = <<< EOT

URL: $url - $today

EOT;
        errlog($settings);

        // Run WGet
        $errmsg = shell_exec("wget $wget_opts '$url' 2>&1");
        
        // Send the html back to the requestor.
        if(validate_wget($errmsg, $page_path) == True) {
                errlog("GOOD: $url" . ": Saving as: $page_path\n");

				$html = file_get_contents($page_path);

                $tidy = new tidy();

                $htmlBody = $tidy->repairString($html, array( 'output-xhtml' => false, 'show-body-only' => false), 'utf8');

                $xml = new DOMDocument();

				$xml->loadHTML($htmlBody);

				
				foreach($xml->getElementsByTagName('a') as $link) { 
					$oldLink = $link->getAttribute("href");
					
					// Backup the href to an HTML5 data attribute.
		   			$link->setAttribute('data-href', "$oldLink");

		   			$link->setAttribute('href', "javascript:void();");
				}

				$ret = file_put_contents("/srv/localhost/htdocs/target.html", $xml->saveHTML());

				if($ret === false) {
		    		//errlog("FAIL: target.html not saved.\n");
				}

//                send_back_data( $xml->saveHTML() );
        }else{
                //errlog("FAIL: $url" . ": not saved: No Filename.\nWget Output:\n" . $errmsg);
        }

?>
