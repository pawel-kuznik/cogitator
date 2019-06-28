/**
 *  A form dealing with a squad.
 */

// the dependencies
const Form = require('sparkle').Form;
const form = require('sparkle').form;

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

        console.log(this.elem);

        this.on('submitted', console.log);
    }

};
