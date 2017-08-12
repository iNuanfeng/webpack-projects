/**
 * @desc    复购页面1
 * @author  ncf <ncf@duiba.com.cn>
 * @date    2017-08-01
 */

require('../../less/rebuy/page1.less');

import { $ } from '@h5/src/js/h5base';
require('../../../unit/lib/lib-animate/1.0.0/animate');

var activity = {
  windowHeight: 0,
  bodyHeight: 0,
  menuTop: 0, // 下拉列表 top 偏移
  goodsTop: [], // 商品区 top 偏移
  menuALeft: [], // 下拉列表 a left 偏移
  // menuSelected: 0, // 记录当前选中区域
  menuALeftX: [0, 0, 0, -(279.8125 - 192.421875), -(367.203125 - 192.421875), -(454.59375 - 192.421875)],
  leftTo: 0,
  clix: false,
  timeoutId: 0,

  init: function() {
    this.getInformation();
    this.events();
  },

  events: function() {
    var self = this;
    /*
     * 下拉列表 点击
     */
    $('.menu a:not(.menu-more)').click(function() {
      $('.menu a:not(.menu-more)').removeClass('selected');
      $(this).addClass('selected');

      self.leftTo = self.menuALeftX[$(this).index()];
      $('.menu>div').animate({
        "transform": "translateX(" + self.leftTo + "px)",
        "-webkit-transform": "translateX(" + self.leftTo + "px)"
      }, 100, 'ease-in');

      self.menuSelected = $(this).index();
      $('.menu2 a').removeClass('selected').eq(self.menuSelected).addClass('selected');

      $(window).scrollTop(self.goodsTop[$(this).index()] - 60);
      if (self.goodsTop[$(this).index()] - 50 >= self.menuTop) {
        $('.menu-warp').addClass('fix');
        $('.menu-warp-ts').show();
      } else {
        $('.menu-warp').removeClass('fix');
        $('.menu-warp-ts').hide();
      }

      $(".menu>div").on("touchstart", function(e) {
        self.clix = true;
      }).on("touchend", function(e) {
        clearTimeout(self.timeoutId);
        self.timeoutId = setTimeout(function() {
          self.clix = false;
        }, 50)
      });
    });

    var startX, moveEndX;
    $(".menu>div").on("touchstart", function(e) {
      startX = 0;
      moveEndX = 0;
      startX = e.changedTouches[0].pageX;
    }).on("touchmove", function(e) {
      moveEndX = e.changedTouches[0].pageX;

      self.leftTo += (moveEndX - startX) / 14;
      if (self.leftTo >= 0) {
        self.leftTo = 0;
      }
      if (self.leftTo <= self.menuALeftX[5]) {
        self.leftTo = self.menuALeftX[5];
      }
      $('.menu>div').css({
        "transform": "translateX(" + self.leftTo + "px)",
        "-webkit-transform": "translateX(" + self.leftTo + "px)"
      });

    }).on("touchend", function(e) {

    });

    /*
     * 下拉列表 更多按钮 点击
     */
    $('.menu .menu-more').click(function() {
      if ($(this).hasClass('c')) {
        $(this).removeClass('c');
        $('.menu2').hide();
      } else {
        $(this).addClass('c');
        $('.menu2').show();
      }
    });

    /*
     * 二级菜单 点击
     */
    $('.menu2 a').click(function() {
      $('.menu2 a').removeClass('selected');
      $(this).addClass('selected');
      $('.menu2').hide();
      $('.menu .menu-more').removeClass('c');

      self.menuSelected = $(this).index();
      $('.menu a:not(.menu-more)').removeClass('selected').eq(self.menuSelected).addClass('selected');

      self.leftTo = self.menuALeftX[$(this).index()];
      $('.menu>div').animate({
        "transform": "translateX(" + self.leftTo + "px)",
        "-webkit-transform": "translateX(" + self.leftTo + "px)"
      }, 100, 'ease-in');

      // self.scrollTo(self.goodsTop[$(this).index()] - self.windowHeight*1/3);

      $(window).scrollTop(self.goodsTop[$(this).index()] - 60);
      if (self.goodsTop[$(this).index()] - 50 >= self.menuTop) {
        $('.menu-warp').addClass('fix');
        $('.menu-warp-ts').show();
      } else {
        $('.menu-warp').removeClass('fix');
        $('.menu-warp-ts').hide();
      }

      $(".menu2 a").on("touchstart", function(e) {
        self.clix = true;
      }).on("touchend", function(e) {
        clearTimeout(self.timeoutId);
        self.timeoutId = setTimeout(function() {
          self.clix = false;
        }, 50)
      });
    });

    /*
     * 滚动
     */
    $(window).scroll(function() {
      if (self.clix) {
        return
      }
      var scrollTop = $(window).scrollTop();
      if (scrollTop >= self.menuTop) {
        $('.menu-warp').addClass('fix');
        $('.menu-warp-ts').show();
      } else {
        $('.menu-warp').removeClass('fix');
        $('.menu-warp-ts').hide();
      }

      for (var i = 0, count = self.goodsTop.length; i < count; i++) {
        if ((scrollTop + self.windowHeight * 3 / 4) >= self.goodsTop[i]) {
          self.menuSelected = i;
          $('.menu a:not(.menu-more)').removeClass('selected').eq(i).addClass('selected');
          $('.menu2 a').removeClass('selected').eq(i).addClass('selected');
        }
      }

      if (scrollTop >= 250) {
        var sleftTo = -(scrollTop - 250)/(self.bodyHeight - self.windowHeight)*(-self.menuALeftX[5]);
        $('.menu>div').animate({
          "transform" : "translateX(" + sleftTo + "px)",
          "-webkit-transform" : "translateX(" + sleftTo + "px)"
        }, 100, 'ease-in');
      }
    });
  },

  getInformation: function() {
    var self = this;
    self.windowHeight = $(window).height();
    self.bodyHeight = $('body').height();
    self.menuTop = $('.menu').offset().top;

    // 获取 good top偏移
    $('.goods .good').each(function(index, ele) {
      self.goodsTop[index] = $(ele).offset().top;
    });

    var scrollTop = $(window).scrollTop();
    var cx = false;
    for (var i = 0, count = self.goodsTop.length; i < count; i++) {
      if ((scrollTop + self.windowHeight * 3 / 4) >= self.goodsTop[i]) {
        self.menuSelected = i;
        $('.menu a:not(.menu-more)').removeClass('selected').eq(i).addClass('selected');
        $('.menu2 a').removeClass('selected').eq(i).addClass('selected');

        cx = true;
      }
    }
    if (!cx) {
      $('.menu a:first-child').addClass('selected');
      $('.menu2 a:first-child').addClass('selected');
      this.menuSelected = 0;
    }

    if (scrollTop >= self.menuTop) {
      $('.menu-warp').addClass('fix');
      $('.menu-warp-ts').show();
    } else {
      $('.menu-warp').removeClass('fix');
      $('.menu-warp-ts').hide();
    }
  },

  /*
   * 滑动渐变
   */
  scrollTo: function(scrollEnd) {

  }
}

activity.init();