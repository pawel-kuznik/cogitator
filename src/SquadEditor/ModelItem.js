/**
 *  This is a special component that represents a model template.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 *  @file       src/SquadEditor/ModelItem.js
 */

// the depenendencies
const Item = require('../common/EditorItem.js');

// export the class
module.exports = class extends Item {

    /**
     *  The constructor.
     *  @param  408k.ModelTemplate
     */
    constructor(data) {

        // constructor parent
        super(data);

        // assign the name of the name of the template
        this.content.textContent = data.name || '[ unknown model name ]';
    }
};
