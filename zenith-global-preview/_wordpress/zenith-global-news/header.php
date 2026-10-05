<!doctype html>
<html <?php language_attributes(); ?>>
<head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width,initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class(); ?>><?php wp_body_open(); ?>
<a class="skip-link" href="#main"><?php esc_html_e('Skip to content', 'zenith-global-news'); ?></a>
<header><?php if (has_custom_logo()) { the_custom_logo(); } else { ?><a class="brand" href="<?php echo esc_url(home_url('/')); ?>">ZENITH GLOBAL<small>SENIOR SECONDARY SCHOOL</small></a><?php } ?>
<?php if (has_nav_menu('primary')) { wp_nav_menu(array('theme_location' => 'primary', 'container' => 'nav', 'container_aria_label' => 'School navigation', 'depth' => 1)); } ?>
</header><main id="main">
