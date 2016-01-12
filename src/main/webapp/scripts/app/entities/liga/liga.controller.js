'use strict';

angular.module('ligabaloncestoApp')
    .controller('LigaController', function ($scope, Liga) {
        $scope.ligas = [];
        $scope.loadAll = function() {
            Liga.query(function(result) {
               $scope.ligas = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Liga.get({id: id}, function(result) {
                $scope.liga = result;
                $('#deleteLigaConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Liga.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteLigaConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.liga = {
                nombreLiga: null,
                id: null
            };
        };
    });
