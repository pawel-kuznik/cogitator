/**
 *  This is a modal. A modal class is a class that gives an actual component
 *  a special place on the screen.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the symbols of private things
const elem      = Symbol('elem');
const component = Symbol('component');

// export the class
module.exports = class {

    /**
     *  The constructor.
     *  @param      Component the actual component to mount inside.
     *  @variadic   The parameters to pass to the constructor of the component.
     */
    constructor(Widget, ...args) {

        // the element of the modal
        this[elem] = document.createElement('DIV');
        this[elem].classList.add('modal');

        // create the component
        this[component] = new Widget(...args);

        // append the component to the element
        this[component].appendTo(this[elem]);
    }

    /**
     *  Get access to the component installed in the modal
     */
    get component() {

        // return the component
        return this[component];
    }

    /**
     *  Is the modal shown to the user?
     */
    get shown() {

        // check if the class is applied
        return this[elem].classList.contains('shown');
    }

    /**
     *  Show the modal to the user.
     */
    show() {

        // add the shown class
        this[elem].classList.add('shown');
    }

    /**
     *  Hide the modal from the user.
     */
    hide() {

        // remove the shown class
        this[elem].classList.remove('shown');
    }

    /**
     *  Remove the modal.
     */
    remove() {

        // remove the component
        this[component].remove();

        // remove the element
        this[elem].remove();
    }
};
