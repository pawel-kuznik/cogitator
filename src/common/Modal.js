 /**
 *  This is a modal. A modal class is a class that gives an actual component
 *  a special place on the screen.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the dependencies
const sparkle   = require('sparkle');
const Component = sparkle.Component;

// the manager instance
var manager;

// export the class
module.exports = class extends Component {

    /**
     *  Get access to an application wide modal manager.
     *  @return ModalManager
     */
    static get manager() {

        // do we have a manager?
        if (manager) return manager;

        // get the class
        const ModalManager = require('./ModalManager.js');

        // construct a manager
        manager = new ModalManager();

        // return the manager
        return manager;
    }

    /**
     *  The constructor.
     */
    constructor() {

        // call the parent
        super({ elem: sparkle.DOM.createElement('DIV', { class: 'modal' }) });
    }

    /**
     *  Is the modal shown to the user?
     *  @return boolean
     */
    get shown() {

        // check if the class is applied
        return this.elem.classList.contains('shown');
    }

    /**
     *  Show the modal to the user.
     */
    show() {

        // add the shown class
        this.elem.classList.add('shown');
    }

    /**
     *  Hide the modal from the user.
     */
    hide() {

        // remove the shown class
        this.elem.classList.remove('shown');
    }
};
