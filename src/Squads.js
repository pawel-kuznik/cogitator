/**
 *  This is a component that allows managinig squads.
 */

// the dependencies
const ListPage  = require('./common/ListPage.js');
const Item      = require('./common/ListItem.js');

// export the class
module.exports = class extends ListPage {

    /**
     *  The constructor.
     *  @param  TemplateStore
     */
    constructor(templates) {

        // call the parent class
        super('/#/create-squad', Item);

        // fetch all squads
        templates.fetchSquads().forEach(squad => {

            // emplace the squad
            this.emplace(Item, squad, { urlPrefix: '#/squads/' });
        });
    }
};
