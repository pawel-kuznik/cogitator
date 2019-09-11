/**
 *  This is a special modal designed to wrap around a component.
 */

// the dependencies
const Modal = require('./Modal.js');

// the privates
const component = Symbol('component');

// export the class
module.exports = class extends Modal {

    /**
     *  The constructor.
     *  @param  Component   The component class to wrap inside a modal
     *  @variadic           The arguments for the component constructor.
     */
    constructor(Widget, ...args) {

        // construct the modal
        super();

        // construct the component
        this[component] = this.adopt(new Widget(...args));

        // append the component
        this.append(this[component]);
    }

    /**
     *  Get access to the wrapped component.
     *  @return Component
     */
    get component() { return this[component]; }
};
