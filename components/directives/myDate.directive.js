; ( () => {
    'use strict';
    angular
        .module('boilerplate')
        .directive('myDate', myDate);

    function myDate() {
        var directiveDefinitionObject = {
            link: (scope, element, attributes) => {
                scope.formattedDate = "";
                attributes.$observe('myDate', (value) => {
                    if (value != "") {
                        var date = new Date(value);
                        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                        scope.formattedDate = month + "/" + day + "/" + date.getFullYear();
                    }
                })
            },
            restrict: 'A',
            template: '<span class="date"><span ng-transclude></span><em>{{formattedDate}}</em></span>',
            transclude: true,
            replace: true,
            scope: {}
        };
        return directiveDefinitionObject;
    }

})();