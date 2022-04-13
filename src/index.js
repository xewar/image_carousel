import './style.css';

const slides = Array.from(document.querySelectorAll('.slide'));
let dotsNav = document.querySelector('.dots');
const dots = Array.from(dotsNav.children);
dots[0].classList.add('currentSlide');
// const dots = document.querySelectorAll('.dot');
let carouselContainer = document.querySelector('.carouselContainer');

//arrange the slides in a row next to each other
let slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, i) => {
  slide.style.left = slideWidth * i + 'px';
};
slides.forEach(setSlidePosition);

let moveToSlide = targetIndex => {
  let currentSlide = document.querySelector('.currentSlide');
  currentSlide.classList.remove('currentSlide');
  changeDotColor(targetIndex);
  // moving the carousel
  carouselContainer.setAttribute(
    'style',
    `transform : translateX(-${slides[targetIndex].style.left})`
  );
  slides[targetIndex].classList.add('currentSlide');
};

let chooseSlideWithDots = e => {
  let targetIndex = dots.findIndex(dot => dot === e.target);
  moveToSlide(targetIndex);
  //update dot color as well
  changeDotColor(targetIndex);
};
const changeDotColor = targetIndex => {
  let previousDot = dotsNav.querySelector('.currentSlide');
  previousDot.classList.remove('currentSlide');
  dots[targetIndex].classList.add('currentSlide');
};

const rightArrow = document.querySelector('.rightArrow');
const leftArrow = document.querySelector('.leftArrow');
rightArrow.addEventListener('click', e => {
  let currentSlide = document.querySelector('.currentSlide');
  let currentIndex = slides.findIndex(slide => slide === currentSlide);
  if (currentIndex === 5) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  //now that the current index has been updated, pass it into the fn as the target
  moveToSlide(currentIndex);
});

leftArrow.addEventListener('click', e => {
  let currentSlide = document.querySelector('.currentSlide');
  let currentIndex = slides.findIndex(slide => slide === currentSlide);
  if (currentIndex === 0) {
    currentIndex = 5;
  } else {
    currentIndex--;
  }
  //now that the current index has been updated, pass it into the fn as the target
  moveToSlide(currentIndex);
});
dots.forEach(dot => dot.addEventListener('click', chooseSlideWithDots));
