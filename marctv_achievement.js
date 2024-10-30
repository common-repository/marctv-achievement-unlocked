/*
  Plugin Name: MarcTV "Achievement unlocked!"
  Plugin URI: http://www.marctv.de
  Description: Displays an achievement message at the bottom of an article. How-to: Create a custom field called "achievement" with your desired text. Additional credits to Happyworm for the <a href="http://www.happyworm.com/jquery/jplayer/">jPlayer</a> and Major Nelson  <a href="http://majornelson.com/archive/2007/03/15/download-the-achivement-unlocked-sound.aspx">for distribution of the achievement sound fx</a>
  Version: 1.7
  Author: Marc Tönsing
  Author URI: http://www.marctv.de
  License: GPL v2 - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */
(function($) {

    $.fn.achievement_init = function(msg,pluginpath)
    {
        $('body').append('<div id=\"achievement\"><div><span></span></div></div>');
        $('body').append('<div id=\"achievement_sound\"></div>');
        $('#achievement_sound').jPlayer({
            ready: function () {
                this.element.jPlayer('setFile', pluginpath + '/marctv-achievement-unlocked/pling.mp3', pluginpath + '/marctv-achievement-unlocked/pling.ogg').achievement(msg);
            },
            volume: 50,
            oggSupport: true,
            nativeSupport: true,
            preload: 'none'
        });
       
    };

    $.fn.achievement_custom = function (mgs, elem){
        var mrstop;
        $(window).scroll(function () {
            if($.fn.isScrolledIntoView('#footer') && mrstop!=elem){
                mrstop = elem;
                if($.queue( $("#achievement div")[0], "fx").length>0){
                    $.queue( $("#achievement div")[0], "fx", function () {
                        $.fn.achievement(mgs);
                        $.dequeue( this );
                    });
                }else{
                    $.fn.achievement(mgs);
                }
            }
        });
    };

    $.fn.isScrolledIntoView = function (elem){
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
    };

    $.fn.achievement = function (msg){
        $('#achievement div span').html(msg);
        $("#achievement_sound").jPlayer("play");
        $('#achievement div').animate({
            'background-position': '48% -60px',
            opacity: '+=0'
        }, 1000).animate({
            'background-position': '48% -60px',
            bottom: '10px',
            opacity: '1'
        }, 1000).animate({
            'background-position': '48% -60px'
        }, 500).animate({
            'background-position': '48% 0px'
        }, 500).animate({
            'background-position': '48% -60px'
        }, 500).animate({
            'background-position': '48% 0px'
        }, 500).animate({
            'background-position': '48% -60px'
        }, 500).animate({
            'background-position': '48% 0px'
        }, 500).animate({
            'background-position': '48% -60px'
        }, 500).animate({
            'background-position': '48% 0px'
        }, 500).animate({
            'background-position': '48% -60px'
        }, 500).animate({
            'background-position': '48% 0px'
        }, 500).animate({
            'background-position': '48% -60px'
        }, 500).animate({
            'background-position': '48%  0px'
        }, 500).animate({
            'background-position': '48% -60px',
            bottom: '-100px',
            opacity: '0'
        }, 2000);
    };
})(jQuery);