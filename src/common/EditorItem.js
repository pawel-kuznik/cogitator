/**
 *  This is a fellow component to the EditorList component. It can be used to
 *  create editable items in various editors.
 *
 *  @authot     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the dependenceis
const Component = require('sparkle').Component;

// the privates
const data = Symbol('data');

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  mixed   The data assigned to the item.
     */
    constructor(_data) {

        // call the parent
        super();

        this[data] = _data;

        const label = document.createElement('SPAN');
        label.textContent = _data.name;
        this.elem.appendChild(label);
    }

    /**
     *  Get the assigned data
     *  @var    mixed
     */
    get data () { return this[data]; }
};
