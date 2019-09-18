/**
 *  This is a class that creates an editor for a single entity. This editor
 *  consists out of a title, control buttons, and a series of smaller forms
 *  resposible for editing parts of the bigger entity.
 *
 *  @event  stored  This event triggers when the edited entity was stored.
 *
 *  @event  deleted This event triggers when the edited entity was deleted.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the dependencies
const Component     = require('sparkle').Component;

// the privates
const data          = Symbol('data');
const forms         = Symbol('forms');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  object  Options:
     *
     *                  data:Entity     The entity to edit.
     *                  listUrl:string  The path to the list component.
     *                  createTitle     The title when creating an entity.
     *                  editTitle       The title when ediring an entity.
     */
    constructor(options = { }) {

        // call the parent
        super({ template: '/templates/editor.html' });

        // store the entity
        this[data] = options.data;

        // and array of forms
        this[forms] = [];

        // wait for the component to be fully initialized
        this.then(() => {

            // assign title to the newly loaded content
            this.elem.querySelector('h1').textContent = this[data].isStored ? options.editTitle : options.createTitle;

            // install handling on the store button
            this.elem.querySelector('.button-store').addEventListener('click', () => {

                // iterate over all forms and push changes
                for (let form of this[forms]) form.push();

                // and make sure the squad template is stored
                this[data].store();

                // flush the changes
                this[data].root.flush();

                // trigger stored event
                this.triggerer.triggerEvent('stored');

                // go to the list of squads
                if (options.listUrl) window.location.hash = options.listUrl;
            });
            
            // install handling on the delete button
            this.elem.querySelector('.button-remove').addEventListener('click', () => {

                // remove the squad from the root
                this[data].root.delete(squad);

                // flush the changes
                this[data].root.flush();

                // trigger stored event
                this.triggerer.triggerEvent('deleted');

                // go to the list of squads
                if (options.listUrl) window.location.hash = options.listUrl;
            });
        });
    }

    /**
     *  Add a form component to the editor.
     *  @param  Form    The form to instantiate.
     *  @param  object  The options to supply for the form constructor.
     *                  Additionally it will be populated with `data`
     *                  property containing the entity to edit.
     *  @return Form    The constructed form.
     */
    add(Form, options = { }) {

        // create a form
        const form = this.adopt(new Form(Object.assign({ }, { data: this[data] }, options)));

        // push form to the forms array
        this[forms].push(form);

        // await till we are ready
        this.then(() => {

            // get the content
            const content = this.elem.querySelector('section > div');

            // append the form
            form.appendTo(content);
        });

        // return the created form
        return form;
    }
};
