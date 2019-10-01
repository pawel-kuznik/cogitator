
// the dependencies
const SquadType     = require('408k').SquadType;
const Form          = require('sparkle').Form;
const createRow     = require('../common/createFormRow.js');

// export the class
module.exports = class extends Form {

    /**
     *  The constructor.
     */
    constructor(options) {

        // call the parent
        super({
            data:       options.data
        });

        // construct 
        const row = createRow('Battlefield role');

        // append the row
        this.append(row);

        // construct the select
        const select = document.createElement('SELECT');
        select.setAttribute('name', 'type');
        row.appendChild(select);

        // iterate over the types
        for (let type of SquadType) {

            // construct the option and append it to the child
            const option = document.createElement('OPTION');
            option.textContent = type.label;
            option.setAttribute('value', String(type));
            select.appendChild(option);

            // set the initial value
            if (type == options.data.type) option.selected = true;
        }
    }
};
