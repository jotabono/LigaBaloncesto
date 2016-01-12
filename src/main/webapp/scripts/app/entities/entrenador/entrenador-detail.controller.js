'use strict';

angular.module('ligabaloncestoApp')
    .controller('EntrenadorDetailController', function ($scope, $rootScope, $stateParams, entity, Entrenador) {
        $scope.entrenador = entity;
        $scope.load = function (id) {
            Entrenador.get({id: id}, function(result) {
                $scope.entrenador = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligabaloncestoApp:entrenadorUpdate', function(event, result) {
            $scope.entrenador = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
