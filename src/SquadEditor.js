/**
 *  This is a component that presents the user with an editor to edit a squad template.
 *  The component can be supplied with a brand new instance or one comming from storage.
 */

// the dependencies
const Form          = require('sparkle').Form;
const Editor        = require('./Editor.js');
const Type          = require('./SquadEditor/Type.js');
const Models        = require('./SquadEditor/ModelsList.js');

// export the class
module.exports = class extends Editor {

    /**
     *  The constructor.
     *  @param  408k.SquadTemplate
     */
    constructor(squad) {

        // call super class constructor
        super({
            data:           squad,
            listUrl:        '#/squads',
            createTitle:    'New squad template',
            editTitle:      'Squad template ' + squad.name 
        });

        // add parts of the editor
        this.add(Form, { template: '/templates/squadForm.html' });
        this.add(Type);
        this.add(Models, { data: squad.models });
    }
};

