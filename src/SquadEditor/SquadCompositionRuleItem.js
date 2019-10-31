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

        // add the model name
        const model = document.createElement('SPAN');
        model.textContent = rule.model.name;
        this.content.append(model);

        // if the model is a base one we want to indicate it
        if (rule.base) {

            // construct the element
            const base = document.createElement('SPAN');
            base.textContent = '[ base model ]';
            this.content.append(base);
        }
    }
};
