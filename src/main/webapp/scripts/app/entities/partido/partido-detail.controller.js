'use strict';

angular.module('ligabaloncestoApp')
    .controller('PartidoDetailController', function ($scope, $rootScope, $stateParams, entity, Partido) {
        $scope.partido = entity;
        $scope.load = function (id) {
            Partido.get({id: id}, function(result) {
                $scope.partido = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligabaloncestoApp:partidoUpdate', function(event, result) {
            $scope.partido = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
