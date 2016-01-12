'use strict';

angular.module('ligabaloncestoApp')
    .factory('Partido', function ($resource, DateUtils) {
        return $resource('api/partidos/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaPartido = DateUtils.convertLocaleDateFromServer(data.fechaPartido);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.fechaPartido = DateUtils.convertLocaleDateToServer(data.fechaPartido);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.fechaPartido = DateUtils.convertLocaleDateToServer(data.fechaPartido);
                    return angular.toJson(data);
                }
            }
        });
    });
