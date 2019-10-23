/**
 *  The item element for the squad composition rule.
 */

const EditorItem = require('../common/EditorItem.js');

module.exports = class extends EditorItem {

    /**
     *  The constructor.
     *  @param  CompositionRule
     */
    constructor(rule) {

        // call the parent
        super(rule);

        const model = document.createElement('SPAN');
        model.textContent = rule.model.name;
        this.content.append(model);
    }
};
