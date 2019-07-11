/**
 *  This is a component that allows managinig squads.
 */

// the dependencies
const ListPage = require('./common/ListPage.js');

// export the class
module.exports = class extends ListPage {

    /**
     *  The constructor.
     */
    constructor() {

        // call the parent class
        super('/#/create-squad');
    }
};
