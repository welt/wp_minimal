<?php get_header(); ?>
<section id="content" role="main">
	<?php if ( have_posts() ) : ?>
		<header class="header">
			<h1 class="entry-title"><?php printf( 'Search Results for: %s' ), get_search_query() ); ?></h1>
		</header>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php the_excerpt(); ?>
		<?php endwhile; ?>
	<?php else : ?>
		<article id="post-0" class="post no-results not-found">
			<header class="header">
				<h2 class="entry-title">Nothing found</h2>
			</header>
			<section class="entry-content">
				<p>Sorry, nothing matched your search. Please try again.</p>
				<?php get_search_form(); ?>
			</section>
		</article>
	<?php endif; ?>
</section>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
