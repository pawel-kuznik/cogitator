/**
 *  This is our own custom storage mechanism for 408k.TemplateStore. This
 *  one will utilize local storage of the browser, but will also depend
 *  on templates.json file served from the local webserver. The file is
 *  optional.
 *
 *  This file will only load if the local storage contains no data.
 */

// the dependencies
const WebLocalStorage   = require('pocketdata').LocalWebStorage;

// export the class
module.exports = class extends WebLocalStorage {

    /**
     *  Override the constructor.
     */
    constructor() {

        // call the parent with the name of the local storage entry
        super('templates');
    }

    /**
     *  The overriden object store.
     *  @param  pocketdata.ObjectStore
     *  @return Promise
     */
    pull(objectStore) {

        // if the LocalStorage entry is populated we will make sure to use
        // parent logic to pull data
        if (window.localStorage.getItem('templates')) return super.pull(objectStore);

        // construct a request for templates data
        const request = new Request('/templates.json');

        // make the request
        return fetch(request).then(response => {

            // no file? try with parent
            if (!response.ok) return super.pull(objectStore);

            // set the pulled data in the local storage
            window.localStorage.setItem('templates', response.text());

            // and after initialized object store we can pull data from local storage
            return super.pull(objectStore);

        }, () => {

            // just for fun ask the parent to pull data again
            return super.pull(objectStore);
        });
    }
};
