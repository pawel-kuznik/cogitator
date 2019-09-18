

const Component = require('sparkle').Component;

const data = Symbol('data');

module.exports = class extends Component {

    constructor(_data) {

        super();

        this[data] = _data;

        const label = document.createElement('SPAN');
        label.textContent = _data.name;
        this.elem.appendChild(label);
    }

    get data () { return this[data]; }
};
