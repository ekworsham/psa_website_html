
<div class="clear"></div>

<div class="container_12" id="footer">
	<a href="/">Home</a> | <a href="/view/commercial">Commercial</a> | <a href="/view/services">Services</a> | <a href="/view/billing">Billing</a> | <a href="/view/estimate">Free Estimate</a> | <a href="/view/estimate">Contact Us</a>
<p>ProScapes of Atlanta | 404-514-6254 |<a href="mailto:proscapesofatl.kw@gmail.com">contact@ProScapesOfAtlanta.com</a>

</div> <!-- END container12 -->

</div> <!-- END container -->

<script>
let bannerSlideIndex = 1;
let bannerAutoPlayTimeout;

function changeBannerSlide(n) {
	clearTimeout(bannerAutoPlayTimeout);
	showBannerSlides(bannerSlideIndex += n);
	startBannerAutoPlay();
}

function currentBannerSlide(n) {
	clearTimeout(bannerAutoPlayTimeout);
	showBannerSlides(bannerSlideIndex = n + 1);
	startBannerAutoPlay();
}

function showBannerSlides(n) {
	let slides = document.getElementsByClassName("banner-slide");
	let dots = document.getElementsByClassName("dot");
	
	if (n > slides.length) { bannerSlideIndex = 1; }
	if (n < 1) { bannerSlideIndex = slides.length; }
	
	for (let i = 0; i < slides.length; i++) {
		slides[i].classList.remove("active");
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active");
	}
	
	slides[bannerSlideIndex - 1].classList.add("active");
	dots[bannerSlideIndex - 1].classList.add("active");
}

function startBannerAutoPlay() {
	bannerAutoPlayTimeout = setTimeout(() => {
		bannerSlideIndex++;
		showBannerSlides(bannerSlideIndex);
		startBannerAutoPlay();
	}, 5000);
}

// Initialize carousel immediately
showBannerSlides(bannerSlideIndex);
startBannerAutoPlay();
</script>

</body>
</html>