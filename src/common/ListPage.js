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
const List      = require('sparkle').List;

// the privates
const list      = Symbol('list');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  string      the url to the form that can create a new item on the list
     */
    constructor(formUrl) {

        // call the parent
        super({
            template: '/templates/listpage.html'
        });

        // the list component
        this[list] = this.adopt(new List());

        // when the template is loaded we want to made additional initialization
        this.then(() => {

            // update the create url
            this.elem.querySelector('a').setAttribute('href', formUrl);

            // append the list to the element
            this[list].appendTo(this.elem);
        });
    }

    /**
     *  Emplace an item in the ListPage with given data.
     *
     *  @param  ListItem    The list item to place inside the list.
     *  @variadic           The data to pass to the constructor.
     *  @return ListItem    The emplaced element.
     */
    emplace(Constructor, ...args) {

        // construct an item
        const item = this[list].add(Constructor, ...args);

        // install deleted handler on the item
        item.on('deleted', () => {

            // when the user removes the emplaced item we want to remove it from the list
            item.remove();
        });

        // return the item
        return item;
    }
};
