import React, { Component } from 'react'

import '../static/css/style.css'
import '../static/css/mediaquery.css'


class Menulinks extends React.Component {
	   
    // Call On call
	componentDidMount () {
		 
	}

	handleClickLink = evt => {
		window.$('.show_hide').trigger('click');
  	}
 
	render () {
	    return (
		    <div>
		      	<ul>
	             	<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/"><a data-hover="Start">Start</a></HeaderLink></li>
					<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/agentur"><a data-hover="AGENTUR">AGENTUR</a></HeaderLink></li>
					<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/leistungen"><a data-hover="LEISTUNGEN">LEISTUNGEN</a></HeaderLink>
	                <ul>
	                 	<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/magento"><a data-hover="Magento">Magento</a></HeaderLink></li>
	                 	{/*<li><HeaderLink activeClassName="active" href="/shopify"><a data-hover="Shopify">Shopify</a></HeaderLink></li>*/}
	                 	<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/shopware"><a data-hover="Shopware">Shopware</a></HeaderLink></li>
	                 	{/*<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/spryker"><a data-hover="Spryker">Spryker</a></HeaderLink></li>*/}
	                </ul>
	                </li>
					{/*<li><HeaderLink activeClassName="active" href="/referenzen"><a data-hover="REFERENZEN">REFERENZEN</a></HeaderLink></li>*/}
					<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/jobs"><a data-hover="JOBS">JOBS</a></HeaderLink></li>
					<li onClick={this.handleClickLink}><HeaderLink activeClassName="active" href="/kontakt"><a data-hover="KONTAKT">KONTAKT</a></HeaderLink></li>
            	</ul>
		    </div> 
	  	)
	} 
}

const Layout = (props , {title="Magecloud" , description="This is default Description !!!" , keywords="This is default Keywords !!!" , className="wrapper" , gtagclassName="display:none;visibility:hidden;"} ) => (
  <div > 
  		  
		<!DOCTYPE html>

		<html lang="en">

		<head>
		  <meta name="viewport" content="width=device-width"/>
		  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		  <title>Ecommerce | React JS</title>
		  <link rel="icon" href="images/favicon.ico" type="image/x-icon">    
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/stylesheet.css"/>
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/mediaquery.css"/>
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/animate.min.css"/>
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/owl.carousel.min.css"/>
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/fontawesome-all-min.css"/>
		  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> 
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/easy-responsive-tabs.css"/>
		  <link rel="stylesheet" href="<%=nodeSiteUrl%>/css/mmenu.css"/>
		  <script type="text/javascript">
		    var dealtimer = '';
		  </script>
		</head>

		<body>

		  <div className="wrapper">
		  <header className="header">
		    <div className="htop-bar">
		      <div className="container-lg">
		        <div className="htop-bar-inner">
		         <div className="left-colmn">         
		          <div className="hcontact-info">
		            <ul>
		              <li className="wow fadeInDown" data-wow-delay="0.1s"><a href="tel:+2123456789"><i className="fas fa-phone-alt"></i>+21 23456789</a></li>
		              <li className="wow fadeInDown" data-wow-delay="0.2s"><a href="mailto:store@domain.com"><i className="far fa-envelope"></i>store@domain.com</a></li>
		            </ul>
		          </div>
		         </div>
		         <div className="right-colmn">
		          <div className="htop-sale-message wow fadeInDown" data-wow-delay="0.2s">Summer sale discount off <span>50%</span>! Shop Now</div>
		         </div>
		        </div>
		      </div>
		    </div>
		    <div className="hmiddle">
		     <div className="container-lg">
		      <div className="hmiddle-inner">
		       <div className="left-colmn">       
		        <div className="hsocial-icon">
		          <ul>
		           <li className="wow fadeInUp" data-wow-delay="0.1s"><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
		           <li className="wow fadeInUp" data-wow-delay="0.2s"><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
		           <li className="wow fadeInUp" data-wow-delay="0.3s"><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
		          </ul>
		        </div>
		       </div> 
		       <div className="middle-colmn">
		        <div className="logo"><a href="index.html"><img src="images/store-logo.png" alt="store.com" title="store.com"> </a></div>
		       </div> 
		       <div className="right-colmn">
		        <div className="hcontent_icons">
		          <ul>
		           <li className="wow fadeInUp" data-wow-delay="0.1s"><a id="hsearch" href="javascript:;"><i className="fas fa-search"></i></a></li>
		           <li className="h-account wow fadeInUp" data-wow-delay="0.2s"><a href="javascript:;"><i className="far fa-user-circle"></i></a>
		            <div className="h-account_flyout">
		              <ul>
		                <li><a href="#">Sign in</a></li>
		                <li><a href="#">Register</a></li>               
		              </ul>
		            </div>
		           </li>
		           <li className="wow fadeInUp" data-wow-delay="0.3s"><a href="javascript:;"><i className="far fa-heart"></i></a></li>
		           <li className="hcartmn wow fadeInUp" data-wow-delay="0.4s">
		             <a href="javascript:;">
		              <div className="hcart-counter">0</div>
		            <i className="fas fa-shopping-cart"></i>
		             </a>
		          </li>
		          </ul>
		        </div>
		        <div className="hamburger-menu wow fadeInUp" data-wow-delay="0.5s"><a href="#my-menu"><i className="fas fa-bars"></i> <i className="fas fa-times"></i></a></div>
		       </div> 
		      </div>
		     </div> 

		    <div className="search-overlay">
		      <button className="search-overlay_close-icon"><i className="fas fa-times"></i></button>
		      <div className="search-overlay_content">
		        <form className="space-mb--20">
		          <input type="search" placeholder="Search Products...">
		        </form>
		      <div className="search-overlay_hint"># Hit enter to search</div>
		      </div>
		    </div>


		    </div>
		    <div className="head-bottom">
		      <div className="container">
		        <div className="head-bottom-inner">
		          <nav className="desktop-navigation">
		            <ul>
		              <li><a href="index.html">Home</a></li>  
		              <li><a href="#">Shop</a>
		                <ul className="sub-menu sub-menu--mega sub-menu--mega--column-5">
		                 <li className="sub-menu--mega__title">
		                  <h2><a href="/">Home Group</a></h2>
		                  <ul className="sub-menu--mega__list">
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                 </li>
		                 <li className="sub-menu--mega__title">
		                  <h2><a href="/">Home Group</a></h2>
		                  <ul className="sub-menu--mega__list">
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                 </li>
		                 <li className="sub-menu--mega__title">
		                  <h2><a href="/">Home Group</a></h2>
		                  <ul className="sub-menu--mega__list">
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                 </li>
		                 <li className="sub-menu--mega__title">
		                  <h2><a href="/">Home Group</a></h2>
		                  <ul className="sub-menu--mega__list">
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                 </li>
		                 <li className="sub-menu--mega__title">
		                  <h2><a href="/">Home Group</a></h2>
		                  <ul className="sub-menu--mega__list">
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                 </li>                                                  
		                </ul>

		              </li>
		              <li><a href="#">Product</a></li>
		              <li><a href="#">Pages</a></li>
		              <li><a href="#">Elements</a></li>
		              <li><a href="#">Accessories</a></li>  
		              <li><a href="#">Sale</a></li>   
		            </ul>
		          </nav>
		          <nav id="my-menu" style="display: none;">
		            <ul>
		              <li><a href="index.html">Home</a></li>  
		              <li><a href="#">Shop</a>
		                <ul>                 
		                  <li><a href="#">Home Group 01</a>
		                <ul>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                   </li>
		                  <li><a href="#">Home Group 02</a>
		                <ul>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                   </li>                                                              
		                  <li><a href="#">Home Group 03</a>
		                <ul>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                   </li>
		                  <li><a href="#">Home Group 04</a>
		                <ul>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                   </li>
		                  <li><a href="#">Home Group 05</a>
		                <ul>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li>
		                   <li><a href="#">Sample Category</a></li> 
		                  </ul>
		                   </li>                                                                    
		                </ul>
		              </li>
		              <li><a href="#">Product</a></li>
		              <li><a href="#">Pages</a></li>
		              <li><a href="#">Elements</a></li>
		              <li><a href="#">Accessories</a></li>  
		              <li><a href="#">Sale</a></li> 
		              <li><a href="#">Login</a></li>
		                <li><a href="#">Register</a></li> 
		            </ul>           
		          </nav>        
		        </div>
		      </div>
		    </div>
		  </header>
		    
		    {props.children}
		</div> 
		
		
		 
     	 <footer className="footer">
		<div className="footer-top">
			<div className="container-lg">
				<div className="footer-wrap">
					<div className="fcolumn1 wow fadeInLeft">
					 <div className="flogo"><a href="index.html"><img src="images/store-logo.png" alt="store.com" title="store.com"></a></div>	
					 <div className="fcontact-info">
					 	<ul>
					 		<li>
					 			<div className="icon"><i className="fas fa-map-marker-alt"></i></div>
					 			<div className="content">
					 				<p>184 Main Rd E, St Albans VIC 3021, Australia</p>
					 			</div>
					 		</li>
					 		<li>
					 			<div className="icon"><i className="far fa-envelope"></i></div>
					 			<div className="content">
					 				<p><a href="mailto:store@domain.com">store@domain.com</a></p>
					 			</div>
					 		</li>
					 		<li>
					 			<div className="icon"><i className="fas fa-phone-alt"></i></div>
					 			<div className="content">
					 				<p><a href="tel:+2123456789">+21 23456789</a></p>
					 			</div>
					 		</li>					 		
					 	</ul>
					 </div>
					 <div className="fsocial">
						<ul>
			 	 		 <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
			 	 		 <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
			 	 		 <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
		 	 			</ul>					 	
					 </div>
					</div>
					<div className="fcolumn2 footer-top-link wow fadeInUp" data-wow-delay="0.1s">
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
					<div className="fcolumn3 footer-top-link wow fadeInUp" data-wow-delay="0.3s">
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
					<div className="fcolumn4 footer-top-link wow fadeInUp" data-wow-delay="0.6s">
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
					<div className="fcolumn5 wow fadeInRight">
						<div className="fnewsletter-mn">
							<p>Subscribe to our newsletter and get 10% off your first purchase</p>

							<div className="fnewsletter-inner">
								<form name="subscribe" id="subscribefrm" action="javascript:void(0)" method="POST" >
								<input type="text" placeholder="Your email address" name="newsletter" id="subscribe_email">
								<span className="error" id="subscribeerror" style="display: none;">Please enter valid email</span>
								<span id="subscribemsg" className="error"></span>
								<input type="submit" value="Subscribe" className="sunscribebtn">
							</form>
							</div>
						</div>
						<div className="fpayment-mn">
							<ul>
								<li><i className="fab fa-cc-visa"></i></li>
								<li><i className="fab fa-cc-paypal"></i></li>
								<li><i className="fab fa-cc-mastercard"></i></li>
								<li><i className="fab fa-cc-amex"></i></li>
								<li><i className="fab fa-cc-discover"></i></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="footer-bottom">
			<div className="container-lg">
				<div className="footer-wrap">					
					<div className="footer-link">
						<ul>
							<li className="wow fadeIn" data-wow-delay="0.1s"><a href="#">Blog</a></li>
							<li className="wow fadeIn" data-wow-delay="0.3s"><a href="#">Contact Us</a></li>
							<li className="wow fadeIn" data-wow-delay="0.6s"><a href="#">About Us</a></li>
							<li className="wow fadeIn" data-wow-delay="0.9s"><a href="#">Shop</a></li>							
						</ul>
					</div>
					<div className="copyright-txt wow fadeIn" data-wow-delay="0.1s"><p>Copyright &copy; 2020 Store. All rights reserved.</p></div>
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
      $(".sunscribebtn").html('<i className="glyphicon glyphicon-repeat fast-right-spinner"></i> Processing...');
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




      	
  	</div>
)

export default Layout
