; (() => {
  angular
    .module('boilerplate')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['NotesFactory', '$uibModal', 'popup', '$resource'];

  function NotesController(NotesFactory, $uibModal, popup, $resource) {
    const uploadError = "Sorry, failed to load page.";
    const removeError = "Sorry, failed to remove the note.";
    let self = this;
    let queryParams = {};
    let noteToRemoveId = null;
    self.pending;
    self.title = "Notes Title";
    self.uploadError = "";
    self.sortType = "";
    self.countSortName = 1;
    self.countSortDate = 1;
    self.countSortUpDate = 1;

    getNotes(queryParams);

    self.removeNote = (note) => {
      noteToRemoveId = note.id;

      var modalInstance = $uibModal.open({
        controller: 'ConfirmController',
        templateUrl: '../views/confirm.html',
        resolve: {
          title: () => 'Are you sure you want to remove "' + note.name + '"?'
        }
      })
      modalInstance.result.then(() => {
        note.pending = true;

        NotesFactory.delete({ id: noteToRemoveId }, (reponse) => {
          self.notes = self.notes.filter(note => note.id != noteToRemoveId);
          note.pending = false;
        }, error => {
          note.pending = false;
          popup.show("Error remove the note", -1, "danger");
        });

      }, function () {
        note.pending = false;
      });

    }

    self.sort = (type) => {
      if (self.pending) return;
      switch (type) {
        case 'name':
          self.countSortName++;
          count = self.countSortName;
          self.countSortDate = 1;
          self.countSortUpDate = 1;
          break;
        case 'createdAt':
          self.countSortDate++;
          count = self.countSortDate;
          self.countSortName = 1;
          self.countSortUpDate = 1;
          break;
        case 'updatedAt':
          self.countSortUpDate++;
          count = self.countSortUpDate;
          self.countSortName = 1;
          self.countSortDate = 1;
          break;
      }
      let order = count == 3 ? "desc" : "asc";
      queryParams = { sortBy: type, sortOrder: order }
      console.log("SORT PARAMS = " + queryParams.sortBy);
      if (count == 4) {
        if (count == self.countSortName)
          self.countSortName = 1;
        if (count == self.countSortDate)
          self.countSortDate = 1;
        if (count == self.countSortUpDate)
          self.countSortUpDate = 1;
        queryParams = {};
      }

      getNotes(queryParams);

    }

    function getNotes(params) {
      self.pending = true;
      NotesFactory.query(params, response => {
        self.notes = null;
        self.notes = response.notes;        
        self.pending = false;
      }, error => {
        self.pending = false;
        popup.show(uploadError, -1, "danger");
        self.uploadError = uploadError;
      });
    }

  }

})();