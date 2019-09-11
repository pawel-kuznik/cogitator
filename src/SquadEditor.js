/**
 *  This is a component that presents the user with an editor to edit a squad template.
 *  The component can be supplied with a brand new instance or one comming from storage.
 */

// the dependencies
const Component     = require('sparkle').Component;
const Form          = require('sparkle').Form;
const Type          = require('./SquadEditor/Type.js');
const Models        = require('./SquadEditor/ModelsList.js');

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

        // create the type input
        const typeForm = this.adopt(new Type({ data: squad }));

        // create the models component
        const models = this.adopt(new Models({ data: squad }));

        // wait for the component to be fully initialized
        this.then(() => {

            // assign title to the newly loaded content
            this.elem.querySelector('h1').textContent = squad.isStored ? 'Squad template ' + squad.name : 'New squad template';

            // install handling on the store button
            this.elem.querySelector('.button-store').addEventListener('click', () => {

                // push the type
                typeForm.push();

                // push changes from the name form
                nameForm.push();

                // push changes from the models list
                models.push();

                // and make sure the squad template is stored
                squad.store();

                // flush the changes
                squad.root.flush();

                // go to the list of squads
                window.location.hash = '#/squads';
            });
            
            // install handling on the delete button
            this.elem.querySelector('.button-remove').addEventListener('click', () => {

                // remove the squad from the root
                squad.root.delete(squad);

                // flush the changes
                squad.root.flush();

                // go to the list of squads
                window.location.hash = '#/squads';
            });

            // get the content
            const content = this.elem.querySelector('section > div');

            // append the name form top the div
            nameForm.appendTo(content);
            typeForm.appendTo(content);
            models.appendTo(content);
        });
    }
};
