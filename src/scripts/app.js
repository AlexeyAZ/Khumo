import $ from 'jquery';
import Inputmask from 'inputmask';
import MobileDetect from 'mobile-detect';
import 'slick-carousel';

import News from './news';

const md = new MobileDetect(window.navigator.userAgent);
const app = {
  init: () => {
    document.addEventListener('DOMContentLoaded', () => app.bindActions());
  },

  bindActions: () => {
    const content = document.querySelector('.content');

    // form phone input handler
    const phoneInputs = document.querySelectorAll('input[name=phone]');
    const phoneMask = new Inputmask('+9(999)999-9999', {clearIncomplete: true});
    phoneInputs.forEach(input => phoneMask.mask(input));

    // autoplay video
    (function () {
      const video = document.querySelector('#video');
      const hideVideo = () => {
        if (video.currentTime > 12) {
          video.classList.add('hide-video', 'video-transition');
        }
      };
      const showVideo = () => {
        if (video.currentTime > 0 && video.currentTime <= 12 && video.classList.contains('hide-video')) {
          video.classList.remove('hide-video');
        }
      };
      if (video) {
        video.play();
        video.addEventListener('timeupdate', showVideo);
        video.addEventListener('timeupdate', hideVideo);
      }
    })();

    (function () {
      const links = document.querySelectorAll('.js-scroll-link');
      links.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const el = link.getAttribute('href');

          $('html, body').animate({
            scrollTop: $(el).offset().top
          }, 400);
        });
      });
    })();

    // form handler
    (function () {
      const forms = document.querySelectorAll('.gallery__form');
      const message = document.querySelector('.js-message');
      const formWrap = document.querySelector('.js-form-wrap');

      const clearForm = form => {
        const inputsArr = form.querySelectorAll('input');
        inputsArr.forEach(input => {
          input.value = '';
        });
      };

      forms.forEach(form => {
        form.addEventListener('submit', e => {
          e.preventDefault();
          const formData = $(form).serialize();
          $.ajax({
            type: 'POST',
            url: 'mail/send.php',
            data: formData,
            success: () => {
              alert('Заявка отправлена');
              clearForm(self);
              message.classList.add('gallery__message_show');
              formWrap.classList.add('gallery__form-wrap_hide');
            },
            error: () => {
              alert('Ошибка');
              message.classList.add('gallery__message_show');
              formWrap.classList.add('gallery__form-wrap_hide');
            }
          });
        });
      });
    })();

    // confirm age
    (function () {
      const ageConfirmBtn = document.querySelector('.js-check-age-confirm');

      function fade() {
        const contentCheckAge = content.querySelector('.content__check-age');
        contentCheckAge.classList.add('content__check-age_fade');

        contentCheckAge.addEventListener('transitionend', () => {
          contentCheckAge.style.display = 'none';
          content.classList.remove('content_hide');

          setTimeout(app.createGallery, 300);
        });
      }

      if (content.classList.contains('content_index')) {
        if (localStorage.getItem('checkAge') !== null) {
          content.classList.remove('content_hide');
          app.createGallery();
        }else {
          content.querySelector('.content__check-age').style.display = 'block';
        }
        ageConfirmBtn.addEventListener('click', e => {
          e.preventDefault();
          localStorage.setItem('checkAge', true);
          fade();
        });
      }
    })();

    // Create news page
    const data = [
      {
        title: 'News title 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin ornare urna, ac accumsan libero scelerisque ac. Maecenas egestas luctus ipsum, et scelerisque leo ultrices vitae. Aliquam eleifend fringilla ligula, id hendrerit urna eleifend sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer purus lectus, fringilla in lectus non, tristique scelerisque nibh. Aenean non faucibus diam, vitae faucibus sapien. Sed leo turpis, iaculis in mi sed, pharetra porta urna. Etiam tempus nisl lectus. Aliquam placerat, purus ac pretium varius, neque nunc vehicula magna, quis consectetur nunc nulla in odio. Vestibulum lacinia magna viverra pellentesque accumsan.',
        href: 'https://news-1.html'
      },
      {
        title: 'News title 2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin ornare urna, ac accumsan libero scelerisque ac. Maecenas egestas luctus ipsum, et scelerisque leo ultrices vitae. Aliquam eleifend fringilla ligula, id hendrerit urna eleifend sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer purus lectus, fringilla in lectus non, tristique scelerisque nibh. Aenean non faucibus diam, vitae faucibus sapien. Sed leo turpis, iaculis in mi sed, pharetra porta urna. Etiam tempus nisl lectus. Aliquam placerat, purus ac pretium varius, neque nunc vehicula magna, quis consectetur nunc nulla in odio. Vestibulum lacinia magna viverra pellentesque accumsan.',
        href: 'https://news-2.html'
      }
    ];
    const news = new News();
    const newsHtml = news.getNewsHtml(data);
    const newsWrap = document.querySelector('.js-news');
    if (newsWrap) {
      newsWrap.insertAdjacentHTML('afterbegin', newsHtml);
    }
  },

  // switch between forms
  createGallery: () => {
    const gallery = document.querySelector('.js-gallery');

    if (gallery) {
      const mobile = md.mobile();
      const galleryLeft = document.querySelector('.js-gallery-nav-left');
      const galleryRight = document.querySelector('.js-gallery-nav-right');
      const galleryCenter = document.querySelectorAll('.js-arrow-goto-center');

      $(gallery).not('.slick-initialized').on('init', () => gallery.classList.add('gallery__container_init'));

      const gallerySlider = $(gallery).not('.slick-initialized').slick({
        infinite: false,
        adaptiveHeight: true,
        arrows: false,
        initialSlide: 1,
        draggable: true,
        swipe: false
      });

      gallerySlider.on('afterChange', (slick, currentSlide) => {
        $('html, body').animate({
          scrollTop: $('#gallery').offset().top
        }, 200);

        if (mobile) {
          if (currentSlide === 1) {
            gallerySlider.slick('slickSetOption', 'swipe', false);
          }else {
            gallerySlider.slick('slickSetOption', 'swipe', true);
          }
        }
      });

      galleryLeft.addEventListener('click', () => {
        gallerySlider.slick('slickGoTo', 0);
      });
      galleryRight.addEventListener('click', () => {
        gallerySlider.slick('slickGoTo', 2);
      });
      galleryCenter.forEach(item =>
        item.addEventListener('click', () => {
          gallerySlider.slick('slickGoTo', 1);
        }));
    }
  }
};

app.init();



