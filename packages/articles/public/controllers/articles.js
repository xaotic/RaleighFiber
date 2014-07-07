'use strict';
angular.module('mean', ['leaflet-directive']);
angular.module('mean').controller('ArticlesController', ['$scope', '$stateParams', '$http', '$location', 'Global', 'Articles',
    function($scope, $stateParams, $http, $location, Global, Articles) {
        $scope.global = Global;
        $scope.hasAuthorization = function(article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
        };

         angular.extend($scope, {
                london: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 4
                }
            });

        $scope.create = function() {
            var address_string = angular.element(address).val() + " " + angular.element(city).val() +", "+ angular.element(state).val() + " " + angular.element(zip).val();
            var data = {address: address_string};
            var getCoords = function(a, c ,z){   
                $http.get('https://maps.googleapis.com/maps/api/geocode/json?', {params: data}).success(function(res){
                    console.log(res.status);
                    var coords = res.results[0].geometry.location;
                    var article = new Articles({
                        address: a,
                        city: c,
                        zip: z,
                        geometry: coords
                    });
                    article.$save(function(response) {
                    $location.path('articles/' + response._id);
                    });
                });
            };
            getCoords(angular.element(address).val(), angular.element(city).val(), angular.element(zip).val());
        };


        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function(response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };

        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };

        


    }
]);

