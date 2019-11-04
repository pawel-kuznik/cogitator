/**
 *  This is a fellow component to the EditorList component. It can be used to
 *  create editable items in various editors.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 *  @file       src/common/EditorItem.js
 */

// the dependenceis
const Component = require('sparkle').Component;

// the privates
const data      = Symbol('data');
const content   = Symbol('content');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  mixed   The data assigned to the item.
     */
    constructor(_data) {

        // call the parent
        super();

        // add the editoritem class so all of them look the same
        this.elem.classList.add('item');

        // assign the data instance
        this[data] = _data;

        // construct the content element of the item
        this[content] = document.createElement('DIV');
        super.content.append(this[content]);

        // add the controls section
        const controls = document.createElement('DIV');
        super.content.append(controls);

        // the remove button
        const remove = document.createElement('BUTTON');
        remove.textContent = 'Remove';
        controls.append(remove);

        // install onclick handler
        remove.addEventListener('click', () => {

            // remove the stored data
            _data.root.delete(_data);

            // trigger event telling that the data was deleted
            this.triggerer.triggerEvent('deleted');

            // and remove us cause the underlaying data was removed
            this.remove();
        });
    }

    /**
     *  Get access to the content element of this component.
     *  @return Element
     */
    get content() { return this[content]; }

    /**
     *  Get the assigned data
     *  @var    mixed
     */
    get data () { return this[data]; }
};
