AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	// loader - run this FIRST and unconditionally. It must not depend on any
	// other plugin succeeding: if a plugin below throws (Stellar in particular
	// is known to error on some mobile browsers), the rest of this script stops
	// executing, which used to leave this full-screen fixed overlay stuck over
	// the page - silently blocking every touch/swipe gesture on mobile.
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	try {
		$(window).stellar({
	    responsive: true,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	} catch (e) {
		console.warn('Stellar parallax failed to init:', e);
	}


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// Scrollax
   try {
   	$.Scrollax();
   } catch (e) {
   	console.warn('Scrollax failed to init:', e);
   }



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

 $(document).ready(function() {
	$('#contact-form').on('submit', function(e) {
		e.preventDefault(); 

		var $form = $(this);
		var $submitBtn = $('#submitBtn');
		var originalHTML = $submitBtn.html();

		 $submitBtn.html('<span class="icon-refresh" style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;"></span> Sending...')
                  .prop('disabled', true);

		var payload = {
			name: $('#name').val(),
			email: $('#email').val(),
			subject: $('#subject').val(),
			message: $('#message').val(),
			_subject: 'Portfolio Contact: ' + $('#subject').val(),
			_captcha: 'false', // Disables FormSubmit's captcha verification page redirection
			_template: 'table' // Formats your notification email inside a clean data grid layout
		};

		// 3. Fire the secure asynchronous background AJAX request
		$.ajax({
			// CRITICAL: Change this email string to your active mailbox address
			url: 'https://formsubmit.co/ajax/bhakti.vagadia@gmail.com',
			method: 'POST',
			contentType: 'application/json',
			accepts: 'application/json',
			data: JSON.stringify(payload),
			success: function(data) {
				// Validate FormSubmit server confirmation return values
				if (data.success === 'true' || data.success === true) {
					$submitBtn.html('<i class="fas fa-check"></i> Sent Successfully!')
							  .css({ 'background': '#00f3ff', 'color': '#080a12' });
					
					$form.trigger("reset"); // Clear the form input elements on success
				}
			},
			error: function(err) {
				console.error('Server endpoint connection failure:', err);
				$submitBtn.html('<i class="fas fa-times"></i> Network Error')
						  .css({ 'background': '#ff003c', 'color': '#ffffff' });
			},
			complete: function() {
				// 4. Run the cooldown timeout handler to restore layout styling parameters
				setTimeout(function() {
					$submitBtn.html(originalHTML)
							  .css({ 'background': '', 'color': '' })
							  .prop('disabled', false);
					$form.trigger("reset");
				}, 4000);
			}
		});
	});
});


})(jQuery);