import $ from 'jquery';
import Inputmask from 'inputmask';
import 'slick-carousel';

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
      if (video) {
        video.play();
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
            },
            error: () => {
              alert('Ошибка');
            }
          });
        });
      });

      const clearForm = form => {
        const inputsArr = form.querySelectorAll('input');
        inputsArr.forEach(input => { input.value = ''});
      };
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
  },

  // switch between forms
  createGallery: () => {
    const gallery = document.querySelector('.js-gallery');

    if (gallery) {
      const galleryLeft = document.querySelector('.js-gallery-nav-left');
      const galleryRight = document.querySelector('.js-gallery-nav-right');
      const galleryCenter = document.querySelectorAll('.js-arrow-goto-center');

      $(gallery).not('.slick-initialized').on('init', () => gallery.classList.add('gallery__container_init'));

      const gallerySlider = $(gallery).not('.slick-initialized').slick({
        infinite: false,
        adaptiveHeight: true,
        arrows: false,
        initialSlide: 1,
        draggable: false,
        swipe: false
      });

      if (window.matchMedia('(max-width:768px)').matches) {
        gallerySlider.on('afterChange', () => {
          $('html, body').animate({
            scrollTop: $('#gallery').offset().top
          }, 300);
        });
      }

      galleryLeft.addEventListener('click', () => gallerySlider.slick('slickGoTo', 0));
      galleryRight.addEventListener('click', () => gallerySlider.slick('slickGoTo', 2));
      galleryCenter.forEach(item => item.addEventListener('click', () => gallerySlider.slick('slickGoTo', 1)));
    }
  }
};

app.init();



