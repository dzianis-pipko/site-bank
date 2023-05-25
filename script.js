'use strict';

/////////////////Modal window//////////////////////

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// - ///////////////Cookie////////////////

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
  Мы используем на этом сайте cookie для улучшения ф-ти.
  <button class="btn btn--close-cookie">Ok</button>
`;
message.style.backgroundColor = '#076785';
message.style.width = '100%';
message.style.height = Number.parseFloat(getComputedStyle(message).height + 90) + 'px';

const header = document.querySelector('.header');
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
})

///////////////Scroll to section////////////// 

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  let section1Coords = section1.getBoundingClientRect();
  // console.log('section1Coords: ', section1Coords);

  // console.log('btn', e.target.getBoundingClientRect());

  // console.log('windowX', window.pageXOffset);
  // console.log('windowY', window.pageYOffset);

  // console.log('width viewPort', document.documentElement.clientWidth);
  // console.log('height viewPort', document.documentElement.clientHeight);

  // window.scrollTo(section1Coords.left, section1Coords.top + window.pageYOffset);
  // window.scrollTo({
  //   left: section1Coords.left, 
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  window.scrollTo({
    top: section1Coords.top + window.pageYOffset,
    behavior: 'smooth'
  })

  // section1.scrollIntoView({behavior: 'smooth'});
})


// ///////////Оброботчики событий//////////////////

const h1 = document.querySelector('h1');

const hoverToText = (e) => {
  alert('hover to text');
}

h1.addEventListener('mouseenter', hoverToText)

setTimeout(() => {
  h1.removeEventListener('mouseenter', hoverToText);
}, 5000);


// ///////////Распростронение событий / Event Propagation//////////////////

///////// Smooth Page Navigation ///////////////

// document.querySelectorAll('.nav__link').forEach((htmlElement) => {
//   htmlElement.addEventListener('click', function(e){
//     e.preventDefault();
//     const href = this.getAttribute('href');

//     // let sectionCoords = document.querySelector(href).getBoundingClientRect()

//     // window.scrollTo({
//     //   top: sectionCoords.top + window.pageYOffset,
//     //   behavior: 'smooth'
//     // })

//     document.querySelector(href).scrollIntoView({behavior: 'smooth'})
//   })
// })

// Делегирование событий:
// 1. Добавляем event lictener для общего родителя.
// 2. Определить target element - элемент, для которого это событие произошло.
 
const navSmooth = document.querySelector('.nav');
const navSmoothHeight = navSmooth.getBoundingClientRect().height;

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const href = e.target.getAttribute('href');

    let sectionCoords = document.querySelector(href).getBoundingClientRect();

    window.scrollTo({
      top: (sectionCoords.top + window.pageYOffset) - navSmoothHeight,
      behavior: 'smooth'
    })
    // document.querySelector(href).scrollIntoView({behavior: 'smooth'})
  }
})


// ////////////// Tabs / Перемещение по DOM ///////////

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contants = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e){
  const targetTab = e.target.closest('.operations__tab');
  if(!targetTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  targetTab.classList.add('operations__tab--active');

  contants.forEach(contant => contant.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${targetTab.dataset.tab}`).classList.add('operations__content--active');
})



//////////////анимация потускнения на понели навигация //////////////////////

const nav = document.querySelector('.nav');

const navLinksHoverAnimation = (e, opacity) => {
  if(e.target.classList.contains('nav__link')){
    // получаю элемент при наведении
    const mouseOver = e.target;

    // получаю линки которые находятся в nav
    const siblingLinks = mouseOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = mouseOver.closest('.nav').querySelector('img');
    const logoText = mouseOver.closest('.nav').querySelector('.nav__text');

    // меняю св-ва
    siblingLinks.forEach(el => {
      if(el !== mouseOver){
        el.style.opacity = opacity
      }
    })
    logo.style.opacity = opacity
    logoText.style.opacity = opacity
  }
}

// mouseover - событие всплывает; - hover
// mouseout - событие всплывает; - покинуть/not hover
// mouseenter - событие не всплывает; - hover
// mouseleave - событие не всплывает; - покинуть/not hover

nav.addEventListener('mouseover', (e) => { 
  navLinksHoverAnimation(e, 0.4);
})

nav.addEventListener('mouseout', (e) => {
  navLinksHoverAnimation(e, 1);
})


// --------- ------ ------- ------
// const navLinksHoverAnimation = function(e) {
//   if(e.target.classList.contains('nav__link')){
//     // получаю элемент при наведении
//     const mouseOver = e.target;

//     // получаю линки которые находятся в nav
//     const siblingLinks = mouseOver.closest('.nav__links').querySelectorAll('.nav__link');
//     const logo = mouseOver.closest('.nav').querySelector('img');
//     const logoText = mouseOver.closest('.nav').querySelector('.nav__text');

//     // меняю св-ва
//     siblingLinks.forEach(el => {
//       if(el !== mouseOver){
//         el.style.opacity = this;
//       }
//     })
//     logo.style.opacity = this;
//     logoText.style.opacity = this;
//   }
// }

// // метод bind - создает копию ф-ии для которой этот метод вызван.
// // Он устанавливает this в вызове этой ф-ии в любое значение, в любое значение
// // которое мы передадим в этот метод как аргумент.

// // т е когда мы вызываем bind - он возвращает ф-ю и в этом случает this 
// // будет установленно в занчение к примеру 0.4

// nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4))
// nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1))





//////////// Sticky navigation //////////////


const navSticky = document.querySelector('.nav');
const section1Sticky = document.getElementById('section--1');
const headerIntersection = document.querySelector('.header');

// ресурсозатратынй способ

// const section1StickyCoords = section1Sticky.getBoundingClientRect();

// window.addEventListener('scroll', function(){
//   if(window.scrollY > section1StickyCoords.top){
//     navSticky.classList.add('sticky');
//   }else{
//     navSticky.classList.remove('sticky');
//   }
// })

// способ современный при помощи Intersection Observer API - наблюдатель пересечения.

// const observerCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const observerOptions = {
//   root: null,
//   threshold: 0.2 
// }
// const observe = new IntersectionObserver(observerCallback, observerOptions);
// observe.observe(section1Sticky);

const navHeight = navSticky.getBoundingClientRect().height;

const getStikyNav = (entries) => {
  const entry = entries[0];
  if(!entry.isIntersecting){
    navSticky.classList.add('sticky');
  }else{
    navSticky.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(getStikyNav, {
  root: null,
  threshold: 0, // т к threshold = 0 не массив, то в ф-ии getStikyNav не использую перебор.
  rootMargin: `-${navHeight+2}px`
})
headerObserver.observe(headerIntersection);


//////////// Показ Секций при прокручивании //////////////

const sectionsList = document.querySelectorAll('.section');

const getSectionVisible = (entries, observe) => {
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(getSectionVisible, {
  root: null,
  threshold: 0.1
})

sectionsList.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


// Имплементация lasy loading для изображения

const imagesList = document.querySelectorAll('img[data-src]');

const loadingImages = (entries, observe) => {
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })
  observe.unobserve(entry.target);
}

const lasyImagesObserver = new IntersectionObserver(loadingImages, {
  root: null,
  threshold: 0.1,
  // rootMargin: '300px',
});

imagesList.forEach(image => {
  lasyImagesObserver.observe(image);
})


////////////Lifecycle DOM events////////////////////

document.addEventListener('DOMContentLoaded', function(e){
  // console.log('Дерево ДОМ Созданно!', e);
})

window.addEventListener('load', function(e){
  // console.log('Страница полностью загружена', e);
})

// window.addEventListener('beforeunload', function(e){
//   e,preventDefault();
//   console.log(e);
//   e.returnValue = '';
// }) 

///////// defer & async ////////////////

//////////// slider /////////////////

const slides = document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

// slider.style.transform = 'scale(0.4)';
// slider.style.overflow = 'visible';

let currentSlide = 0;
const slidesLength = slides.length

const createDots = () => {
  slides.forEach((_, index) => {
    dotsContainer.insertAdjacentHTML('beforeend', `
      <button class="dots__dot" data-slide="${index}"></button>
    `)
  })
}
createDots();

const activateCurrentDot = (slide) => {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activateCurrentDot(currentSlide);

const moveToSlide = (slide) => {
   slides.forEach((s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`))
}

moveToSlide(currentSlide);


const nextSlide = () => {
  if(currentSlide === slidesLength-1){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
}

const previousSlide = () => {
  if(currentSlide === 0){
    currentSlide = slidesLength-1;
  }else{
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
}

btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', previousSlide)

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') previousSlide();
})

dotsContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
})

/////////////////
