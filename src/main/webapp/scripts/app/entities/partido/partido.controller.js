'use strict';

angular.module('ligabaloncestoApp')
    .controller('PartidoController', function ($scope, Partido) {
        $scope.partidos = [];
        $scope.loadAll = function() {
            Partido.query(function(result) {
               $scope.partidos = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Partido.get({id: id}, function(result) {
                $scope.partido = result;
                $('#deletePartidoConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Partido.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePartidoConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.partido = {
                fechaPartido: null,
                id: null
            };
        };
    });
