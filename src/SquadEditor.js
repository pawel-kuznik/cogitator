/**
 *  This is a component that presents the user with an editor to edit a squad template.
 *  The component can be supplied with a brand new instance or one comming from storage.
 */

// the dependencies
const Component     = require('sparkle').Component;
const Form          = require('sparkle').Form;

// export the class
module.exports = class extends Form {

    /**
     *  The constructor.
     *  @param  408k.SquadTemplate
     */
    constructor(squad) {

        // call the parent
        super({
            data:       squad,
            template:   '/templates/squadForm.html'
        });

        // install on submitted handler
        this.on('submit', event => {

            // store the 
            this.data.store();

            console.log(event);
        });
    }

};
