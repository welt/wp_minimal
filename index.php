<?php get_header(); ?>

<div id="container">

	<div id="content" class="home" role="main">

		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<header>
					<h1><?php the_title(); ?></h1>
				</header>

				<section>
					<?php the_content(); ?>
				</section>

			</article>

		<?php endwhile; endif; ?>

	</div>

</div>

<?php get_footer(); ?>
