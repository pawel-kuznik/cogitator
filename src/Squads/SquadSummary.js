/**
 *  This is a specialized widget to show squad template summary. 
 */ 

// the dependencies
const Component = require('sparkle').Component;

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     */
    constructor(squad) {

        // call the parent
        super();

        // create a line with the name
        const name = document.createElement('DIV');
        name.textContent = squad.name;
        this.elem.append(name);

        // the second line
        const second = document.createElement('SPAN');
        this.elem.append(second);

        // add squad type to the second line
        second.textContent += squad.type.label;
    }
};
