/**
 *  This is a kickstart file for the tests. We have it like this cause we want
 *  to use our regular environment (commonjs modules compiled with browserify).
 *  To achieve this we need to compile tests just like we would compile the
 *  actual application.
 */

// require all tests
require('./common.Modal.js');
require('./common.ModalContainer.js');
