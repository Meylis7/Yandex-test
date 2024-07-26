let position = 0;
let slidesToShow = window.innerWidth <= 768 ? 1 : 3;
let slidesToScroll = slidesToShow;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const items = document.querySelectorAll('.slider-item');
const itemsCount = items.length;
let itemWidth = container.clientWidth / slidesToShow;
let movePosition = slidesToScroll * itemWidth;

const activeSlideElement = document.getElementById('activeSlide');
const totalSlidesElement = document.getElementById('totalSlides');

items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});

const updateSlideInfo = () => {
    const activeSlide = Math.abs(position) / itemWidth + slidesToShow;
    activeSlideElement.textContent = Math.min(activeSlide, itemsCount);
};

btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
    updateSlideInfo();
});

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
    updateSlideInfo();
});

const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

window.addEventListener('resize', () => {
    slidesToShow = window.innerWidth <= 768 ? 1 : 3;
    slidesToScroll = window.innerWidth <= 768 ? 1 : 3;
    itemWidth = container.clientWidth / slidesToShow;
    movePosition = slidesToScroll * itemWidth;

    items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`;
    });

    setPosition();
    checkBtns();
    updateSlideInfo();
});

totalSlidesElement.textContent = itemsCount;
updateSlideInfo();
checkBtns();
