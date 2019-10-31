/**
 *  This is a component to show when we don't have any results for the user.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 *  @file       src/common/Sorry.js
 */

// the depenencies
const Component = require('sparkle').Component;

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *
     *  @param  object  The options for this component:
     *
     *                  title:string    What should be shown to the user.
     *                                  (Default: 'Nothing to show')
     */
    constructor(options) {

        // set the defaults
        options = Object.assign({ }, {
            title:  'Nothing to show'
        }, options);

        // call parent constructor
        super();

        // create a title element to show to the user
        const title = document.createElement('STRONG');
        title.textContent = options.title;
        this.content.append(title);
    }
};
