<?php
if (!defined('ABSPATH')) { exit; }
function zenith_news_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
    add_theme_support('custom-logo', array('height' => 80, 'width' => 300, 'flex-width' => true, 'flex-height' => true));
    register_nav_menus(array('primary' => __('School navigation', 'zenith-global-news')));
}
add_action('after_setup_theme', 'zenith_news_setup');
function zenith_news_assets() {
    wp_enqueue_style('zenith-news', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
}
add_action('wp_enqueue_scripts', 'zenith_news_assets');
