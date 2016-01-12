'use strict';

angular.module('ligabaloncestoApp')
    .controller('EquipoDetailController', function ($scope, $rootScope, $stateParams, entity, numCanastasJugador, Equipo, Jugador, Estadio) {
        $scope.equipo = entity;
        $scope.numCanastasJugador = numCanastasJugador;
        $scope.load = function (id) {
            Equipo.get({id: id}, function(result) {
                $scope.equipo = result;
            });
            Equipo.numCanastasJugador({id: id}, function(result) {
                $scope.numCanastasJugador = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligabaloncestoApp:equipoUpdate', function(event, result) {
            $scope.equipo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
