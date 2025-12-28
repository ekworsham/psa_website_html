<?php include 'view/layouts/header.php'; ?>

<div class="clear"></div>
<div class="container_12">
	<div class="grid_9" id="banner_container">
		<div id="photo_banner">
			<div class="banner-slide active">
				<img src="/public/images/CollinsFront.JPEG" alt="Collins Front" />
			</div>
			<div class="banner-slide">
				<img src="/public/images/CollinsInstall.JPEG" alt="Collins Install" />
			</div>
			<div class="banner-slide">
				<img src="/public/images/CollinsIrr.JPEG" alt="Collins Irrigation" />
			</div>
			<div class="banner-slide">
				<img src="/public/images/background.jpg" alt="Background" />
			</div>
			<div class="banner-slide">
				<img src="/public/images/flowers3.JPEG" alt="Flowers" />
			</div>
			<button class="banner-prev" onclick="changeBannerSlide(-1)">❮</button>
			<button class="banner-next" onclick="changeBannerSlide(1)">❯</button>
			<div class="banner-dots">
				<span class="dot active" onclick="currentBannerSlide(0)"></span>
				<span class="dot" onclick="currentBannerSlide(1)"></span>
				<span class="dot" onclick="currentBannerSlide(2)"></span>
				<span class="dot" onclick="currentBannerSlide(3)"></span>
				<span class="dot" onclick="currentBannerSlide(4)"></span>
			</div>
		</div>
	</div>
</div> <!-- END container12 -->

<div class="clear"></div>
<div class="container_12">
	<div class="grid_9" id="content_box">
		<div id="content">
			<h2>Welcome to ProScapes</h2>
			<p style="text-align:left;font-weight:bold;font-size:1.2em;margin-bottom:5px;">Misson Statement</p>
			<p style="text-align:left;">At ProScapes of Atlanta, our mission is to enhance, protect, and elevate the value of HOA, commercial, and mixed-use communities through consistent, professional landscape management. We are committed to treating every property as if it were our own—delivering dependable service, clear communication, and disciplined execution on every visit.</p>
			
		</div>
	</div>
</div> <!-- END container12 -->

<div class="clear"></div>
<div class="container_12">
	<div class="grid_3">&nbsp;</div>
	<div class="grid_9" id="content_box_commercial">
		<div id="content">
			<a href="view/services"><h2 class="services_1">Looking for Landscape Services?</h2>
			<p>Proscapes of Atlanta Commercial Services specializes in Office, Industrial, Retail, HOA, and Hotel landscape needs.</p></a>
		</div>
	</div>
</div> <!-- END container12 -->

<?php include 'view/layouts/footer.php'; ?>
