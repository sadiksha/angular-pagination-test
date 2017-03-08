(function(){

  var module = angular.module('paginationExample',['ui.bootstrap', 'pascalprecht.translate'])
  .controller('ProfessionalController', ProfessionalController)
  .controller('NavigationController', NavigationController)
  .config(translateConfig);

  translateConfig.$inject = ['$translateProvider', '$translatePartialLoaderProvider'];

  function translateConfig($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'scripts/internationalizations/{part}/{lang}.json'
    });
    $translatePartialLoaderProvider.addPart('homepage');
    $translateProvider.translations('en');
    $translateProvider.translations('de');

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  }

  ProfessionalController.$inject = ['$scope', '$rootScope', '$translate'];
  NavigationController.$inject = ['$scope', '$translate'];

  function NavigationController($scope, $translate) {
    $scope.changeLanguage = function (langkey) {
      console.log(langkey);
      $translate.use(langkey);
    }
  }
  function ProfessionalController($scope, $rootScope, $translate){
    var professionalDetails=[
      {"name":"Test 1", "position":"Tester",                "salary":"2000"},
      {"name":"Test 2", "position":"Analyzer",              "salary":"1000"},
      {"name":"Test 3", "position":"Junior Testter",        "salary":"2000"},
      {"name":"Test 3", "position":"Junior Analyzer",       "salary":"1000"},
      {"name":"Test 3", "position":"Tester",                "salary":"2000"},
      {"name":"Test 3", "position":"Analyser",              "salary":"1000"},
      {"name":"Test 3", "position":"Integration Engineer",  "salary":"2000"},
      {"name":"Test 3", "position":"Solution Architect",    "salary":"1000"},
      {"name":"Test 3", "position":"Software Engineer",     "salary":"2000"},
      {"name":"Test 3", "position":"Designer",              "salary":"2000"},
      {"name":"Test 3", "position":"Tester",                "salary":"3000"},
      {"name":"Test 3", "position":"Analyzer",              "salary":"1000"},
      {"name":"Test 3", "position":"Architect",             "salary":"5000"},
      {"name":"Test 3", "position":"Tester",                "salary":"1000"},
      {"name":"Test 3", "position":"Tester",                "salary":"2000"},
    ];
    $scope.filteredRows = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;

    $scope.makeRows = function() {
      $scope.rows = [];
      for (i=0;i<=professionalDetails.length-1;i++) {
        $scope.rows.push(professionalDetails[i]);
      }
    }

    $scope.makeRows();
    $rootScope.$watch('currentPage + numPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
      , end = begin + $scope.numPerPage;

      $scope.filteredRows = $scope.rows.slice(begin, end);
    });
  }


})();
