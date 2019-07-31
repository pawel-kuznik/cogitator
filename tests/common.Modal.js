/**
 *  Test case for Modal class.
 */

// the dependencies
const expect    = require('chai').expect;
const Modal     = require('../src/common/Modal.js');

describe('common.Modal', () => {

    describe('.shown', () => {

        it('should initially return false cause the modal is not shown', () => {

            // construct the modal
            const modal = new Modal();

            // check if it's not shown
            expect(modal.shown).to.be.false;
        });

        it('should expose the element', () => {

            // construct the modal
            const modal = new Modal();

            // check if it's object
            expect(modal.elem).to.be.instanceof(HTMLElement);
        });

        it('should tell true after we call .show()', () => {

            // construct the modal
            const modal = new Modal();

            // show the modal
            modal.show();

            // check if it's not shown
            expect(modal.shown).to.be.true;
        });

        it('should tell false after we call .hide()', () => {

            // construct the modal
            const modal = new Modal();

            // show the modal
            modal.show();

            // hide the modal
            modal.hide();

            // check if it's not shown
            expect(modal.shown).to.be.false;
        });
    });
});
