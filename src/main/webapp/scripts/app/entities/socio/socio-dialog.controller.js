'use strict';

angular.module('ligabaloncestoApp').controller('SocioDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Socio',
        function($scope, $stateParams, $modalInstance, entity, Socio) {

        $scope.socio = entity;
        $scope.load = function(id) {
            Socio.get({id : id}, function(result) {
                $scope.socio = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('ligabaloncestoApp:socioUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.socio.id != null) {
                Socio.update($scope.socio, onSaveFinished);
            } else {
                Socio.save($scope.socio, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
