/**
 *  This is a special component that can be installed in all sorts of editors
 *  to create an editable list of items.
 *
 *  @event      change      This event triggers when there is a change in one
 *                          of the items in the list. It might be a change in
 *                          the state or it might be that item was added
 *                          or removed.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 *  @file       src/common/EditorList.js
 */

// the dependencies
const List          = require('sparkle').List;
const Component     = require('sparkle').Component;
const ModalWrapper  = require('./ModalWrapper.js');
const Sorry         = require('./Sorry.js');

// the privates
const data          = Symbol('data');
const list          = Symbol('list');
const items         = Symbol('items');
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
     *                  formData                The addtional form data.
     *
     *                  ItemComponent           The item component that shows the
     *                                          entity in the list.
     */
    constructor(options) {

        // construct the parent
        super({ template: '/templates/entitiesList.html' });

        // add editor list class
        this.elem.classList.add('editorlist');

        // store the data
        this[data] = options.data;

        // store the components for the form and the item
        this[FormComponent] = options.FormComponent;
        this[ItemComponent] = options.ItemComponent;

        // construct a list
        this[list] = this.adopt(new List());

        // wait for the template to initialize
        this.then(() => {

            // assign the title and description
            this.elem.querySelector('h2').textContent = options.title;
            this.elem.querySelector('p').textContent = options.description;

            // install handler on a button in this component
            this.elem.querySelector('button').addEventListener('click', () => {

                // construct new modal
                const modal = new ModalWrapper(this[FormComponent], Object.assign({ }, options.formData, { data: this[data].build() }));

                // when the modal says that it was stored we can remove the modal
                modal.component.on('stored', () => {

                    // remove the modal
                    modal.remove();

                    // refresh the list
                    this.pull();

                    // trigger change event
                    this.triggerer.triggerEvent('changed');
                });

                // when the modal says that it was deleted we can remove the modal
                modal.component.on('deleted', () => {

                    // remove the modal
                    modal.remove();

                    // refresh the list
                    this.pull();

                    // trigger change event
                    this.triggerer.triggerEvent('changed');
                });

                // show the modal
                modal.show();
            });
            
            // prepend the list
            this.content.querySelector('.editorlist-list').prepend(this[list].elem);
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
        for (let itemData of this[data]) {

            // create list item
            const item = this[list].add(this[ItemComponent], itemData);

            // when an item says that it was deleted we want to trigger
            // a changed event
            item.on('deleted', () => this.triggerer.triggerEvent('changed'));
        }

        // no items in the list? then install a sorry element
        if (Array.from(this[list]).length == 0) this[list].add(Sorry);
    }

    /**
     *  Push the data to the data object.
     */
    push() {

        // @todo the connectedentities collection works in a wrong way. It makes
        // changes immediately (the .build() method is wrong). We need to fix that
        // before we can fix this component.
    }
};
