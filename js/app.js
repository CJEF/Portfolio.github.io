$(function() {
  const worksSlider = $('[data-slider="slick"]');
  /* Scroll */
  let header = $('#header');
    let intro = $('#intro');
    let introHeight = intro.innerHeight();
    let scrollPos = $(window).scrollTop();
    let nav = $('#nav');
    let scrollTopButton = $('.to-top');


    // checkScroll(scrollPos, introHeight);

    // $(window).on("scroll resize", function() {
    //   // introHeight = intro.innerHeight();
    //   scrollPos = $(this).scrollTop();
  
    //   checkScroll(scrollPos, introHeight);
    // });
      
    //   function checkScroll(scrollPos, introHeight){
    //   if (scrollPos > introHeight) {
    //     scrollTopButton.style.display = "block";
    //   } else {
    //     scrollTopButton.style.display = "none";
    //   }
    // }
  
    /* smooth scroll */
    $("[data-scroll]").on("click", function(event) {
      event.preventDefault();
  
      let elementId = $(this).data("scroll");
      let elementOffset = $(elementId).offset().top;
      nav.removeClass("show");
  
      $("html, body").animate(
        {
          scrollTop: elementOffset - 90
        },
        700
      );
    });

  /* Filter
  ================================= */
  let filter = $(
    "[data-filter]"
  ); /* сохраняем кнопку ссылки в переменную filter */

  filter.on("click", function(event) {
    /* при нажатии на ссылку */
    event.preventDefault(); /* убирает стандартное поведение ссылки и не перебрасывает в начало страницы */
    let cat = $(this).data(
      "filter"
    ); /* принятое значение из дата фильтра передаем переменной cat(all, app, interaction or website) */

    if (cat == "all") {
      $("[data-cat]").removeClass(
        "hide"
      ); /* если значнение cat равняется all убираем класс  "hide" и выводится полноценная верстка*/
    } else {
      $("[data-cat]").each(function() {
        let workCat = $(this).data(
          "cat"
        ); /* придаем переменной workCat значение из переменной "cat" (пробегает по всем элементам и выводит начальные 6 элементов(наши 6 блоков))*/
        /* console.log(workCat); пр кликем на любую ссылку появятся все категории проверка*/
        if (workCat != cat) {
          /* сравнение двух категорий  пройтись по каждой - принятое значение*/
          $(this).addClass(
            "hide"
          ); /* добавить класс  hide со значением display none*/
        } else {
          $(this).removeClass("hide"); /* если нет показать блок */
        }
      });
    }
  });

  /* Modal
  ================================= */
  const modalCall = $("[data-modal]");
  const modalClose = $(
    "[data-close]"
  ); /* сохраняем в переменную дата атрибут */

  modalCall.on("click", function(event) {
    event.preventDefault();
    let $this = $(this); /* придаем переменной значение modalCall */
    let modalId = $this.data(
      "modal"
    ); /* придаем переменной значение значение data_modal */
    $(modalId).addClass("show"); /* добавление классса 'show' для modalId */
    /* при вызове класса show в цсс добавляем &.show{display:flex} */
    $("body").addClass("no-scroll");

    setTimeout(function() {
      $(modalId)
        .find(".modal__dialog")
        .css({
          transform: "scale(1)"
        });
    }, 200);
    worksSlider.slick(
      "setPosition"
    ); /* перерасчет размера при вызове модального окна */
  });

  modalClose.on("click", function(event) {
    event.preventDefault();
    let $this = $(this); /* придаем переменной значение modalClose */
    let modalParent = $this.parents(
      ".modal"
    ); /* придаем переменной method parents с классом  ".modal"(ищем родителя с классом .modal)*/
    modalParent.find(".modal__dialog").css({
      transform: "scale(0)"
    });

    setTimeout(function() {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal").on("click", function() {
    let $this = $(this);
    $this.find(".modal__dialog").css({
      transform: "scale(0)"
    });

    setTimeout(function() {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal__dialog").on("click", function() {
    event.stopPropagation(); /* если кликнуть по modal__dialog мы отменяем функцию которая вызывается при клике на .modal что вышеЮ то есть класс show не убирается*/
  });

  /* Slider: https://kenwheeler.github.io/slick/
  ================================= */

  worksSlider.slick({
    infinite: true /* бесконечное прокручивание */,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true
  });

  $(".slickPrev").on("click", function(event) {
    /* add class slickPrev on  button*/
    event.preventDefault();

    let currentSlider = $(this)
      .parents(".modal")
      .find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function(event) {
    /* add class slickNext on  button*/
    event.preventDefault();

    let currentSlider = $(this)
      .parents(".modal")
      .find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });
  /*Mobile nav
  ================================= */

  const navToggle = $("#navToggle");
  // const nav = $("#nav");

  navToggle.on("click", function(event) {
    event.preventDefault();

    nav.toggleClass("show");
  });

  //E-mail Ajax Send
  $("form").submit(function() {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "./../php/mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
});
