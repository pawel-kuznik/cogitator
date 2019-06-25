/**
 *  The kickstart file.
 */

// dependencies
const Router        = require('waystone').Router;
const Container     = require('sparkle').Container;
const TemplateStore = require('408k').TemplateStore;

// install on document loaded event
document.addEventListener('DOMContentLoaded', () => {

    // tell that the application starts
    console.info('starting application');

    // the template store
    const templateStore = new TemplateStore();

    // construct a router
    const router = new Router();

    // construct the main container
    const container = new Container();

    // append the container to the body
    container.appendTo(document.querySelector('body'));

    // define all routes
    router.append('/squads',            () => { container.install(require('./Squads.js')); });
    router.append('/squads/create',     () => { container.install(require('./SquadForm.js'), templateStore.buildSquad()); });
    router.append('/squads/:id',        params => { container.install(require('./SquadForm.js')), templateStore.fetchSquad(params.id); });
    
    // the function to resolve the router with current path
    const resolve = () => { router.resolve(window.location.hash.substring(1)); };

    // resolve the path
    resolve();

    // make sure the path changes the current component
    window.addEventListener('hashchange', () => { resolve(); });
});

