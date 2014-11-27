<!DOCTYPE html>

<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width" />
	<title><?php wp_title( ' | ', true, 'right' ); ?></title>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<div id="wrapper" class="hfeed">

		<header id="header" role="banner">

			<div class="search">

				<form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">

					<div class="searchInfo">

						<label class="sr-only" for="s">Search</label>

						<br /><input type="text" value="" name="s" id="s" />

						<input type="submit" id="searchsubmit" value="Search" />

					</div>

				</form>

			</div>

			<nav class="navbar navbar-default" role="navigation">

				<div class="container-fluid">

					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="<?php echo home_url(); ?>">
							<?php bloginfo('name'); ?>
						</a>
					</div>

					<?php
						wp_nav_menu( array(
							'menu'              => 'primary',
							'theme_location'    => 'primary',
							'depth'             => 2,
							'container'         => 'div',
							'container_class'   => 'collapse navbar-collapse',
							'container_id'      => 'bs-example-navbar-collapse-1',
							'menu_class'        => 'nav navbar-nav',
							'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
							'walker'            => new wp_bootstrap_navwalker())
						);
					?>

				</div>

			</nav>

		</header>
