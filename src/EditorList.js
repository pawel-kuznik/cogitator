/**
 *  This is a special component that can be installed in all sorts of editors
 *  to create an editable list of items.
 */

// the dependencies
const Component = require('sparkle').Component;


// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     */
    constructor(FormComponent, ItemComponent) {
    }

    /**
     *  Refresh the list to contain items for given collection of entities.
     *  @param  collection
     *  @return EditorList
     */
    refresh(collection) {
    }
};
