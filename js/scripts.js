$(document).ready(function($) {
	"use strict";
	/*global google:false, $:false, Fresco:false, alert:false */
	var address = "Los Angeles, California";
	var marker1 = new google.maps.MarkerImage(
             "css/images/marker-1.png",
             new google.maps.Size(34,49),
             new google.maps.Point(0,0),
             new google.maps.Point(13,42)
             );
             var geocoder = new google.maps.Geocoder();
             var lati = null;
             var longi = null;
             geocoder.geocode( { 'address': address }, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						lati = results[0].geometry.location.lat();
						longi = results[0].geometry.location.lng();
					}
				});
	$("#fixedratio_h2_6").gmap3({
        getlatlng: {
			address: address,
			callback: function(results){
				if ( !results ) { return; }
				$(this).gmap3({
					marker: {
						latLng: results[0].geometry.location,
						options: { draggable: false, icon: marker1 },
					}, 
					map: {
						options: {
							navigationControl: false,
							streetViewControl: false,
							mapTypeControl: true,
							panControl: false,
							zoomControl: false,
							center: results[0].geometry.location,
							zoom: 14,
							scrollwheel: false
						}
					}
				});
			}
		}
    });
	$('#faqs_content li, #position_content li').hide();
	$('#faqs_content li.faq_1, #position_content li.position_1').fadeIn(1000);
	$('#faqs_title li a').on("click", function(e) {
		e.preventDefault();
		var id = this.id;
		$('#faqs_content li').hide();
		$('#faqs_content li.'+id).fadeIn(1000);
		$('#faqs_title li a').removeClass('active');
		$('#faqs_title li a#'+id).addClass("active");
	});

	$('#position_title li a').on("click", function(e) {
		e.preventDefault();
		var id = this.id;
		$('#position_content li').hide();
		$('#position_content li.'+id).fadeIn(1000);
		$('#position_title li a').removeClass('active');
		$('#position_title li a#'+id).addClass("active");
	});
	
	
	$('ul.navigation li').localScroll( { duration: 1000, easing: 'easeInOutExpo' } );
	$('ul.nav li a').click(function() {
		$('ul.nav li').removeClass('current');
		$(this).parent().addClass('current');
	});
	$("#navbar_menu_fixed").sticky({topSpacing:0});

	$("#clients_slider").flexslider({
		animation: "slide",
		easing: "swing",
		useCSS: false,
		animationLoop: true,
		itemWidth: 0,
		itemMargin: 0,
		minItems: 1,
		maxItems: 2, 
		keyboard: true,
		controlNav: false,
		slideshowSpeed: 10000, 
		animationSpeed: 500, 
		directionNav: false,
		pauseOnAction: false,
		slideshow: true,
		startAt: 0,
		start:function() {
			$("#next").addClass("active");
		}, 
		after: function(slider) {
			if(slider.currentSlide === 0) {
				$("#previous").removeClass("active");
				if((slider.count - 1) > 0) {
					$("#next").addClass("active");
				}
			} else {
				$("#previous").addClass("active");
				if((slider.count - 1) !== slider.currentSlide) {
					$("#next").addClass("active");
				} else {
					$("#next").removeClass("active");
				}
			}
			
		}
	});

	$('#flexi_next').click(function(e) {
		e.preventDefault();
		$('#clients_slider').flexslider("next");
	});
	$('#flexi_prev').click(function(e) {
		e.preventDefault();
		$('#clients_slider').flexslider("prev");
	});
	
	$('#email_subscribe').val('');

	$('.theme_col').mouseenter(function() {
		var this_id = $(this).find('.hover_overlay').attr('id');
		$('#'+this_id).css({ "z-index": "90" });
		$(this).css({ "cursor" : "pointer" });
	}).mouseleave(function() {
		var this_id = $(this).find('.hover_overlay').attr('id');
		$('.hover_overlay').css({ "z-index": "100" });
		checkEmailSubscribeFieldIsEmpty(this_id);
	});

	$("a.tooltip_top").tooltip();

	function checkEmailSubscribeFieldIsEmpty(this_id) {
		var email_subscribe = $('#email_subscribe').val();
		if(typeof email_subscribe !== 'undefined' && email_subscribe !== '') {
			$('#'+this_id).css({ "z-index": "90" });
		} else {
			$('.hover_overlay').css({ "z-index": "100" });
		}
	}

	$('.fixedratio_h1').parallax("50%", 0.3);
	$('#navigation').onePageNav({
		begin: function() {
		},
		end: function() {
		},
		scrollOffset: 0
	});
	$('#youtube').bind('click', function(e) {
		e.preventDefault();
		Fresco.show(['http://vimeo.com/88221887']);
	});
	$(window).resize(function() {
		resizeBanner();
	});
	function resizeBanner() {
		$('#page .theme_col').each(function() {
			var h1_height = $(this).height();
			var h1_height_sub = $(this).find('.abs_heading_text').height();
			var h1_mtop_1 = (h1_height + h1_height_sub) / 2;
			$(this).find('.abs_heading_text').css({ "margin-top" : "-"+h1_mtop_1+"px" });
			var t=0;
			var t_elem;
			$(".page_content h3").each(function () {
				var column_heading = $(this);
				if ( column_heading.height() > t ) {
					t_elem=this;
					t=column_heading.height();
				}
			});
			$('.page_content h3').css({ 'height': t+'px' });
		});
	}
	$(window).load(function() {
		resizeBanner();
	});
	$(window).resize(function() {
		resizeBanner();
	});
	$('#contactForm').validate({
		rules: {
			contact_name : {
				required: true
			}, 
			contact_email : {
				email: true,
				required: true
			}, 
			contact_subject : {
				required: true
			}, 
			contact_message : {
				required: true
			}
		},
		submitHandler: function() {
			var con_name = $('#contact_name').val();
			var con_email = $('#contact_email').val();
			var con_subject = $('#contact_subject').val();
			var con_message = $('#contact_message').val();
			$.ajax({ 
				type: 'POST',
				data: { action : 'sendEmail', contact_name: con_name, contact_email : con_email, contact_message: con_message, contact_subject : con_subject },
				url: '../inc/ajax.php',
				beforeSend: function() {
					$('#request_results').html('<img src="../css/images/ajax-loader.gif" alt="loading" />');
				},
				success: function(data) {
					if(data.success) {
						$('#request_results').html('<span style="color: #0041ba;">Request Sent!</span>');
						setTimeout( function() {
							$('#request_results span').fadeOut('slow');
						}, 5000);
					}
				}
			});
		}
	});
	$("#emailSubscribeForm").validate({
		rules: {
			email_subscribe : {
				email: true,
				required: true
			}
		},
		submitHandler: function() {
			var email_subscribe = $('#email_subscribe').val();
			$.ajax({ 
				type: 'POST',
				data: { action : 'signUpForDemo', email_subscribe : email_subscribe },
				url: '../inc/ajax.php',
				beforeSend: function() {
					// $('#signupResults').html('<img src="../css/images/ajax-loader.gif" alt="loading" />');
				},
				success: function(data) {
					if(data.success) {
						/*$('#signupResults').html('<span style="color: #0041ba;">Request Sent!</span>');
						setTimeout( function() {
							$('#signupResults span').fadeOut('slow');
						}, 5000);*/
						alert("Request sent!");
					}
				}
			});
			return false;
		}
	});
});
$(window).load(function() {
	"use strict";
	$('#page .theme_col').each(function() {
		var h1_height = $(this).height();
		var h1_height_sub = $(this).find('.abs_heading_text').height();
		var h1_mtop_1 = (h1_height + h1_height_sub) / 2;
		$(this).find('.abs_heading_text').css({ "margin-top" : "-"+h1_mtop_1+"px" });
		var t=0;
		var t_elem;
		$(".page_content h3").each(function () {
			var column_heading = $(this);
			if ( column_heading.height() > t ) {
				t_elem=this;
				t=column_heading.height();
			}
		});
		$('.page_content h3').css({ 'height': t+'px' });
	});

});
$(window).scroll(function () {
    $('[id^="box1"]').each(function () {
        if (($(this).offset().top - $(window).scrollTop())  <240) {
            $(this).stop().fadeTo(100, 0);
        } else {
            $(this).stop().fadeTo('fast', 40);
        }
    });
});

