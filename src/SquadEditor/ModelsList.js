/**
 *  This is a component that allows managing list of models associated
 *  with a squad template. 
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 *  @file       src/SquadEditor/ModelsList.js
 */

// the dependencies
const EditorList    = require('../common/EditorList.js');
const ModelEditor   = require('../ModelTemplateEditor.js');
const Item          = require('../common/EditorItem.js');

// export the component
module.exports = class extends EditorList {

    /**
     *  The constructor.
     */
    constructor(options) {

        // call the parent constructor
        super({
            data         :  options.data,
            FormComponent:  ModelEditor,
            ItemComponent:  Item
        });
    }
};
