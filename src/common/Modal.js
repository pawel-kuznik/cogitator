 /**
 *  This is a modal. A modal class is a class that gives an actual component
 *  a special place on the screen.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the dependencies
const sparkle   = require('sparkle');
const Component = sparkle.Component;

// export the class
module.exports = class extends Component {

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
