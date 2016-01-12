'use strict';

angular.module('ligabaloncestoApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('equipo', {
                parent: 'entity',
                url: '/equipos',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligabaloncestoApp.equipo.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/equipo/equipos.html',
                        controller: 'EquipoController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('equipo');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('equipo.detail', {
                parent: 'entity',
                url: '/equipo/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligabaloncestoApp.equipo.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/equipo/equipo-detail.html',
                        controller: 'EquipoDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('equipo');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Equipo', function($stateParams, Equipo) {
                        return Equipo.get({id : $stateParams.id});
                    }],
                    numCanastasJugador: ['$stateParams', 'Equipo', function($stateParams, Equipo) {
                        return Equipo.numCanastasJugador({id : $stateParams.id});
                    }]
                }
            })
            .state('equipo.new', {
                parent: 'equipo',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/equipo/equipo-dialog.html',
                        controller: 'EquipoDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombreEquipo: null,
                                    localidad: null,
                                    fechaCreacion: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('equipo', null, { reload: true });
                    }, function() {
                        $state.go('equipo');
                    })
                }]
            })
            .state('equipo.edit', {
                parent: 'equipo',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/equipo/equipo-dialog.html',
                        controller: 'EquipoDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Equipo', function(Equipo) {
                                return Equipo.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('equipo', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
