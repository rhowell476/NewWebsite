const page = document.querySelector('.slideshow__slides');
const slide = Array.from(page.children);
const nextButton = document.querySelector('.slideshow__btn--right');
const prevButton = document.querySelector('.slideshow__btn--left');
const dotsNav = document.querySelector('.slideshow__nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slide[0].getBoundingClientRect().width;
console.log(slideWidth)

// arrange the slides next to one another
// slide[0].style.left = slideWidth * 0 + 'px';
// slide[1].style.left = slideWidth * 1 + 'px';
// slide[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slides, index) => {
    slides.style.left = slideWidth * index + 'px';
}

slide.forEach(setSlidePosition);

const moveToSlide = (page, currentSlide, targetSlide) => {
    page.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slide, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0 ) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slide.length -1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = page.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slide.findIndex(slide => slide === prevSlide);

    moveToSlide(page, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows (slide, prevButton, nextButton, prevIndex);
});

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = page.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slide.findIndex(slide => slide === nextSlide);
    
    moveToSlide(page, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows (slide, prevButton, nextButton, nextIndex);
});

// when i click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = page.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slide[targetIndex];

    moveToSlide(page, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows (slide, prevButton, nextButton, targetIndex);
})