;(() => {
  'use strict';
  /**
   * Owl slider directive
   *
   * Usage:
   * <div myslider>
   *   <ul class="slider">
   *     ...
   *   </ul>
   * </div>
   *
   * or
   *
   * <myslider>
   *   <ul class="slider">
   *     ...
   *   </ul>
   * </myslider>
   *
   * @url http://owlgraphic.com/owlcarousel/index.html#customizing
   * 
   */
  angular
    .module('boilerplate')
    .directive('myslider', slider);

  function slider() {
    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'AE',
      link: (scope, element, attrs) => {

        scope.$watch(() => {
          angular.element(document).ready(() => {
            $('.slider').owlCarousel({
              autoPlay: 2500,
              items: 1,
              //singleItem: true,
              margin: 0,
              nav: true,
              dots: false,
              navText: '',
              pauseOnHover: true
            });
          });
        });

        // keyboard navigation
        $(document).keyup((i) => {
          if (i.keyCode == 37) {
            $('.gallery').trigger('prev.owl.carousel');
          } else if (i.keyCode == 39) {
            $('.gallery').trigger('next.owl.carousel');
          }
        });

      }
    };

    return directiveDefinitionObject;
  }

})();