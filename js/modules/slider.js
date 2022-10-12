function slider() {
       /////////////////////////////////////////slider/////////////////////////////////////////////////////////////////////////////////////
       const slides = document.querySelectorAll('.offer__slide'),
       slider = document.querySelector('.offer__slider'),
       previous = document.querySelector('.offer__slider-prev'),
       total = document.querySelector('#total'),
       current = document.querySelector('#current'),
       next = document.querySelector('.offer__slider-next'),
       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
       slidesField = document.querySelector('.offer__slider-inner'),
       width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;
   let offset = 0;

   if (slides.length < 10) {
       total.textContent = `0${slides.length}`;
       current.textContent = `0${slideIndex}`;
   } else {
       total.textContent = slides.length;
       current.textContent = slideIndex;
   }
   slides.forEach(slide => {
       slide.style.width = width;
   });
   //////////////////////////////dots for slides////////////////////////////////
   slider.style.position = 'relative';
   const indicators = document.createElement('ol'),
       dots = [];

   indicators.classList.add('carousel-indicators');
   slider.append(indicators);
   for (let i = 0; i < slides.length; i++) {
       const dot = document.createElement('li');
       dot.setAttribute('data-slide', i + 1);
       dot.classList.add('dot');
       if (i === 0) {
           dot.style.opacity = 1;
       }
       dot.addEventListener('click', e => {
           const slideTo = e.target.getAttribute('data-slide');

           slideIndex = slideTo;
           offset = +width.replace(/\D/g, '') * (slideTo - 1);

           slidesField.style.transform = `translateX(-${offset}px)`;

           if (slides.length < 10) {
               current.textContent = `0${slideIndex}`;
           } else {
               current.textContent = slideIndex;
           }

           dots.forEach(dot => dot.style.opacity = '0.5');
           dots[slideIndex - 1].style.opacity = 1;

       })
       indicators.append(dot);
       dots.push(dot);
   }



   next.addEventListener('click', () => {
       if (offset === +width.replace(/\D/g, '') * (slides.length - 1)) {
           offset = 0;
       } else {
           offset += +width.replace(/\D/g, '');
       }
       slidesField.style.transform = `translateX(-${offset}px)`;

       if (slideIndex === slides.length) {
           slideIndex = 1;
       } else {
           slideIndex++;
       }

       if (slides.length < 10) {
           current.textContent = `0${slideIndex}`;
       } else {
           current.textContent = slideIndex;
       }

       dots.forEach(dot => dot.style.opacity = '0.5');
       dots[slideIndex - 1].style.opacity = 1;
   });

   previous.addEventListener('click', () => {
       if (offset === 0) {
           offset = +width.replace(/\D/g, '') * (slides.length - 1);
       } else {
           offset -= +width.replace(/\D/g, '');
       }
       slidesField.style.transform = `translateX(-${offset}px)`;

       if (slideIndex === 1) {
           slideIndex = slides.length;
       } else {
           slideIndex--;
       }

       if (slides.length < 10) {
           current.textContent = `0${slideIndex}`;
       } else {
           current.textContent = slideIndex;
       }

       dots.forEach(dot => dot.style.opacity = '0.5');
       dots[slideIndex - 1].style.opacity = 1;
   });
}

export {slider};