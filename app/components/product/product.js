
  'use strict';
function ProductController() {

}
angular.module('App.home').component('product', {
  templateUrl: 'components/product/product.html',
  controller: ProductController,
  bindings: {
    product: '='
  }
});