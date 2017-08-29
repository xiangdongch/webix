define([
    'views/youngDog/searchForm',
    'views/youngDog/list'
], function (searchForm, list) {
    return {
        $ui: {
            type: "space",
            // type: "wide",
            rows: [
                searchForm,
                list
            ]
        }
    };
});