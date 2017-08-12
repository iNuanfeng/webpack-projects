/**
 * @note    h5 - base
 * @author  kangxufeng <kangxufeg@duiba.com.cn>
 * @create  2017-08-02
 * @des     通用型 base层，加入各种必用js依赖
            首屏需要加载
 */

require('../../unit/lib/lib-zepto/1.0.0/zepto.min'); // zepto
// require('@unit/lib/lib-modal/1.0.0/modal'); // modal 弹窗
require('../common/js/checkoutWebp'); // webp判断
// require('@unit/lib/lib-cookie/1.0.0/cookie'); // cookie
// require('@unit/lib/lib-loader');

// click 300ms延迟 调用 FastClick(document.body);
const FastClick = require('../../unit/lib/lib-fastclick/1.0.0/fastclick');
FastClick.attach(document.body);

// // artTemplate模板引擎
// window.Template = require('@unit/lib/lib-template/0.0.0/artTemplate');

let $ = window.Zepto;

export {$};