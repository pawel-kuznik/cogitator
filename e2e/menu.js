/**
 *  Test case to check if the main menu renders correctly.
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

describe("Main menu", function() {

    before(function(browser, done) {

        // navigate to the page
        browser.url('http://localhost:8080', () => done());
    });

    after(function(browser, done) {

        // end session
        browser.end(() => done());
    });

    it('should be visible from the start', browser => {

        // check if the navigation is there
        browser.expect.element('body > nav').to.be.present;
    });

    it('should contain link to home page', browser => {

        // check if it contains homepage link
        browser.expect.element('body > nav [href="/#/"]').to.be.present;
    });

    it('Should contain link to squad templates page', (browser) => {

        // check if it contains squad templates link
        browser.expect.element('body > nav [href="/#/squads"]').to.be.present;
    });
});
