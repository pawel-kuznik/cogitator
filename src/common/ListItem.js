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
     *  @param  Entity
     *  @param  object  The options for the ListItem class:
     *
     *                  urlPrefix:string    The url prefix of the page allowing to
     *                                      edit the entity.
     */
    constructor(data, options = { }) {

        // call the parent constructor
        super();

        // add an item class to the container
        this.elem.classList.add('item');

        // remember the entity
        this[entity] = data;

        // construct a SPAN with the name of the entity
        const name = document.createElement('SPAN');
        name.textContent = this.entity.name;
        this.elem.append(name);

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
};
