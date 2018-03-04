<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Autoscraper</title>
    <link href="http://localhost/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://localhost/css/bootstrap-theme.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="http://localhost/css/style.css" />
    <style>
    .tick {
      display: none;
      margin-left: 5px;

    }

          #URL {

            width: 400px;
            margin-bottom: 10px;

          }

          #get_deals {

            margin-right: 15px;

          }

          #progress {

            width: 310px;

          }

          #field_list {

      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
          }

          #field_list > li {
              float: left;
              margin-right: 10px;
          }


    </style>

    <style>
    @media (min-width: 768px) {
      .row.equal {
        display: flex;
        flex-wrap: wrap;
      }
    }
        
    /* add this for full height column content 
     * .equal > div[class*='col-'] {  
     *   display: flex;
     *     flex-direction: column;
     *     }
     *     */
      
    </style>
  </head>

  <body>
    <div class="navbar-wrapper">
      <div class="container">

        <nav class="navbar navbar-inverse navbar-static-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Deal Digger</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
          <li><a href="#">Add Product Series</a></li>
          <li><a href="#about">Remove Product Series</a></li>
          <li><a href="#contact">Fetch Info</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Options<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">Nav header</li>
              <li><a href="#">Separated link</a></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
              </ul>
            </div>
          </div>
        </nav>

      </div> <!-- .container -->
    </div> <!-- .navbar-wrapper -->

    <div class="panel panel-default" style="margin-top: 100px;">
      <div class="panel-heading">Product Sources</div>
      <div class="panel-body">

        <div class="container-fluid">
          <div class="row equal">

            <div class="col-xs-6 col-sm-6" style="background-color: yellow">

              <div style="margin-top: 1em; width: 100%;">
                <?php
                echo form_open();
                echo form_label('URL:', 'URL');
                echo form_input('URL', 'http://localhost/zalando/product_page_1.html','id=\'URL\'');
                ?>
                <input id="get_deals" type="button" value="Get Deals">
              </div>

              <div style="width: 86%;" id="progress" class="progress">
                <div id="download_progress_bar" class="progress-bar progress-bar-info active" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="padding-top: 0.33em; width: 0%"><span id="progress_bar_msg">0% Complete</span></div>
              </div>

            </div>

            <div class="col-xs-6 col-sm-6" style="background-color: yellow;">
              <div id="app_status_msg" style="float: none; width: 50%; height: 100%; color: black; background-color: yellow;">
                Has a price: No
                  <!--
                    <?php
                    echo form_button('','Request Product Info','id=send');
                    echo form_close();
                    ?>
                  -->
              </div>
            </div>  
          </div>
        </div>

        <div style="float: left; width: 50%; padding-left: 1em; color: black;  background-color: yellow;">
          <ul id="field_list">
            <li id="product_description">Description<span id="tick_description" class="tick">&#x2713;</span></li>
            <li id="product_price">Price<span id="tick_price" class="tick">&#x2713;</span></li>
            <li id="product_photo">Photo<span id="tick_photo" class="tick">&#x2713;</span></li>
            <li id="product_buy_link">Buy Link<span id="tick_buy_link" class="tick">&#x2713;</span></li>
            <li id="product_quantity">Quantity<span id="tick_quantity" class="tick">&#x2713;</span></li>
            <li id="product_quantity_inc">Quantity +<span id="tick_quantity_inc" class="tick">&#x2713;</span></li>
            <li id="product_quantity_dec">Quantity -<span id="tick_quantity_dec" class="tick">&#x2713;</span></li>
            <li id="product_next_page_link">Next Page Link<span id="tick_next_page_link" class="tick">&#x2713;</span></li>
          </ul>
        </div>

        <div id="current_URL" style="float: left; width: 50%; cooor: black; background-color: yellow;">
          Current URL: no URL selected.
        </div>

      </div> <!-- .panel-body -->
    </div> <!-- .panel -->

    <iframe name="target_site" id="target_site" sandbox="allow-scripts allow-same-origin allow-modals" style="background-color: white; height: 580px; width:100%; overflow: auto;">
    </iframe>

    <script data-main="js/page" src="js/lib/require.js"></script>

  </body>
</html>
