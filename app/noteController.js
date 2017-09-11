; (function () {
  angular
    .module('boilerplate')
    .controller('NoteController', NoteController);

  NoteController.$inject = ['$stateParams', '$resource', 'NotesFactory', 'popup'];

  function NoteController($stateParams, $resource, NotesFactory, popup) {
    var self = this;
    var noteID = $stateParams.noteID;
    self.pending = true;

    NotesFactory.get({ id: noteID }, response => {
      self.note = response.note;
      self.pending = false;
      self.errorMessage = "";
    }, error => {
      self.pending = false;
      popup.show(error, {delay: -1, type: 'danger'});
      self.errorMessage = error;
    });
  }
  
})();
