

module.exports = function(keywords, entity) {

    keywords = keywords.split(',').map(k => k.trim()).filter(keyword => {

        // lowercase the keword
        const lowercased = keyword.toLowerCase();

        // check if the name includes the keyword
        if (entity.name.toLowerCase().includes(lowercased)) return false;

        // get classes from the 408k lib
        const classes = require('408k');

        // if we are dealing with a squad template we want to check the keywords also
        if (entity instanceof classes.SquadTemplate) {

            // check if keywords match
            if (entity.keywords.includes(lowercased)) return false;

            // check if faction keywords match
            if (entity.factionKeywords.includes(lowercased)) return false;

            // check the squad type
            if (entity.type.toString().toLowerCase().includes(lowercased)) return false;
            if (entity.type.label.toLowerCase().includes(lowercased)) return false;
        }

        // no match
        return true;
    });

    console.log(keywords);

    // no remaining keywords? then that means we have a hit on every keyword
    return !keywords.length;
};
