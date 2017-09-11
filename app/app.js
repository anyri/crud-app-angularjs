
; ( () => {
  angular
    .module('boilerplate', [
      'ui.router', 'ngResource', 'ui.bootstrap'
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$resourceProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $compileProvider, $resourceProvider) {
    //$locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'MainController as main',
        templateUrl: 'views/home.html'
      })
      .state('contact', {
        url: '/contact',
        controller: 'MainController as main',
        templateUrl: 'views/contact.html'
      })
      .state('setup', {
        url: '/setup',
        controller: 'MainController as main',
        templateUrl: 'views/setup.html'
      })
      .state('notes', {
        url: '/notes',
        controller: 'NotesController as notesCtrl',
        templateUrl: 'views/notes.html'
      })
      .state('note', {
        url: '/note/:noteID',
        controller: 'NoteController as noteCtrl',
        templateUrl: 'views/note.html'
      })
      .state('edit', {
        url: '/note/edit/:id',
        controller: 'NoteFormController as formCtrl',
        templateUrl: 'views/noteForm.html'
      })
      .state('new', {
        url: 'note/edit/new',
        controller: 'NoteFormController as formCtrl',
        templateUrl: 'views/noteForm.html'
      })
    $httpProvider.interceptors.push('authInterceptor', 'apiInterceptor');
  }

  angular
    .module('boilerplate')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location'];

  function authInterceptor($rootScope, $q, $location) {
    return {
      // intercept every request
      request: (config) => {
        config.headers = config.headers || {};
        return config;
      },
      // Catch 404 errors
      responseError: (response) => {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

  angular
    .module('boilerplate')
    .factory('apiInterceptor', apiInterceptor);

  apiInterceptor.$inject = ['$q'];

  function apiInterceptor($q) {
    let self = {};
    self.response = (response) => {
      console.log("apiInterceptor status = " + response.status);
      if (response.data && response.data.status == "fail") {
        console.log("apiInterceptor fail = " + response.data.message);
        
        return $q.reject(response.data.message);
      }
      return response;
    }
    return self;
  }
  /**
   * Run block
   */
  angular
    .module('boilerplate')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {
    // put here everything that you need to run on page load
  }
})();