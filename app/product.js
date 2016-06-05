
  'use strict';
function ProductController() {

}
angular.module('App.home').component('product', {
  templateUrl: 'product.html',
  controller: ProductController,
  bindings: {
    product: '='
  }
});