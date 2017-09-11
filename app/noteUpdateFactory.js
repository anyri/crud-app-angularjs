 angular
    .module('boilerplate')
    .factory('NoteUpdateFactory', ($resource) => $resource('api/notes', null,
            {
                'update': { method:'PUT' }
            }));