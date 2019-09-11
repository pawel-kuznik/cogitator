/**
 *  This is a component we use to edit or create a ModelTemplate.
 */

// the dependencies
const Component     = require('sparkle').Component;
const Form          = require('sparkle').Form;

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  408k.ModelTemplate
     */
    constructor(model) {

        // call the parent
        super({ template: '/templates/editor.html' });

        // the name form
        const nameForm = this.adopt(new Form({ data: model, template: '/templates/modelForm.html' }));

        // when we are ready we can make more initialization
        this.then(() => {

            // append name form
            this.append(nameForm);
        });
    }
};
