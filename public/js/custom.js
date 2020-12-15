 
/*Search Overlay START*/
$("#hsearch").click(function(){
  $(".search-overlay").addClass("active");
});	

$(".search-overlay_close-icon").click(function(){
  $(".search-overlay").removeClass("active");
});	
/*Search Overlay CLOSE*/




/*Home New Arrival START*/
$('.newarrival-slider').owlCarousel({
    loop:false,
    margin:36,
    nav:true,
    dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
            
        },
        568:{
            items:2,
            margin:20
            
        }, 
        1024:{
            items:3,
            margin:20
            
        },              
        1249:{
            items:4,
            margin:36

            
        }
    }
});
/*Home New Arrival CLOSE*/

/*Home Instagram START*/
$('.instagram-slide').owlCarousel({
    loop:false,
    margin:0,
    nav:true,
    dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:3
            
        },
        768:{
            items:4
            
        },
        1024:{
            items:5
            
        },
        1200:{
            items:7           
            
        }
    }
})
/*Home Instagram CLOSE*/


/*Home Countdown Timer START*/
$(function(){    
    $('#future_date').countdowntimer({
        dateAndTime : dealtimer,
        labelsFormat : true,
        displayFormat : "DHMS"
    });
});
/*Home Countdown Timer CLOSE*/


/*Home Our Product Tab START*/
var $tabs = $('#horizontaltab');
$tabs.responsiveTabs({
    rotate: false,
    startCollapsed: 'accordion',
    collapsible: 'accordion',
    closed: 'accordion',
// setHash: true,

});
var keyvalue = location.hash;
//alert(keyvalue);
if(keyvalue == ''){
            }

$(function(){
$('.r-tabs-accordion-title .r-tabs-anchor').click(function(){
$('html, body').animate({
scrollTop: $( $.attr(this, 'href') ).offset().top}, 500);
});
});
/*Home Our Product Tab CLOSE*/

/*WOW Animation START*/
wow = new WOW(
{
boxClass:     'wow',      // default
animateClass: 'animated', // default
offset:       0,          // default
mobile:       false,       // default
live:         true        // default
}
)
wow.init();
/*WOW Animation CLOSE*/


/*Products Listing Left Filter START*/
$("#sbcategory-head").click(function(){
  $("#sbcategory-content").toggleClass("active");
  $("#sbcategory-head").toggleClass("active");
}); 

$("#sbbrand-head").click(function(){
  $("#sbbrand-content").toggleClass("active");
  $("#sbbrand-head").toggleClass("active");
}); 

$("#sbcolor-head").click(function(){
  $("#sbcolor-content").toggleClass("active");
  $("#sbcolor-head").toggleClass("active");
}); 

$("#sbprice-head").click(function(){
  $("#sbprice-content").toggleClass("active");
  $("#sbprice-head").toggleClass("active");
}); 




onResize = function() {

if ($(window).width() < 1023) {
    $(".sb_filter_toggle").show();
    $(".account_filter_toggle").show();

    $(".sb_filter_toggle").click(function(){
      $(".listing_sidebar").toggleClass("active");
      $(".sb_filter_toggle").toggleClass("active");
    }); 

    $(".account_filter_toggle").click(function(){
      $(".left-colmn").toggleClass("active");
      $(".account_filter_toggle").toggleClass("active");
    });     


}
else {
   $(".sb_filter_toggle").hide();
   $(".listing_sidebar").removeClass("active");

   $(".account_filter_toggle").hide();
   $(".left-colmn").removeClass("active");
}


}

$(document).ready(onResize);
$(window).resize(onResize);


var delay = (function() {
    var timer = 0;
    return function(callback, ms){
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
})();

$(window).resize(function() {
    delay(function(){
        onResize();
    },100)
});
/*Products Listing Left Filter CLOSE*/


/*Product Thumbnails START*/
$('.thumbslider').owlCarousel({
    loop:false,
    margin:15,
    nav:true,
    dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:3,           
            
        },
        768:{
            items:4,           
            
        },         
        1024:{
            items:3,
           
            
        },              
        1249:{
            items:4,
        

            
        }
    }
});
/*Product Thumbnails CLOSE*/


/*Related Products START*/
$('.related-slider').owlCarousel({
    loop:false,
    margin:36,
    nav:true,
    dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
            
        },
        568:{
            items:2,
            margin:20
            
        }, 
        1024:{
            items:3,
            margin:20
            
        },              
        1249:{
            items:4,
            margin:36

            
        }
    }
});
/*Related Products CLOSE*/



/*Product detail Tab START*/
var $tabs = $('#prod_detail_tabs');
$tabs.responsiveTabs({
    rotate: false,
    startCollapsed: 'accordion',
    collapsible: 'accordion',
    closed: 'accordion',
// setHash: true,

});

/*Product detail Tab CLOSE*/


/*Product detail Quantity START*/

function wcqib_refresh_quantity_increments() {
    jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function(a, b) {
        var c = jQuery(b);
        c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
    })
}
String.prototype.getDecimals || (String.prototype.getDecimals = function() {
    var a = this,
        b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function() {
    var a = jQuery(this).closest(".quantity").find(".qty"),
        b = parseFloat(a.val()),
        c = parseFloat(a.attr("max")),
        d = parseFloat(a.attr("min")),
        e = a.attr("step");
    b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});

/*Product detail Quantity CLOSE*/


/*Product detail Write review START*/
$('.pd_writereview').on( "click", '#openreviewlink', function(e){
    $('a[href="#reviews"]').trigger(e.type);
});

/*Product detail Write revie CLOSE*/


/*Checkout page START*/

$(".checkout-customer-login a").click(function(){
  $(".checkout-login-form").addClass("active");
  $(".checkout-customer-login").addClass("disable");
}); 


$("#logincancel").click(function(){
  $(".checkout-login-form").removeClass("active");
  $(".checkout-customer-login").removeClass("disable");
}); 

/*Checkout page CLOSE*/


