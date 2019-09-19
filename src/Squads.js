/**
 *  This is a component that allows managinig squads.
 */

// the dependencies
const ListPage  = require('./common/ListPage.js');
const Summary   = require('./Squads/SquadSummary.js');

// export the class
module.exports = class extends ListPage {

    /**
     *  The constructor.
     *  @param  TemplateStore
     */
    constructor(templates) {

        // call the parent class
        super('/#/create-squad');

        // fetch all squads
        templates.fetchSquads().forEach(squad => {

            // emplace the squad
            this.emplace(Summary, squad, { urlPrefix: '#/squads/' });
        });
    }
};
