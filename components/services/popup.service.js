angular
    .module("boilerplate")
    .factory("popup", ['$rootScope', '$compile', '$timeout', ($rootScope, $compile, $timeout) => {
        const DEFAULT_DELAY = 2000;
        const DEFAULT_TYPE = 'info';
        let popupService = {};

        let scope = $rootScope.$new();
        scope.popupList = [];

        let isInitialized = false;
        let initialize = () => {
            isInitialized = true;
            template = "<div class='alerts'><div ng-repeat='popup in popupList' uib-alert  close='close(popup.index)' type='{{popup.type}}'>{{popup.title}}</div></div>";
            element = angular.element(template);
            link = $compile(element)(scope);
            body = angular.element(document).find('body');
            body.append(link);
        }

        let count = 0;
        popupService.show = (title, params) => {
            type = params.type || DEFAULT_TYPE;
            delay = params.delay || DEFAULT_DELAY;
            console.log( `DELAY = ${delay}; TYPE = ${type}`);
            
            let popup = { title: title, type: type, index: count };
            
            scope.popupList.push(popup);

            if (!isInitialized) {
                initialize();
            }

            if(delay != -1)
                $timeout(() => scope.close(popup.index), delay);

            count++;

        }
        scope.close = (index) => {
            let res = scope.popupList.filter(popup => popup.index != index);
            scope.popupList = res;
        }

        return popupService;
    }])