/**
 * Main application controller
 */
; (() => {
  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'popup'];

  function MainController(LocalStorage, popup) {
    // 'controller as' syntax
    var self = this;

  }
})();