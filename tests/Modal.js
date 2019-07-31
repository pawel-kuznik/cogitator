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
});
