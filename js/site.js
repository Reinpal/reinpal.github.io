 jQuery(document).ready(function($) {
 	//NAVBAR SCRIPT from Alex Cican, Teehan & Lax inspired, modified a bit
 	var previousScroll = 0, //previous Scroll position
 			menuOffset = 54,
 			detachPoint = 650, //point where the menu gets fixed position
 			hideShowOffset = 6; //how much you need to scroll to show/hide the menu

 	$(window).scroll(function() {
 		if (!$('nav').hasClass('nav--is-expanded')) {
 			var currentScroll = $(this).scrollTop(), //get current scroll position
 					scrollDiff = Math.abs(currentScroll - previousScroll); //calc how fast user scrolls
 			
 			//if scrolled past menu
 			if (currentScroll > menuOffset) {
 				// if scroll past detach point add class to fix
 				if (currentScroll > detachPoint) {
 					if (!$('nav').hasClass('nav--is-detached'))
 						$('nav').addClass('nav--is-detached');
 				}

 				// if scrolling faster than hideShow then hide/show menu
 				if (scrollDiff >= hideShowOffset) {
 					if (currentScroll > previousScroll) {
 						//hide menu
 						if (!$('nav').hasClass('nav--is-invisible'))
 							$('nav').addClass('nav--is-invisible');

 					} else {
 						//show menu
 						if ($('nav').hasClass('nav--is-invisible'))
 							$('nav').removeClass('nav--is-invisible');
 					}

 				}

 			} else {
 				//only remove nav--is-detached if user is at top
 				if (currentScroll <= 0) {
 					$('nav').removeClass('nav--is-invisible nav--is-detached');
 				}

 			}

 			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
 				$('nav').removeClass('nav--is-invisible');
 			}

 			//replace previous Scroll with current one
 			previousScroll = currentScroll;
 		}
 	})

 	//show hide popover if class is nav--is-expanded
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
 		if ($('nav').hasClass('nav--is-expanded')) {
 			hideNav();
 		} else {
 			showNav();
 		}
 	}

 	//show popover
 	function showNav() {
 		$('nav').removeClass('nav--is-invisible').addClass('nav--is-expanded');
 		//$('.page-content').addClass('blurred');

 		window.setTimeout(function() {
 			$('body').addClass('no_scroll');
 		}, 200); //Firefox hack Hide scrollbar as soon as menu animation is done

 		//Select links via tab
 		//$('.navigation a').attr('tabindex', '');
 	}

 	//hide popover
 	function hideNav() {
 		//$('.page-content').removeClass('blurred');

 		window.setTimeout(function() {
 			$('body').removeClass();
 		}, 10); //allow animation to start before removing class in firefox

 		$('nav').removeClass('nav--is-expanded');
 		$('.navigation a').attr('tabindex', '-1'); //disable tab selection
 		$('icon').blur(); //deselect icon when nav is hidden
 	}

 		var anchor = document.querySelectorAll('.menu-icon');
    
    [].forEach.call(anchor, function(anchor){
      var open = false;
      anchor.onclick = function(event){
        event.preventDefault();
        if(!open){
          this.classList.add('close');
          open = true;
        }
        else{
          this.classList.remove('close');
          open = false;
        }
      }
    }); 

    var title = document.getElementsByTagName("title")[0].innerHTML;

    $(window).blur(function(){
      document.title = "Make sure to open this";
    });
    $(window).focus(function(){
      document.title = title;
    });
    // use behance API to get portfolio items
    var apiKey = 'ExD8KWmq7c8iVz2UdVbJKP10BZfbN7zC';
    var userID = 'StefanReinprecht';
    var perPage = 3;

    (function() {
      var behanceProjectAPI = 'http://www.behance.net/v2/users/'+ userID +'/projects?callback=?&api_key='+ apiKey +'&per_page='+ perPage;
      function setPortfolioTemplate() {
        var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
            getTemplate = $('#portfolio-template').html(),
            template = Handlebars.compile(getTemplate),
            result = template(projectData);
        $('#portfolio').html(result);
      };

      if (sessionStorage.getItem('behanceProject')) {
        setPortfolioTemplate();
      } else {
        $.getJSON(behanceProjectAPI, function(project) {
          var data = JSON.stringify(project);
          sessionStorage.setItem('behanceProject', data);
          setPortfolioTemplate();
        });
      };
    })();

});