/**
 *  This is a component we use to edit or create a ModelTemplate.
 */

// the dependencies
const Editor        = require('./Editor.js');
const Form          = require('sparkle').Form;

// export the class
module.exports = class extends Editor {

    /**
     *  The constructor.
     *  @param  408k.ModelTemplate
     */
    constructor(model) {

        // call the parent
        super({
            data:           model,
            createTitle:    'Create new model template',
            editTitle:      'Edit ' + model.name + 'template'
        });

        // add forms
        this.add(Form, { template: '/templates/modelForm.html' });
    }
};
