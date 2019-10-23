/**
 *  This is a component that contains rules for squad composition. These rules
 *  describe how squad can be built and what kind of power rating it can get.
 */

// the dependencies
const EditorList    = require('../common/EditorList.js');
const Form          = require('./SquadCompositionRuleForm.js');
const Item          = require('./SquadCompositionRuleItem.js');

// export the component
module.exports = class extends EditorList {

    /**
     *  The constructor.
     */
    constructor(options) {

        // call the parent
        super({
            data:           options.data,
            FormComponent:  Form,
            ItemComponent:  Item,
            formData:       { squad: options.squad }
        });
    }
};
