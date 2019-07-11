/**
 *  A form dealing with a squad.
 */

// the dependencies
const Form = require('sparkle').Form;

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

            console.log(event);
        });
    }

};
