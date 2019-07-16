/**
 *  The kickstart file. Basically this file registers all router routes,
 *  loads the data stores, and eventually starts the actual application.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// dependencies
const Router            = require('waystone').Router;
const Container         = require('sparkle').Container;
const TemplateStore     = require('408k').TemplateStore;
const WebLocalStorage   = require('pocketdata').LocalWebStorage;

// the template store
const templateStore = new TemplateStore(new WebLocalStorage('templates'));

// install on document loaded event
document.addEventListener('DOMContentLoaded', () => {

    // tell that the application starts
    console.info('starting application');

    // construct a router
    const router = new Router();

    // construct the main container
    const container = new Container();

    // append the container to the body
    container.appendTo(document.querySelector('body'));

    // define all routes
    router.append('/squads',            () => { container.install(require('./Squads.js'), templateStore); });
    router.append('/create-squad',      () => { container.install(require('./SquadEditor.js'), templateStore.buildSquad()); });
    router.append('/squads/:id',        params => { container.install(require('./SquadEditor.js'), templateStore.fetchSquad(params.id)); });
    
    // the function to resolve the router with current path
    const resolve = () => { router.resolve(window.location.hash.substring(1)); };

    // when the data is loaded we can continue
    templateStore.reload().then(() => {

        // resolve the path
        resolve();

        // make sure the path changes the current component
        window.addEventListener('hashchange', () => { resolve(); });
    });
});

