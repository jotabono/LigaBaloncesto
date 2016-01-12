'use strict';

angular.module('ligabaloncestoApp').controller('EquipoDialogController',
    ['$scope', '$stateParams', '$modalInstance', '$q', 'entity', 'Equipo', 'Jugador', 'Estadio',
        function($scope, $stateParams, $modalInstance, $q, entity, Equipo, Jugador, Estadio) {

        $scope.equipo = entity;
        $scope.jugadors = Jugador.query();
        $scope.estadios = Estadio.query({filter: 'equipo-is-null'});
        $q.all([$scope.equipo.$promise, $scope.estadios.$promise]).then(function() {
            if (!$scope.equipo.estadio.id) {
                return $q.reject();
            }
            return Estadio.get({id : $scope.equipo.estadio.id}).$promise;
        }).then(function(estadio) {
            $scope.estadios.push(estadio);
        });
        $scope.load = function(id) {
            Equipo.get({id : id}, function(result) {
                $scope.equipo = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('ligabaloncestoApp:equipoUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.equipo.id != null) {
                Equipo.update($scope.equipo, onSaveFinished);
            } else {
                Equipo.save($scope.equipo, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
