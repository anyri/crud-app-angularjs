; (() => {
    angular
        .module('boilerplate')
        .controller('ConfirmController', ConfirmController);

    ConfirmController.$inject = ['$scope', '$uibModalInstance', 'title', '$rootScope'];

    function ConfirmController($scope, $uibModalInstance, title, $rootScope) {
        $scope.title = title;

        $scope.cancel = () => {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.proceed = () => {
            $uibModalInstance.close();
        }

    }
})();