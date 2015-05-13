(function(angular) {
  // http://stackoverflow.com/questions/14107531/retain-scroll-position-on-route-change-in-angularjs/26244891#answer-16198496
  
  angular.module('angular-scroll-state', []).run([
    '$rootScope', 
    '$window', 
    '$location', 
    '$timeout', 

    function($rootScope, $window, $location, $timeout) {

      var scrollPos = {};
      var saveScroll = false;

      var clearScroll = function(path) {
        return scrollPos[path] = 0;
      };

      var onScroll = function() {
        if (saveScroll)
          return scrollPos[$location.path()] = $window.pageYOffset;
      });

      var onChangeStart = function() {
        return saveScroll = false;
      };

      var onChangeSuccess = function() {
        return $timeout(function() {
          var scrollTo;
          scrollTo = 0;
          if (scrollPos[$location.path()])
            scrollTo = scrollPos[$location.path()];
          $window.scrollTo(0, scrollTo);
          return saveScroll = true;
        }, 0);
      };

      // Events
      angular.element($window).bind("scroll", onScroll);

      $scope.$on('$stateChangeStart', onChangeStart);
      $scope.$on('$routeChangeStart', onChangeStart);
      $scope.$on('$stateChangeSuccess', onChangeSuccess);
      $scope.$on('$routeChangeSuccess', onChangeSuccess);
    }
  ]);

})(angular);
