<footer class="footer">
		<div class="footer-top">
			<div class="container-lg">
				<div class="footer-wrap">
					<div class="fcolumn1 wow fadeInLeft">
					 <div class="flogo"><a href="index.html"><img src="images/store-logo.png" alt="store.com" title="store.com"></a></div>	
					 <div class="fcontact-info">
					 	<ul>
					 		<li>
					 			<div class="icon"><i class="fas fa-map-marker-alt"></i></div>
					 			<div class="content">
					 				<p>184 Main Rd E, St Albans VIC 3021, Australia</p>
					 			</div>
					 		</li>
					 		<li>
					 			<div class="icon"><i class="far fa-envelope"></i></div>
					 			<div class="content">
					 				<p><a href="mailto:store@domain.com">store@domain.com</a></p>
					 			</div>
					 		</li>
					 		<li>
					 			<div class="icon"><i class="fas fa-phone-alt"></i></div>
					 			<div class="content">
					 				<p><a href="tel:+2123456789">+21 23456789</a></p>
					 			</div>
					 		</li>					 		
					 	</ul>
					 </div>
					 <div class="fsocial">
						<ul>
			 	 		 <li><a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
			 	 		 <li><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
			 	 		 <li><a href="#" target="_blank"><i class="fab fa-instagram"></i></a></li>
		 	 			</ul>					 	
					 </div>
					</div>
					<div class="fcolumn2 footer-top-link wow fadeInUp" data-wow-delay="0.1s">
						<h6>Categories</h6>
						<ul>
							<li><a href="#">Men</a></li>
							<li><a href="#">Women</a></li>
							<li><a href="#">Accessories</a></li>
							<li><a href="#">Shoes</a></li>
							<li><a href="#">Denim</a></li>
							<li><a href="#">Dress</a></li>							
						</ul>
					</div>
					<div class="fcolumn3 footer-top-link wow fadeInUp" data-wow-delay="0.3s">
						<h6>Infomation</h6>
						<ul>
							<li><a href="#">About Us</a></li>
							<li><a href="#">Contact Us</a></li>
							<li><a href="#">Terms & Conditions</a></li>
							<li><a href="#">Returns & Exchanges</a></li>
							<li><a href="#">Shipping & Delivery</a></li>
							<li><a href="#">Privacy Policy</a></li>							
						</ul>						
					</div>
					<div class="fcolumn4 footer-top-link wow fadeInUp" data-wow-delay="0.6s">
						<h6>Quick Links</h6>
						<ul>
							<li><a href="#">Store Location</a></li>
							<li><a href="#">My Account</a></li>
							<li><a href="#">Accessories</a></li>
							<li><a href="#">Orders Tracking</a></li>
							<li><a href="#">Size Guide</a></li>
							<li><a href="#">FAQs</a></li>							
						</ul>
					</div>
					<div class="fcolumn5 wow fadeInRight">
						<div class="fnewsletter-mn">
							<p>Subscribe to our newsletter and get 10% off your first purchase</p>

							<div class="fnewsletter-inner">
								<form name="subscribe" id="subscribefrm" action="javascript:void(0)" method="POST" >
								<input type="text" placeholder="Your email address" name="newsletter" id="subscribe_email">
								<span class="error" id="subscribeerror" style="display: none;">Please enter valid email</span>
								<span id="subscribemsg" class="error"></span>
								<input type="submit" value="Subscribe" class="sunscribebtn">
							</form>
							</div>
						</div>
						<div class="fpayment-mn">
							<ul>
								<li><i class="fab fa-cc-visa"></i></li>
								<li><i class="fab fa-cc-paypal"></i></li>
								<li><i class="fab fa-cc-mastercard"></i></li>
								<li><i class="fab fa-cc-amex"></i></li>
								<li><i class="fab fa-cc-discover"></i></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container-lg">
				<div class="footer-wrap">					
					<div class="footer-link">
						<ul>
							<li class="wow fadeIn" data-wow-delay="0.1s"><a href="#">Blog</a></li>
							<li class="wow fadeIn" data-wow-delay="0.3s"><a href="#">Contact Us</a></li>
							<li class="wow fadeIn" data-wow-delay="0.6s"><a href="#">About Us</a></li>
							<li class="wow fadeIn" data-wow-delay="0.9s"><a href="#">Shop</a></li>							
						</ul>
					</div>
					<div class="copyright-txt wow fadeIn" data-wow-delay="0.1s"><p>Copyright &copy; 2020 Store. All rights reserved.</p></div>
				</div>
			</div>
		</div>
	</footer>
</div>
<script src="<%=nodeSiteUrl%>/js/jquery-2.2.4.min.js"></script>
<script src="<%=nodeSiteUrl%>/js/owl.carousel.min.js"></script>
<script src="<%=nodeSiteUrl%>/js/jquery.countdowntimer.min.js"></script>
<script src="<%=nodeSiteUrl%>/js/jquery.responsiveTabs.js"></script>
<script src="<%=nodeSiteUrl%>/js/mmenu.js"></script>
<script src="<%=nodeSiteUrl%>/js/wow.min.js"></script>
<script src="<%=nodeSiteUrl%>/js/custom.js"></script>

<script type="text/javascript">
/*Mobile Menu START*/
document.addEventListener(
    "DOMContentLoaded", () => {
        new Mmenu( "#my-menu", {
           "extensions": [
              "pagedim-black",
              "position-right",
              "theme-dark"
           ],
           "navbars": [
              {
                 "position": "bottom",
                 "content": [
                    "<a class='fab fa-facebook-f' href='#/'></a>",
                    "<a class='fab fa-twitter' href='#/'></a>",
                    "<a class='fab fa-instagram' href='#/'></a>"
                 ]
              }
           ]
        });
    }
);
/*Mobile Menu CLOSE*/  
</script>
<script type="text/javascript">
var BASE_URL = '<%=nodeSiteUrl%>';
 
$(document).on('keyup', '#subscribe_email',function(){
   $('#subscribemsg').html('');
    $('#subscribeerror').css({"display": "none"});
    $email = $('#subscribe_email').val();
    if($email!='' && ValidateEmail($email)){
        $('#subscribeerror').css({"display": "none"});
        return true;      
    }else{
      if($email!=''){
         $('#subscribeerror').css({"display": "block"});
          return false;
      }
      return true;    
    }
});
$(document).on('click', '.sunscribebtn',function(){
	var buttonht = $(this);
  $('#subscribemsg').html('');
  $('#subscribeerror').css({"display": "none"});
  $email = $('#subscribe_email').val();

  if($email!='' && ValidateEmail($email)){
      $('#subscribeerror').css({"display": "none"});
      $(".sunscribebtn").html('<i class="glyphicon glyphicon-repeat fast-right-spinner"></i> Processing...');
      $('.sunscribebtn').addClass('disabled');
      $('.sunscribebtn').attr('disabled','disabled');
      $( "#subscribemsg" ).removeClass();
      $( "#subscribemsg" ).removeAttr("style");
      buttonht.val('Processing...')
      $.ajax({
        type: "POST",
        url: BASE_URL + "/newsletter",
        data: $('#subscribefrm').serialize(),
        dataType:"json",
        success: function(data) {
          if(data.status=='200'){
            $("#subscribemsg").addClass("successmsg");
            $('#subscribemsg').html(data.message); 
            $('#subscribemsg').css({"display": "block","position":"absolute", "bottom":"49px","float":"left","width":"100%","font-size":"13px","text-align":"left", "color":"green"});
          }
          if(data.status=='201'){
            $("#subscribemsg").addClass("error");
            $('#subscribemsg').html(data.message); 
            $('#subscribemsg').css({"display": "block"});
          } 
          buttonht.val('Subscribe')
          $(".sunscribebtn").html('subscribe');
          $('.sunscribebtn').removeClass('disabled');
          $('.sunscribebtn').removeAttr('disabled');
        }
      });
      return false;  
  }else{
    $('#subscribeerror').css({"display": "block"});
    return false;
  } 
});
function ValidateEmail(email){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(mailformat)){
    return true;
  }
  return false;
}
</script>
</body>
</html>

