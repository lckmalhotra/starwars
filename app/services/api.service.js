(function () {
    angular.module("starwars").factory("ApiService", ['$resource','APP_CONST', function($resource,APP_CONST) {
        return $resource(APP_CONST.url + ':path', {path: '@path'}, {
            login: {
                url: APP_CONST.url + 'people/?search=:search',
                method: 'GET',
                params: {
                    search:'@search'
                }
            },
            getAllPlanets: {
                url: APP_CONST.url + 'planets/?page=:page',
                method: 'GET',
                params: {
                    page : '@page'
                }
            },
            getPlanet: {
                url: APP_CONST.url + 'planets/?search=:search',
                method: 'GET',
                params: {
                    search : '@search'
                }
            }
        });
    }]);
})();
