/**
 *  Test case for common.ModalManager class.
 */

// the dependencies
const expect        = require('chai').expect;
const ModalManager  = require('../src/common/ModalManager.js');
const Modal         = require('../src/common/Modal.js');

describe('common.ModalManager', () => {

    describe('.add()', () => {

        it('should create a new modal', () => {

            // construct the manager
            const manager = new ModalManager();

            // add a modal
            const modal = manager.add(new Modal);

            // expect a modal
            expect(modal).to.be.instanceof(Modal);
        });

        it('should increased the size of the manager', () => {

            // construct the manager
            const manager = new ModalManager();

            // add a modal
            manager.add(new Modal);

            // expect a modal
            expect(manager.size).to.be.equal(1);
        });
    });

    describe('.clear()', () => {

        it('should render the size 0', () => {

            // construct the manager
            const manager = new ModalManager();

            // add a modal
            manager.add(new Modal);

            // clear all modals
            manager.clear();

            // expect a modal
            expect(manager.size).to.be.equal(0);
        });
    });
});
