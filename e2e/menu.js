/**
 *  Test case to check if the main menu renders correctly.
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

describe("Check menu", function() {

    it('Should contain important links', (browser) => {

        browser
            .url('http://localhost:8080')
            .expect.element('body > nav').to.be.present.before(200);
    });
});
