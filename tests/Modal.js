/**
 *  Test case for Modal class.
 */

// the dependencies
const expect    = require('chai').expect;
const Component = require('sparkle').Component;
const Modal     = require('../src/Modal.js');

describe('Modal', () => {

    describe('.component', () => {

        it('should expose a component mounted in the constructor', () => {

            // construct the modal
            const modal = new Modal(Component);

            // expect the property to expose a component
            expect(modal.component).to.be.instanceof(Component);
        });
    });

    describe('.shown', () => {

        it('should initially return false cause the modal is not shown', () => {

            // construct the modal
            const modal = new Modal(Component);

            // check if it's not shown
            expect(modal.shown).to.be.false;
        });

        it('should tell true after we call .show()', () => {

            // construct the modal
            const modal = new Modal(Component);

            // show the modal
            modal.show();

            // check if it's not shown
            expect(modal.shown).to.be.true;
        });

        it('should tell false after we call .hide()', () => {

            // construct the modal
            const modal = new Modal(Component);

            // show the modal
            modal.show();

            // hide the modal
            modal.hide();

            // check if it's not shown
            expect(modal.shown).to.be.false;
        });
    });
});
