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
     *  @param  string      the url to the form that can create a new item on the list
     *  @param  Component   the component that represents an item on the list
     */
    constructor(formUrl, Item) {

        // call the parent
        super({
            template: '/templates/listpage.html'
        });

        // the list component
        const list = this.adopt(new List());

        // when the template is loaded we want to made additional initialization
        this.then(() => {

            // update the create url
            this.elem.querySelector('a').setAttribute('href', formUrl);

            // append the list to the element
            list.appendTo(this.elem);
        });
    }
};
