/**
 *  This is a manager for various modals. This class allows for adding
 *  more modals on top of the existing ones and closing them in a managed way.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// privates
const elem      = Symbol('elem');
const modals    = Symbol('modals');

// export the manager
module.exports = class {

    /**
     *  The constructor.
     */
    constructor() {

        // create the element
        this[elem] = document.createElement('DIV');
        this[elem].classList.add('modalmanager');

        // the modals
        this[modals] = [];
    }

    /**
     *  The number of modals installed inside this manager.
     *  @return int
     */
    get size() {

        // return the length of the modals array
        return this[modals].length;
    }

    /**
     *  Add a new modal instance to the manager.
     *  @param  Modal   The modal instance to the manager.
     *  @return Modal   The modal instance.
     */
    add(modal) {

        // push the modal
        this[modals].push(modal);

        // append the modal element to our container
        this[elem].appendChild(modal.elem);

        // append the element to the document body
        document.body.appendChild(this[elem]);

        // the old remove method
        const oldRemove = modal.remove;

        // install new remove method
        modal.remove = () => {

            // get the modal index
            const idx = this[modals].indexOf(modal);

            // if we have an index of the modal item then we need to removed it from the modals array
            if (idx > -1) this[modals].splice(idx, 1);

            // remove the old remove
            oldRemove.call(modal);

            // if we don't have any modals we can remove the container element from the document
            if (this[modals].length == 0) {

                // remove the element
                this[elem].remove();

                // remove modalblur class
                const main = document.querySelector('body > main');
                if (main) main.classList.remove('modalblur');
            }
        };

        // return the modal
        return modal;
    }

    /**
     *  Add a new modal and automatically show it.
     *
     *  Signature 1:
     *  @param  Modal   A modal class to create inside this modal manager
     *  @variadic       The arguments for the Modal constructor.
     *  @return Modal   The created modal
     *
     *  Signature 2:
     *  @param  Component A component class to instainatiate inside the modal.
     *  @variadic       The arguments for the component constructor.
     *  @return Modal   The created modal
     */
    create(Widget, ...args) {

        // get the modal and modal wrapper classes
        const Modal = require('./Modal.js');
        const ModalWrapper = require('./ModalWrapper.js');

        // declare modal variable
        let modal;

        // are we dealing with a modal or a descendant? then we can construct
        // it like that
        if (Modal.isPrototypeOf(Widget) || Widget == Modal) modal = new Modal(...args);

        // we should wrap our custom widget inside a modal
        else modal = new ModalWrapper(Widget, ...args);

        // add the modal top the ones managed by the manager
        this.add(modal);

        // show the modal
        modal.show(); 

        // add a modal blur to the body
        const main = document.querySelector('body > main');
        if (main) main.classList.add('modalblur');

        // return the modal
        return modal;
    }

    /**
     *  Clear the current state of the modals.
     */
    clear() {

        // close all modals
        for (let modal of this[modals].reverse()) modal.remove();

        // drop references
        this[modals].length = 0;

        // remove modal blur class from main element
        const main = document.querySelector('body > main');
        if (main) main.classList.remove('modalblur');

        // allow chaining
        return this;
    }

    /**
     *  Remove the manager
     */
    remove() {

        // clear all of the modals
        this.clear();

        // and remove the element
        this[elem].remove();
    }
};
