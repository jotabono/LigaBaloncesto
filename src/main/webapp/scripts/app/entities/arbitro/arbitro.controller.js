'use strict';

angular.module('ligabaloncestoApp')
    .controller('ArbitroController', function ($scope, Arbitro) {
        $scope.arbitros = [];
        $scope.loadAll = function() {
            Arbitro.query(function(result) {
               $scope.arbitros = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Arbitro.get({id: id}, function(result) {
                $scope.arbitro = result;
                $('#deleteArbitroConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Arbitro.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteArbitroConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.arbitro = {
                nombreArbitro: null,
                id: null
            };
        };
    });
