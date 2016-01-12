'use strict';

angular.module('ligabaloncestoApp').controller('TemporadaDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Temporada',
        function($scope, $stateParams, $modalInstance, entity, Temporada) {

        $scope.temporada = entity;
        $scope.load = function(id) {
            Temporada.get({id : id}, function(result) {
                $scope.temporada = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('ligabaloncestoApp:temporadaUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.temporada.id != null) {
                Temporada.update($scope.temporada, onSaveFinished);
            } else {
                Temporada.save($scope.temporada, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
