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
        model.textContent = rule.count + 'x ' + rule.model.name;
        this.content.append(model);

        // if the rule says that is has a power rating we want to tell it
        if (rule.powerRating) {

            // construct element
            const rating = document.createElement('SPAN');
            rating.textContent = `[ +${rule.powerRating} power levels ]`;
            this.content.append(rating);
        }

        // if the model is a base one we want to indicate it
        if (rule.base) {

            // construct the element
            const base = document.createElement('SPAN');
            base.textContent = '[ base model ]';
            this.content.append(base);
        }
    }
};
