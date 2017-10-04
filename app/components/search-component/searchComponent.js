(function () {
    angular
        .module('starwars')
        .component('searchComponent', searchComponent());

    function searchComponent() {
        let CDO = {
            templateUrl: './app/components/search-component/searchComponent.html',
            controllerAs: 'model',
            controller: SearchComponentController,
            bindings: {
                count: '<'
            }
        };

        function SearchComponentController($scope) {
            let vm = $scope.model;

            vm.searchPlanet = function (name) {
                $scope.$emit('searchQuery', name);
            };

            vm.$onChanges = function (obj) {
                if (obj.counts.currentValue) {
                    vm.count = obj.count.currentValue;
                }
            };

            vm.$onDestroy = function () {
                vm = null;
            };
        }

        SearchComponentController.$inject = ['$scope'];

        return CDO;
    }

})();
