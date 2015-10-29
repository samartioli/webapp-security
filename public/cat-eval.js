angular.module('catApp', [])
    .controller('evalController', function($scope, $http) {

        $scope.cats = {};

        $http.post('/find', {query: {}})
        .then(function(response) {
            $scope.cats = response.data;
        });

        $scope.evalCat = function() {

            var toSend = '[';

            for (var x=0; x<$scope.cats.length; x++) {
                toSend += ('"' + $scope.cats[x].name + '"');
                if (x != ($scope.cats.length - 1)) {
                    toSend += ',';
                }
            }

            toSend += ']';

            console.log(encodeURI(toSend));

            $http.post('/eval', {catArray: toSend})
            .then(function(response) {
                console.log(response);
            });

        };

    })
;
