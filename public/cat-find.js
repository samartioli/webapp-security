angular.module('catApp', [])
    .controller('findController', function($scope, $http) {

        $scope.findCat = function(catName) {

            var query = {
                name: catName
            };

            $http.post('/find', {query: query})
            .then(function(response) {
                console.log(response.data);
            });

        };

    })
;
