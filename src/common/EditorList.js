/**
 *  This is a special component that can be installed in all sorts of editors
 *  to create an editable list of items.
 */

// the dependencies
const List      = require('sparkle').List;
const Component = require('sparkle').Component;
const Modal     = require('./Modal.js');

// the privates
const data          = Symbol('data');
const list          = Symbol('list');
const FormComponent = Symbol('FormComponent');
const ItemComponent = Symbol('ItemComponent');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  object  Options for the component:
     *
     *                  data:ConnectedEntities  The collection we want to work with.
     *
     *                  FormComponent           The form we want to show when user
     *                                          wants to create a new entity or
     *                                          edit an existing one.
     *
     *                  ItemComponent           The item component that shows the
     *                                          entity in the list.
     */
    constructor(options) {

        // construct the parent
        super({ template: '/templates/entitiesList.html' });

        // store the data
        this[data] = options.data;

        // store the components for the form and the item
        this[FormComponent] = options.FormComponent;
        this[ItemComponent] = options.ItemComponent;

        // construct a list
        this[list] = this.adopt(new List());

        // wait for the template to initialize
        this.then(() => {

            // install handler on a button in this component
            this.elem.querySelector('button').addEventListener('click', () => {

                // construct new modal
                const modal = Modal.manager.create(this[FormComponent], this[data].build());

                // when the modal says that it was stored we can remove the modal
                modal.component.on('stored', () => {

                    // refresh the list
                    this.pull();

                    // remove the modal
                    modal.remove();
                });

                // when the modal says that it was deleted we can remove the modal
                modal.component.on('deleted', () => {

                    // refresh the list
                    this.pull();

                    // remove the modal
                    modal.remove();
                });
            });

            // append the 
            this[list].appendTo(this);
        });

        // make the initial pull
        this.pull();
    }

    /**
     *  Pull data from the data object.
     */
    pull() {

        // clear the list
        this[list].clear();

        // iterate over the data
        for (let item of this[data]) this[list].add(this[ItemComponent], item);
    }

    /**
     *  Push the data to the data object.
     */
    push() {
    }
};
