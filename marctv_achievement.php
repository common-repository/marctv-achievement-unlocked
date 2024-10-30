<?php
/*
  Plugin Name: MarcTV "Achievement unlocked!"
  Plugin URI: http://www.marctv.de/blog/2010/08/25/marctv-wordpress-plugins/
  Description: Displays an achievement message at the bottom of an article. How-to: Create a custom field called "achievement" with your desired text. Additional credits to Happyworm for the <a href="http://www.happyworm.com/jquery/jplayer/">jPlayer</a> and Major Nelson <a href="http://majornelson.com/archive/2007/03/15/download-the-achivement-unlocked-sound.aspx">for sharing the achievement sound fx</a>
  Version: 1.7.4
  Author: Marc Tönsing
  Author URI: http://www.marctv.de
  License: GPL2
 */

// enqueue stylesheet for individual styled articles
function post_add_script() {
    global $wp_query;
    $this_post = $wp_query->get_queried_object();
    if (is_single($this_post)) {
        $id = $this_post->ID;

        if (function_exists('get_post_meta') && get_post_meta($id, 'achievement', true) != '') {
            wp_enqueue_style('marctv-achievement', WP_PLUGIN_URL . "/marctv-achievement-unlocked/marctv_achievement.css", array(), false);

            wp_enqueue_script("jplayer",
                    WP_PLUGIN_URL . "/marctv-achievement-unlocked/jquery.jplayer.min.js",
                    array("jquery"), "", 0);

            wp_enqueue_script("marctv-achievement",
                    WP_PLUGIN_URL . "/marctv-achievement-unlocked/marctv_achievement.js",
                    array("jquery", "jplayer"), "", 0);
        }
    }
}

function marctv_add_achievement_text() {
    global $wp_query;
    $this_post = $wp_query->get_queried_object();
    if (is_single($this_post)) {
        $id = $this_post->ID;
        if (function_exists('get_post_meta') && get_post_meta($id, 'achievement', true) != '') {
            $achievement_text = get_post_meta($id, 'achievement', true);
            echo "<!-- added by MarcTV Achievement Plugin -->\n<script type='text/javascript'>\n
             (function ($) {
                $(document).ready(function($) {
                    $.fn.achievement_init('" . $achievement_text . "', '" . WP_PLUGIN_URL . "');
                    $.fn.achievement_custom('10G - You have reached the bottom!','#footer');
                });
              })(jQuery);
                \n</script>\n";
        }
    }
}

add_action('wp_print_styles', 'post_add_script');
add_action('wp_footer', 'marctv_add_achievement_text', 1);

?>