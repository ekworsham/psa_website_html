// Banner carousel functionality (scoped and guarded to prevent re-declaration)
(function(){
	if (window.__bannerInitDone) { return; }
	window.__bannerInitDone = true;

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
		const slides = document.getElementsByClassName("banner-slide");
		const dots = document.getElementsByClassName("dot");

		if (!slides || slides.length === 0) { return; }

		if (n > slides.length) { bannerSlideIndex = 1; }
		if (n < 1) { bannerSlideIndex = slides.length; }

		for (let i = 0; i < slides.length; i++) {
			slides[i].classList.remove("active");
		}
		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove("active");
		}

		slides[bannerSlideIndex - 1].classList.add("active");
		if (dots && dots.length >= bannerSlideIndex) {
			dots[bannerSlideIndex - 1].classList.add("active");
		}
	}

	function startBannerAutoPlay() {
		const slides = document.getElementsByClassName("banner-slide");
		if (!slides || slides.length === 0) { return; }
		bannerAutoPlayTimeout = setTimeout(() => {
			bannerSlideIndex++;
			showBannerSlides(bannerSlideIndex);
			startBannerAutoPlay();
		}, 5000);
	}

	// Expose controls for inline onclick handlers
	window.changeBannerSlide = changeBannerSlide;
	window.currentBannerSlide = currentBannerSlide;

	// Initialize carousel when ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {
			showBannerSlides(bannerSlideIndex);
			startBannerAutoPlay();
		});
	} else {
		showBannerSlides(bannerSlideIndex);
		startBannerAutoPlay();
	}
})();
