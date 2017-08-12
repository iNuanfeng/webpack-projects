require('../less/index.less');

import $ from 'jquery';
require('../../unit/lib/lib-parallax/parallax.js');

var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
var bIsAndroid = sUserAgent.match(/android/i) == 'android';
var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
  window.location.href = '/h5/index.html';
} else {
  $('body').show();
   $('html,body').animate({
      scrollTop: (parseInt($('#home').offset().top) - 70) + 'px'
    }, 1000);
  $('.navbar').hover(function(){
    $('.navbar span').stop(true,true).fadeIn(400);
  },function(){
    $('.navbar span').stop(true,true).fadeOut(400);
    $('.navbar a[data-href="'+ $('#index').val() +'"]').addClass('on');
  });
  $('.navbar a').mouseover(function() {
    $('.navbar a').removeClass('on');
    $('.navbar span').stop(true,true).animate({
      width: $(this).outerWidth() + 'px',
      left: (parseInt($(this).position().left) + 32) + 'px'
    },100,'swing');
  });
  $('.navbar a').click(function() {
    $(this).addClass('on').siblings().removeClass('on');
    $('#index').val($(this).data('href'));
    var height = parseInt($('#' + $(this).data('href')).offset().top) - 70;
    $('html,body').animate({
      scrollTop: height + 'px'
    }, 1000);
  });
}