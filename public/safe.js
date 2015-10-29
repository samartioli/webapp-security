'use strict';

angular.module('safeApp', ['ngSanitize'])
    .controller('safeController', function($scope, $http, $sce) {

        $scope.userComments = [
            {
                name: 'Alice',
                comment: 'Hey. This is cool<script>alert(\'pwned\')</script>'
            },
            {
                name: 'Bob',
                comment: '<i>Yes</i> it is'
            },

        ]

        console.log('hello');

    })
;
