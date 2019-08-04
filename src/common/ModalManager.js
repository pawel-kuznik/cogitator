/**
 *  This a class that allows creating modals in a manged way.
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
     */
    add(Modal, ...args) {

        // construct the new modal
        const modal = new Modal(...args);

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
            if (this[modals].length == 0) this[elem].remove();
        };

        // return the modal
        return modal;
    }

    /**
     *  Add a new modal and automatically show it.
     */
    show(Modal, ...args) {

        // construct new modal
        const modal = this.add(Modal, ...args);

        // show the modal
        modal.show(); 

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
