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
const entities      = Symbol('entities');
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

        // a set of entities to show
        this[entities] = new Set();

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
                modal.component.on('stored', event => {

                    // make sure that we have the entity (it's really important to have it)
                    if (!event.data.entity) console.warn("'stored' event is missing stored entity");

                    // remove the modal
                    modal.remove();

                    // add the added entity to the entity list
                    this[entities].add(event.data.entity);

                    // refresh the list
                    this.refresh();

                    // trigger change event
                    this.triggerer.triggerEvent('changed');
                });

                // show the modal
                modal.show();
            });
            
            // prepend the list
            this.content.querySelector('.editorlist-list').prepend(this[list].elem);
        });

        // pull data from the data object and then refresh the list
        this.pull();
        this.refresh();
    }

    /**
     *  Make sure that the list shows the current state of the component.
     */
    refresh() {

        // clear the list component
        this[list].clear();

        // iterate over the current entities and create an item for each one
        for (let entity of this[entities]) {

            // construct an item
            const item = this[list].add(this[ItemComponent], entity);

            // install on deleted handler
            item.on('deleted', () => { 

                // remove the entity from the stored entities
                this[entities].delete(entity);

                // refresh the list
                this.refresh();

                // tell others that we changed
                this.triggerer.triggerEvent('changed');
            });
        }

        // no items in the list? then install a sorry element
        if (Array.from(this[list]).length == 0) this[list].add(Sorry);
    }

    /**
     *  Pull data from the data object.
     */
    pull() {

        // clear current entities list
        this[entities].clear();
 
        // iterate over the data object and add all of the entities to our local set
        for (let entity of this[data]) this[entities].add(entity);
    }

    /**
     *  Push the data to the data object.
     */
    push() {

        // make sure all our our entities are registered in the data collection
        for (let entity of this[entities]) this[data].attach(entity);

        // make sure that all entities that are not in our register are detached
        for (let entity of this[data]) if (!this[entities].has(entity)) this[data].detach(entity);
    }
};
