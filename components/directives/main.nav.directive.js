; ( () => {
  'use strict';
  angular
    .module('boilerplate')
    .directive('mainNav', tinMainNav);

  function tinMainNav() {
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/main-nav.html'
    };
    return directiveDefinitionObject;
  }
})();