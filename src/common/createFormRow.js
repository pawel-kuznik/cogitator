
/**
 *  A helper function to create a form row element.
 *  @param  string          The row label
 *  @return HTMLElement     The element representing the form row. Inputs can
 *                          be appended to it.
 */
module.exports = function(labelText) {

    // construct the form row
    const row = document.createElement('DIV');
    row.classList.add('formrow');

    // construct the label
    const label = document.createElement('LABEL');
    label.textContent = labelText;
    row.appendChild(label);

    // return the row
    return row;
};
