'use strict';

angular.module('ligabaloncestoApp')
    .controller('ArbitroDetailController', function ($scope, $rootScope, $stateParams, entity, Arbitro) {
        $scope.arbitro = entity;
        $scope.load = function (id) {
            Arbitro.get({id: id}, function(result) {
                $scope.arbitro = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligabaloncestoApp:arbitroUpdate', function(event, result) {
            $scope.arbitro = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
