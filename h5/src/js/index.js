require('../less/index.less');

import { $ } from './h5base.js';
require('../../unit/lib/lib-swiper/2.7.6/swiper.js');

let mySwiper = null;
// let slides = [
//   '//yun.duiba.com.cn/qiho-h5/protal/images/slide1.jpg',
//   '//yun.duiba.com.cn/qiho-h5/protal/images/slide2.jpg',
//   '//yun.duiba.com.cn/qiho-h5/protal/images/slide3.jpg',
//   '//yun.duiba.com.cn/qiho-h5/protal/images/slide4.jpg',
//   '//yun.duiba.com.cn/qiho-h5/protal/images/slide5-2.jpg'
// ]

$(function() {
  initSlide();

  disableExtraEvent($(window));
  bindEvents();
});

/**
 * 初始化slide
 */
function initSlide() {
  let winH = $(window).height();
  let topbarH = $('#J_Topbar').height();
  let swiperH = winH - topbarH + 1;
  $('.swiper-container').css({ 'width': '100%', 'height': swiperH });

  // 图片webp处理，并插入swiper
  // slides.forEach(function(item) {
  //   // webp
  //   let src = item.ossimg();
  //   let html = '<div class="swiper-slide"><img src="' + src + '"></div>';
  //   $('.swiper-wrapper').append(html);
  // });

  mySwiper = $('.swiper-container').swiper({
    mode: 'vertical',
    autoResize: true,
    onSlideChangeEnd: function(swiper) {
      $('#J_Sidebar li').eq(swiper.activeIndex).addClass('on').siblings('li').removeClass('on');
      if (swiper.activeIndex === $('.swiper-slide').length - 1) {
        $('.down-icon').hide();
      } else {
        $('.down-icon').show();
      }
    }
  });
}

function disableExtraEvent(ithis) {
  var $win = ithis;
  // 禁止ios的浏览器容器弹性
  $win.on('scroll.elasticity', function(e) {
    e.preventDefault();
  }).on('touchmove.elasticity', function(e) {
    e.preventDefault();
  });
  // 禁止拖动图片
  $win.on('img', 'mousemove', function(e) {
    e.preventDefault();
  });
}

function bindEvents() {
  $('#J_Menuicon').on('click', function() {
    $('#J_Menuicon').toggleClass('active');
    $('#J_Sidebar').toggleClass('open');
    if ($('#J_Menuicon').hasClass('active')) {
      $('.mask').show();
    } else {
      $('.mask').hide();
    }
  });

  $('#J_Sidebar li').on('click', function() {
    $(this).addClass('on').siblings('li').removeClass('on');
    mySwiper.swipeTo($(this).data('index'), 1000, true);
  });

  $('.mask').on('click', function() {
    $('#J_Menuicon').removeClass('active');
    $('#J_Sidebar').removeClass('open');
    $('.mask').hide();
  });

  $('#J_Downicon').on('click', () => {
    mySwiper.swipeNext();
  })

  $('#J_Sidebar li').eq(0).trigger('click');
}