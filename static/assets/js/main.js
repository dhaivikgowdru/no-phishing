/**
* Template Name: Bikin - v2.2.1
* Template URL: https://bootstrapmade.com/bikin-free-simple-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
	scroll: false,
    dots: true,
	slideBy: 1,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });
})(jQuery);

/**
 * Toggles the 'dark-mode' class on the body and saves the preference to local storage.
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save the user's preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        document.getElementById('mode-toggle').textContent = 'Switch to Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        document.getElementById('mode-toggle').textContent = 'Switch to Dark Mode';
    }
}

/**
 * Checks local storage for the saved dark mode preference when the page loads.
 */
function checkDarkMode() {
    const modeToggleBtn = document.getElementById('mode-toggle');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        // Update button text to reflect current state
        if (modeToggleBtn) {
            modeToggleBtn.textContent = 'Switch to Light Mode';
        }
    } else {
        // Default to Light Mode (no class)
        if (modeToggleBtn) {
            modeToggleBtn.textContent = 'Switch to Dark Mode';
        }
    }
}
// Define the paths for both images at the top of your script
const LIGHT_MODE_IMAGE = 'static/assets/img/Phishing.gif'; // Your original light mode GIF
// *** IMPORTANT: Update this path to where you saved the dark mode PNG ***
const DARK_MODE_IMAGE = 'static/assets/img/Phishing-dark.png'; // The dark mode PNG I generated

/**
 * Toggles the 'dark-mode' class on the body, saves the preference, and swaps the image.
 */
function toggleDarkMode() {
    const body = document.body;
    const modeToggleBtn = document.getElementById('mode-toggle');
    const heroImage = document.getElementById('hero-image'); // Get the image by its ID

    body.classList.toggle('dark-mode');

    // Save the user's preference and update content
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        
        if (modeToggleBtn) {
            modeToggleBtn.textContent = 'Switch to Light Mode';
        }
        if (heroImage) {
             // Switch to dark mode image
            heroImage.src = DARK_MODE_IMAGE; 
        }

    } else {
        localStorage.setItem('darkMode', 'disabled');

        if (modeToggleBtn) {
            modeToggleBtn.textContent = 'Switch to Dark Mode';
        }
        if (heroImage) {
            // Switch back to light mode image
            heroImage.src = LIGHT_MODE_IMAGE; 
        }
    }
}

/**
 * Checks local storage for the saved dark mode preference when the page loads
 * and sets the correct theme and image.
 */
function checkDarkMode() {
    const modeToggleBtn = document.getElementById('mode-toggle');
    const heroImage = document.getElementById('hero-image'); // Get the image by its ID
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        
        // Update button and image for Dark Mode
        if (modeToggleBtn) {
            modeToggleBtn.textContent = 'Switch to Light Mode';
        }
        if (heroImage) {
            heroImage.src = DARK_MODE_IMAGE;
        }

    } else {
        // Default to Light Mode (no class needed)
        document.body.classList.remove('dark-mode'); // Ensure class is removed if disabled
        
        // Update button and image for Light Mode
        if (modeToggleBtn) {
            modeToggleBtn.textContent = 'Switch to Dark Mode';
        }
        if (heroImage) {
            heroImage.src = LIGHT_MODE_IMAGE;
        }
    }
}

// Optional: Add basic error handling if elements aren't found (good practice)
document.addEventListener('DOMContentLoaded', () => {
    // Call checkDarkMode after the DOM is fully loaded to ensure elements exist
    checkDarkMode(); 

    // You can also add checks inside the functions like:
    // const heroImage = document.getElementById('hero-image');
    // if (!heroImage) {
    //     console.error("Hero image element not found!");
    //     return; 
    // }
    // ... rest of the code ...
});