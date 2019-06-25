/**
 *  This is a base component for presenting lists in form of a page. This component should
 *  be used to present the layout lists of:
 *
 *  - squads
 *  - models
 *  - abilities
 *  - rules
 */

// dependencies
const Component = require('sparkle').Component;
const List = require('sparkle').List;

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     */
    constructor(formUrl) {

        // call the parent
        super({
            template: '/templates/listpage.html'
        });

        // when the template is loaded we want to made additional initialization
        this.then(() => {

            // update the create url
            this.elem.querySelector('a').setAttribute('href', formUrl);
        });
    }
};
