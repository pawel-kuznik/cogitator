/**
 *  This is a form to define a squad composition rule.
 */

// the dependencies
const Form      = require('sparkle').Form;
const createRow = require('../common/createFormRow.js');

/**
 *  This is an internal helper function to update the select boxes with
 *  the current models inside the squad templaet.
 *
 *  @param  HTMLElement         The SELECT element.
 *  @param  ConnectedEntities   The connected entities 
 */
const updateSelect = function(select, models) {

    // remove all available options from the select
    for (let option of select.children) select.removeChild(option);

    // iterate over the models and create an option for each of them
    for (let model of models) {

        // create an option and add it to the select
        const option = document.createElement('OPTION');
        option.setAttribute('value', model.id);
        option.textContent = model.name;
        select.append(option);
    }
};

// export the class
module.exports = class extends Form {

    /**
     *  The constructor
     *  @param  object  Options for the component:
     *
     *                  data:CompositionRule    The composition rule instance.
     */
    constructor(options) {

        // call the parent class constructor
        super({
            data:       options.data,
            template:   '/templates/compositionRuleForm.html'
        });

        // when it's ready
        this.then(() => {

            // get the select
            const select = this.content.querySelector('select');

            // update the select with the models from the template
            updateSelect(select, options.squad.models);
        });

        // install onsubmit handler
        this.on('submitted', () => {

            // store the entity
            options.data.store();

            // flush the root
            options.data.root.flush();

            // tell others that it's stored
            this.triggerer.triggerEvent('stored', { entity: options.data });
        });
    }
};
