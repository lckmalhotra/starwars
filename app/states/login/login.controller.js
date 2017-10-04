(function () {
    angular.module("starwars").controller('LoginController', ['ApiService', 'UserService', '$state', function(ApiService, UserService, $state){
        var vm = this;

        vm.login = function(){
            console.log(vm.username,vm.password);
            ApiService.login({search : vm.username},function(r){
                for(let i = 0; i< r.results.length; i++ ){
                    console.log(r.results[i])
                    if(r.results[i].name === vm.username && r.results[i].birth_year === vm.password){
                        UserService.setUser(r.results[i]);
                        $state.go('home.main');
                    }
                }
            }, function(err){
                console.log(err);
            });
        }

    }]);
})();