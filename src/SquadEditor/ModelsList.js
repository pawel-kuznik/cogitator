/**
 *  This is a component that allows managing list of models associated
 *  with a squad template. 
 */

// the dependencies
const Component     = require('sparkle').Component;
const List          = require('sparkle').List;
const ModelEditor   = require('../ModelTemplateEditor.js');
const Modal         = require('../common/Modal.js');

// the privates
const data = Symbol('data');
const list = Symbol('list');

// export the component
module.exports = class extends Component {

    /**
     *  The constructor.
     */
    constructor(options) {

        // call the parent
        super({ template: '/templates/entitiesList.html' });

        // store the data object
        this[data] = options.data;

        // construct the list
        this[list] = this.adopt(new List);

        // wait for the template before we continue with rest of
        // the initialization.
        this.then(() => {

            // install handler on a button in this component
            this.elem.querySelector('button').addEventListener('click', () => {

                // construct new modal
                const modal = Modal.manager.create(ModelEditor, this[data].root.buildModel());
            });

            // append the 
            this[list].appendTo(this);
        });
    }

    push() {

    }
};
