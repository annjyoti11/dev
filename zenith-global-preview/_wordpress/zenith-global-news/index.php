<?php get_header(); ?>
<section class="intro"><p class="eyebrow">Life at Zenith</p><h1><?php if (is_search()) { printf(esc_html__('Search: %s', 'zenith-global-news'), esc_html(get_search_query())); } elseif (is_archive()) { the_archive_title(); } else { esc_html_e('News & stories', 'zenith-global-news'); } ?></h1><p>Ideas, discoveries and moments from our school community.</p></section>
<?php if (have_posts()) : ?><div class="grid"><?php while (have_posts()) : the_post(); ?>
<article <?php post_class('card'); ?>><?php if (has_post_thumbnail()) : ?><a href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true"><?php the_post_thumbnail('large'); ?></a><?php endif; ?>
<p class="meta"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time></p><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article>
<?php endwhile; ?></div><?php the_posts_pagination(); else : ?><p>No stories have been published here yet.</p><?php get_search_form(); endif; ?>
<?php get_footer(); ?>
