 angular
    .module('boilerplate')
    .factory('NotesFactory', ($resource) => $resource('api/notes', null,
        {
          'query': { method: 'GET', isArray: false }
        }));