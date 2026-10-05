<?php get_header(); while (have_posts()) : the_post(); ?>
<article <?php post_class('entry'); ?>><p class="eyebrow"><?php the_category(' · '); ?></p><h1><?php the_title(); ?></h1><p class="meta"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time></p>
<?php if (has_post_thumbnail()) { the_post_thumbnail('large'); } ?><div class="entry-content"><?php the_content(); wp_link_pages(); ?></div><?php the_post_navigation(); ?></article>
<?php endwhile; get_footer(); ?>
