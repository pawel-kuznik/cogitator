/**
 *  This is a modal. A modal class is a class that gives an actual component
 *  a special place on the screen.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the dependencies
const Container = require('sparkle').Container;
const Modal     = require('./Modal.js');

// the symbols of private things
const container = Symbol('container');
const modal     = Symbol('modal');

// export the class
module.exports = class {

    /**
     *  The constructor.
     *  @param      Component the actual component to mount inside.
     *  @variadic   The parameters to pass to the constructor of the component.
     */
    constructor(Widget, ...args) {

        // construct the modal
        this[modal] = new Modal();

        // install a container inside the modal element
        this[container] = new Container({ elem: this[modal].elem });

        // do we have a widget to install
        if (Widget) this[container].install(Widget, ...args);
    }

    /**
     *  Get access to the component installed in the modal
     */
    get component() {

        // return the installed component
        return this[container].current;
    }

    /**
     *  Is the modal shown to the user?
     */
    get shown() {

        // rely on the modal to tell this
        return this[modal].shown;
    }

    /**
     *  Show the modal to the user.
     */
    show() {

        // show the modal
        this[modal].show();
    }

    /**
     *  Hide the modal from the user.
     */
    hide() {

        // hide the modal
        this[modal].hide();
    }

    /**
     *  Remove the modal.
     */
    remove() {

        // remove the container
        this[container].remove();
        
        // remove the modal
        this[modal].remove();
    }
};
