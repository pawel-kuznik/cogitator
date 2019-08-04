/**
 *  This is a special class that shows a prompt to the user with a content and
 *  set of buttons. The user has to give his answer with use of these buttons.
 *
 *  When user is ready and gives the answer an even is triggered and the prompt
 *  is closed.
 */

// the dependencies
const sparkle   = require('sparkle');
const Modal     = require('./Modal.js');

// the privates
const events = Symbol('events');

// the manager instance
var manager;

// export the class
module.exports = class extends Modal {

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
     *  @param  object  The options of the prompt.
     *
     *          question:string     The question to ask the user.
     *
     *          description:string  The additional description telling the user
     *                              what would be the consequences of his action.
     *
     *          buttons:object      An object with buttons labels to show to the
     *                              user. Default is:
     *
     *                              {
     *                                  'proceed': "Proceed",
     *                                  'cancel':  "Cancel"
     *                              }
     */
    constructor(options) {

        // set the options
        options = Object.assign({ }, {
            buttons: {
                'proceed':  'Proceed',
                'cancel':   'Cancel'
            }
        }, options);

        // call the parent
        super();

        // add a prompt class
        this.elem.classList.add('prompt');

        // the content
        const content = document.createElement('DIV');
        this.content.appendChild(content);

        // do we have question to ask?
        if (options.question) {

            // add question
            const question = document.createElement('STRONG');
            question.textContent = options.question;
            content.appendChild(question);
        }

        // do we have description to ask?
        if (options.description) {

            // add description
            const description = document.createElement('P');
            description.textContent = options.description;
            content.appendChild(description);
        }

        // create a footer with the data
        const footer = document.createElement('FOOTER');
        this.content.append(footer);

        // a click handler for the buttons
        const clickHandler = event => {

            // trigger the event matching the button
            this.triggerer.triggerEvent(event.target.getAttribute('data-type'));

            // close the prompt
            this.hide();

            // trigger the closed event
            this.triggerer.triggerEvent('closed');

            // remove ourselfs
            // @todo maybe a better solution is needed here
            this.remove();
        };

        // iterate over the buttons
        for(let button in options.buttons) {

            // construct a button based on options
            const buttonElem = sparkle.DOM.createElement('BUTTON', { class: button, 'data-type': button });
            buttonElem.addEventListener('click', clickHandler);
            buttonElem.textContent = options.buttons[button];
            footer.appendChild(buttonElem);
        }
    }
};
