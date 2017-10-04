(function () {
    angular.module("starwars", ['ui.router', 'ngResource'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<div ui-view></div>',
                    resolve: {isUser: isUser}
                })
                .state('home.login', {
                    url: 'login',
                    controller: 'LoginController',
                    controllerAs: 'model',
                    templateUrl: './app/states/login/login.html',
                    resolve: {isUser: isUser}
                })
                .state('home.main', {
                    url: 'main',
                    controller: 'MainController',
                    controllerAs: 'model',
                    templateUrl: './app/states/main/main.html',
                    resolve: {isUser: isUser}
                });

            $urlRouterProvider.otherwise('login');

            function isUser(UserService, $state) {
                if (UserService.getUser()) {
                    $state.go('home.main');
                } else {
                    $state.go('home.login');
                }
                return UserService.getUser();
            }

        });
})();