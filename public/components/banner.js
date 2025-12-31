// Banner carousel functionality
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

// Initialize carousel when ready
if(document.readyState === 'loading'){
	document.addEventListener('DOMContentLoaded', function() {
		showBannerSlides(bannerSlideIndex);
		startBannerAutoPlay();
	});
} else {
	showBannerSlides(bannerSlideIndex);
	startBannerAutoPlay();
}
