// SMOOTH SCROLLING SECTIONS

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});


// SPEAKER

var getaudio = $('#player')[0];
/* Get the audio from the player (using the player's ID) */
var mouseovertimer;
/* When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
var audiostatus = 'off';
/* Global variable for the audio's status (off or on). */

$(document).on('mouseenter', '.speaker', function() {
 /* If the mouse hovers over the speaker image for more than 1 second the audio will start playing */
 if (!mouseovertimer) {
   mouseovertimer = window.setTimeout(function() {
     mouseovertimer = null;
     if (!$('.speaker').hasClass("speakerplay")) {
       getaudio.load();
       /* Loads the audio */
       getaudio.play();
       /* Play the audio (starting at the beginning of the track) */
       $('.speaker').addClass('speakerplay');
       return false;
     }
   }, 1000);
 }
});

$(document).on('mouseleave', '.speaker', function() {
 /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
 if (mouseovertimer) {
   window.clearTimeout(mouseovertimer);
   mouseovertimer = null;
 }
});

$(document).on('click touchend', '.speaker', function() {
 if (!$('.speaker').hasClass("speakerplay")) {
   if (audiostatus == 'off') {
     $('.speaker').addClass('speakerplay');
     getaudio.load();
     getaudio.play();
     window.clearTimeout(mouseovertimer);
     audiostatus = 'on';
     return false;
   } else if (audiostatus == 'on') {
     $('.speaker').addClass('speakerplay');
     getaudio.play()
   }
 } else if ($('.speaker').hasClass("speakerplay")) {
   getaudio.pause();
   $('.speaker').removeClass('speakerplay');
   window.clearTimeout(mouseovertimer);
   audiostatus = 'on';
 }
});

$('#player').on('ended', function() {
 $('.speaker').removeClass('speakerplay');
 /*When the audio has finished playing, remove the class speakerplay*/
 audiostatus = 'off';
 /*Set the status back to off*/
});



// LOADER

$(window).load(function() {
	$(".se-pre-con").fadeOut("slow");;
});




