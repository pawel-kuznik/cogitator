/**
 *  This is a base class for various list classes. This class takes an entity,
 *  and displays it by the name. In addition user is offered with an edit and
 *  delete button.
 *
 *  @event      deleted     This event triggers when user removed the passed
 *                          entity from the object store with the remove button.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the dependencies
const Component = require('sparkle').Component;
const Prompt    = require('./Prompt.js');

// privates
const entity    = Symbol('entity');

// export the list item component
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  Component   The component responsible for showing the summary
     *                      of the entity.
     *  @param  Entity      The instance of the entity to show in the list.
     */
    constructor(Summary, data, options) {

        // call the parent constructor
        super();

        // add an item class to the container
        this.elem.classList.add('item');

        // construct the summary
        const summary = this.adopt(new Summary(data));
        this.append(summary);

        // remember the entity
        this[entity] = data;

        // construct a link to the edit page of the entity
        const edit = document.createElement('A');
        edit.classList.add('button');
        edit.setAttribute('href', options.urlPrefix + this.entity.id);
        edit.textContent = 'Edit';
        this.elem.append(edit);

        // construct a remove button
        const remove = document.createElement('BUTTON');
        edit.classList.add('button');
        remove.textContent = 'Remove';
        this.elem.append(remove);

        // install handler for the remove button
        remove.addEventListener('click', () => {

            // the ask prompt
            const ask = Prompt.manager.show(Prompt, { question: "Confirm removal" });

            // if the prompt says proceed then we can remove the data
            ask.on('proceed', () => {

                // remove the entity from the root
                data.root.delete(data);

                // make sure changes are propagated
                data.root.flush();

                // trigger deleted event
                this.triggerer.triggerEvent('deleted');
            });
        });
    }

    /**
     *  Get access to the entity.
     *  @return     Entity
     */
    get entity() { return this[entity]; }

    show() {

        // remove hidden class
        this.elem.classList.remove('hidden');
    }

    hide() {

        // add hidden class
        this.elem.classList.add('hidden');
    }
};
