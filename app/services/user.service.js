(function () {
    angular.module("starwars").factory("UserService", [function () {

        let currentUser = null;

        function setUser(data) {
            currentUser = data;
            localStorage.setItem('user', JSON.stringify(currentUser));
        }

        function getUser() {
            return currentUser || JSON.parse(localStorage.getItem('user'));
        }

        function logout() {
            localStorage.setItem('user', JSON.stringify(null));
            currentUser = null;
        }

        return {
            setUser: setUser,
            getUser: getUser,
            logout: logout
        };
    }]);
})();
