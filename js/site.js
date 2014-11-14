 jQuery(document).ready(function($) {
 	//NAVBAR SCRIPT from Alex Cican, Teehan & Lax inspired, modified a bit
 	var previousScroll = 0, //previous Scroll position
 			menuOffset = 60,
 			detachPoint = 500, //point where the menu gets fixed position
 			hideShowOffset = 6; //how much you need to scroll to show/hide the menu

 	$(window).scroll(function() {
 		if (!$('nav').hasClass('expanded')) {
 			var currentScroll = $(this).scrollTop(), //get current scroll position
 					scrollDiff = Math.abs(currentScroll - previousScroll); //calc how fast user scrolls
 			
 			//if scrolled past menu
 			if (currentScroll > menuOffset) {
 				// if scroll past detach point add class to fix
 				if (currentScroll > detachPoint) {
 					if (!$('nav').hasClass('detached'))
 						$('nav').addClass('detached');
 				}

 				// if scrolling faster than hideShow then hide/show menu
 				if (scrollDiff >= hideShowOffset) {
 					if (currentScroll > previousScroll) {
 						//hide menu
 						if (!$('nav').hasClass('invisible'))
 							$('nav').addClass('invisible');

 					} else {
 						//show menu
 						if (!$('nav').hasClass('invisible'))
 							$('nav').removeClass('invisible');
 					}

 				}

 			} else {
 				//only remove detached if user is at top
 				if (currentScroll <= 0) {
 					$('nav').removeClass();
 				}

 			}

 			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
 				$('nav').removeClass('invisible');
 			}

 			//replace previous Scroll with current one
 			previousScroll = currentScroll;
 		}
 	})

 	//show hide popover if class is expanded
 	$('.menu-icon').on('click touchstart', function(event) {
 		showHideNav();
 		event.preventDefault();
 	})

 	//prevent nav from closing when clicking anywhere
 	$('.menu-icon').on('click touchstart', function(event) {
 		event.stopPropagation();
 	})

 	// check if nav popover is shown
 	function showHideNav() {
 		if ($('nav').hasClass('expanded')) {
 			hideNav();
 		} else {
 			showNav();
 		}
 	}

 	//show popover
 	function showNav() {
 		$('nav').removeClass('invisible').addClass('expanded');
 		//$(.container).addClass('blurred');

 		window.setTimeout(function() {
 			$('body').addClass('no_scroll');
 		}, 200); //Firefox hack Hide scrollbar as soon as menu animation is done

 		//Select links via tab
 		//$('.navigation a').attr('tabindex', '');
 	}

 	//hide popover
 	function hideNav() {
 		//$('.container').removeClass('blurred');

 		window.setTimeout(function() {
 			$('body').removeClass();
 		}, 10); //allow animation to start before removing class in firefox

 		$('nav').removeClass('expanded');
 		$('.navigation a').attr('tabindex', '-1'); //disable tab selection
 		$('icon').blur(); //deselect icon when nav is hidden
 	}

 	//keyboard shortcuts
 	$('body').keydown(function(e) {
 		if($('nav .icon').is(':focus')) {
 			if (e.keyCode === 13 || e.keyCode === 32) {
 				showHideNav();
 				e.preventDefault();
 			}
 		}
 		if (e.keyCode === 27 || e.keyCode === 77) {
 			showHideNav();
 			e.preventDefault();
 		}
 	})

});