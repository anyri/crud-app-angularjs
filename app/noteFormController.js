; (function () {
    angular
        .module('boilerplate')
        .controller('NoteFormController', NoteFormController);

    NoteFormController.$inject = ['$stateParams', '$resource', 'NotesFactory', 'popup', 'NoteUpdateFactory'];

    function NoteFormController($stateParams, $resource, NotesFactory, popup, NoteUpdateFactory) {
        var self = this;
        self.errorMessage = "";
        self.successMessage = "";

        var noteID = $stateParams.id;        
        self.note = {};
        let noteSource = {};

        if (noteID == 'new') {
            self.note.createdAt = new Date();
            self.note.updatedAt = false;
            noteSource = angular.copy(self.note);

        } else {
            self.pending = true;
            NotesFactory.get({ id: noteID }, response => {
                self.note = response.note;
                noteSource = angular.copy(response.note);
                self.pending = false;
                self.errorMessage = "";
            }, error => {
                self.pending = false;
                popup.show(error, { delay: -1, type: 'danger' });
                self.errorMessage = error;
            });
        }

        self.save = () => {
            self.pending = true;
            self.successMessage = "";
            self.errorMessage = "";
            let note = { id: self.note.id, name: self.note.name, createdAt: self.note.createdAt, description: self.note.description, text: self.note.text };
            let $id = note.id;

            NoteUpdateFactory.update({ id: $id }, note, response => {
                self.pending = false;
                self.note = response.updatedNote;
                noteSource = angular.copy(response.note);
                let successMessage = "Note " + self.note.name + " was updated successfully";
                popup.show(successMessage, { type: 'success' });
            }, error => {
                self.pending = false;
                popup.show(error.message, { type: 'danger' })
            });
        }

        self.reset = ($event) => {
            self.note = angular.copy(noteSource);
        }

        self.openDatepicker = () => {
            self.opened = true;
        };
        self.format = "MM/dd/yyyy";
        self.maxDate = new Date();
        self.options = {
            maxDate: new Date()
        }

    }

})();