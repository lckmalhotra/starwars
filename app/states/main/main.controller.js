(function () {
    angular.module("starwars").controller('MainController', ['$scope', 'isUser', 'ApiService', 'UserService', '$state', function ($scope, isUser, ApiService, UserService, $state) {
        var vm = this;
        vm.user = isUser;
        vm.count = 15;

        vm.getOrbit = function (index) {
            vm.selected = index;
            vm.isLoading = true;
            ApiService.getAllPlanets({page: index}, function (res) {
                vm.isLoading = false;
                vm.planets = res.results;
            });
        };

        vm.getOrbit(1);

        vm.logout = function () {
            UserService.logout();
            $state.go('home.login')
        };

        $scope.$on('searchQuery', function (e, params) {
            vm.isLoading = true;
            ApiService.getPlanet({search: params}, function (res) {
                vm.isLoading = false;
                vm.planets = res.results;
                if (vm.planets.length === 1 && vm.user.name === 'Luke Skywalker') {
                    vm.count = vm.count - 1;
                }
            });
        });

    }]);
})();