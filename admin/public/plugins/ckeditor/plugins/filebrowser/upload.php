<?php
if(isset($_FILES['upload'])){
    
     function getMicroTime($time=''){
          /*
              $time gets microtime in decimal according to the time zone
          */
          if(empty($time)){
              $time = microtime(true);
          }
          $i_decimal_length=   strlen(substr(strrchr($time, "."), 1));//length of the number after decimal point
          $i_mult_val="1".str_repeat("0", $i_decimal_length);// multiply with (100 or 1000 or 10000) accoording to the length of the decimal point
          return $time*$i_mult_val;
      }
     // ------ Process your file upload code -------
      $root =  $_SERVER['DOCUMENT_ROOT'];
      $folder= '/assets/images/ckeditor/';
      $img = getMicroTime()."_".$_FILES['upload']['name'];
      $url = $root.$folder.$img;
      if (!is_dir($root.$folder)) {
				mkdir($root.$folder, 0777, true);
			}

      $message = "";
     $move = move_uploaded_file($_FILES['upload']['tmp_name'], $url);
     if(!$move)
     {
        $message = " not moving uploaded file.";
     }
      $url = "http://".$_SERVER['HTTP_HOST'].$folder.$img;
      $funcNum = $_GET['CKEditorFuncNum'] ;
    
   // Optional: instance name (might be used to load a specific configuration file or anything else).
//   $CKEditor = $_GET['CKEditor'] ;
//   // Optional: might be used to provide localized messages.
//   $langCode = $_GET['langCode'] ;
    
   // Usually you will only assign something here if the file could not be uploaded.
   $message = '';
   echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
}