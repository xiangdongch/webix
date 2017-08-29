define([
    'views/adult/list',
    'views/adult/searchForm'
], function (list, searchForm) {
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