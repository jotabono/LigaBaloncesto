'use strict';

angular.module('ligabaloncestoApp')
    .controller('SocioDetailController', function ($scope, $rootScope, $stateParams, entity, Socio) {
        $scope.socio = entity;
        $scope.load = function (id) {
            Socio.get({id: id}, function(result) {
                $scope.socio = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligabaloncestoApp:socioUpdate', function(event, result) {
            $scope.socio = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
