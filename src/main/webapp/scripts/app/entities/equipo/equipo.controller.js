'use strict';

angular.module('ligabaloncestoApp')
    .controller('EquipoController', function ($scope, Equipo) {
        $scope.equipos = [];
        $scope.loadAll = function() {
            Equipo.query(function(result) {
               $scope.equipos = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Equipo.get({id: id}, function(result) {
                $scope.equipo = result;
                $('#deleteEquipoConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Equipo.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteEquipoConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.equipo = {
                nombreEquipo: null,
                localidad: null,
                fechaCreacion: null,
                id: null
            };
        };
    });
