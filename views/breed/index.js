define([
    'views/breed/relativeCheck',
    'views/breed/reproduce'
], function (relativeCheck, reproduce) {
    return {
        $ui: {
            type: "space",
            // type: "wide",
            rows: [
                relativeCheck,
                reproduce,
                {}
            ]
        }
    };
});