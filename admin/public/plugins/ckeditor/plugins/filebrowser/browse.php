<?php  
header("Content-Type: text/html; charset=utf-8\n");  
header("Cache-Control: no-cache, must-revalidate\n");  
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");  

// e-z params  
$dim = 150;         /* image displays proportionally within this square dimension ) */  
$cols = 4;          /* thumbnails per row */
$thumIndicator = '_th'; /* e.g., *image123_th.jpg*) -> if not using thumbNails then use empty string */  
?>  
<!DOCTYPE html>  
<html>  
<head>  
    <title>browse file</title>  
    <meta charset="utf-8">  

    <style>  
        html,  
        body {padding:0; margin:0; background:#fff; }  
        li { list-style: none; }
        table {width:100%; border-spacing:15px; }  
        td {text-align:center; padding:5px; background:#181818; }  
        img {border:5px solid #303030; padding:0; verticle-align: middle;}  
        img:hover { border-color:blue; cursor:pointer; }  
        .inside_image {     float: left;
    width: auto;
    margin-left: 5px;
} 
    </style>  

</head>  


<body>  


<?php 
  # Path to image folder
$dir = $_SERVER['DOCUMENT_ROOT']."/assets/images/ckeditor/";
$SITE_URL = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]/assets/images/ckeditor/";
# Show only these file types from the image folder
$imageTypes = '{*.jpg,*.JPG,*.jpeg,*.JPEG,*.png,*.PNG,*.gif,*.GIF}';
# Set to true if you prefer sorting images by name
# If set to false, images will be sorted by date
$sortByImageName = false;
# Set to false if you want the oldest images to appear first
# This is only used if images are sorted by date (see above)
$newestImagesFirst = true;
# The rest of the code is technical
# Add images to array
$images = glob($dir . $imageTypes, GLOB_BRACE); 
# Sort images
if ($sortByImageName) {
    $sortedImages = $images;
    natsort($sortedImages);
} else {
    # Sort the images based on its 'last modified' time stamp
    $sortedImages = array();
    $count = count($images);
    for ($i = 0; $i < $count; $i++) {
        $sortedImages[date('YmdHis', filemtime($images[$i])) . $i] = $images[$i];
    }
    # Sort images in array
    if ($newestImagesFirst) {
        krsort($sortedImages);
    } else {
        ksort($sortedImages);
    }
}

  
?> 

<div class="images" style="height:500px;overflow-y:scroll">
    <ul > 
      <li>
 <?php 
    if($sortedImages){
      foreach ($sortedImages as $image) {
        $onlyimagename = str_replace($dir, "", $image);  ?> 
            <li>
              <div class="inside_image">
                  <div class="top_section">
                    <img src="<?php echo $SITE_URL.'/'.$onlyimagename; ?>" height="100" width="100" title="<?php echo $onlyimagename; ?>" class="getimagepath" />     
                  </div> 
              </div>
            </li> 
    
   <?php } }else{ ?>
    <li>
        <div class="inside_image">
                  <div class="top_section">
                    no image found.
                  </div> 
              </div>
    </li>
    <?php } ?>
      </li>
    </ul>
</div>
<style type="text/css">
  .images ul li{ margin-right: 0px; }
</style>  


<script src="https://code.jquery.com/jquery-1.10.2.js"></script> 
<script>
$( ".getimagepath" ).click(function(e) {
    var url = $(this).attr('src');
    this.onclick = null;  
    window.opener.CKEDITOR.tools.callFunction(<?php echo $_GET['CKEditorFuncNum']; ?>, url); 
    window.close(); 
}); 
</script>  
</body>  
</html>  