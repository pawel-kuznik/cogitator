/**
 *  This is a component that presents the user with an editor to edit a squad template.
 *  The component can be supplied with a brand new instance or one comming from storage.
 */

// the dependencies
const Component     = require('sparkle').Component;
const Form          = require('sparkle').Form;

// export the class
module.exports = class extends Component {

    /**
     *  The constructor.
     *  @param  408k.SquadTemplate
     */
    constructor(squad) {

        // call the parent
        super({ template: '/templates/editor.html' });

        // create the name form
        const nameForm = this.adopt(new Form({ data: squad, template: '/templates/squadForm.html' }));

        // wait for the component to be fully initialized
        this.then(() => {

            // assign title to the newly loaded content
            this.elem.querySelector('h1').textContent = squad.isStored ? 'Squad template ' + squad.name : 'New squad template';

            // install handling on the store button
            this.elem.querySelector('.button-store').addEventListener('click', () => {

                // push changes from the name form
                nameForm.push();

                // and make sure the squad template is stored
                squad.store();

                // flush the changes
                squad.root.flush();

                console.log('squad stored');
            });
            
            // install handling on the delete button
            this.elem.querySelector('.button-remove').addEventListener('click', () => {

                // remove the squad from the root
                squad.root.delete(squad);

                // flush the changes
                squad.root.flush();
            });

            // append the name form top the div
            nameForm.appendTo(this.elem.querySelector('section > div'));


        });

        // install on submitted handler
        this.on('submit', event => {

            // store the 
            this.data.store();

            console.log(event);
        });
    }

};
