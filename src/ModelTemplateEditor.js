/**
 *  This is a component we use to edit or create a ModelTemplate.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 *  @file   src/ModelTemplateEditor.js
 */

// the dependencies
const Editor        = require('./common/Editor.js');
const Form          = require('sparkle').Form;

// export the class
module.exports = class extends Editor {

    /**
     *  The constructor.
     *  @param  object      Options:
     *
     *                      data:408k.ModelTemplate     the template to edit
     */
    constructor(options) {

        // get the model into local scope
        let model = options.data;

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
