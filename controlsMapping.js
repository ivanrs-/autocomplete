/**
 * Contains the objectives list to be used as selection
 * This will trigger the autosuggest population of selected HTML Controls
 */
const objectives = 
[
    {id: 1,text: "Discovery"},
    {id: 2,text: "Service"},
    {id: 3,text: "Value Proposition - Selling AZ"},
    {id: 4,text: "Category"},
    {id: 5,text: "Prospecting"}
]

/**
 * Returns a new Map containing arrays keypairs with:
 * [{ object keys linked to objective dropdown, [options array to be attached to awesomplete lists]},
 *  HTML element used for autosuggest (textarea)
 * ]
 * (key and value in Map can be in any data type)
 */
function ControlsMapping() {
    return new Map(
    [
        [
            [
                { id:'obj_desc', objective: 1, options: [ "Discovery-ObjDesc 1", "Discovery-ObjDesc 2", "Discovery-ObjDesc 3"]},
                { id:'obj_desc', objective: 2, options: [ "Service-ObjDesc 1", "Service-ObjDesc 2", "Service-ObjDesc 3"]},
                { id:'obj_desc', objective: 3, options: [ "Value...ObjDesc 1", "Value...ObjDesc 2", "Value...ObjDesc 3"]},
                { id:'obj_desc', objective: 4, options: [ "Category-ObjDesc 1", "Category-ObjDesc 2", "Category-ObjDesc 3"]},
                { id:'obj_desc', objective: 5, options: [ "Prospecting-ObjDesc 1", "Prospecting-ObjDesc 2", "Prospecting-ObjDesc 3"]}
            ], 
            document.getElementById('obj_desc')
        ],
        [
            [
                { id:'results', objective: 1, options: [ "Discovery-Result 1", "Discovery-Result 2", "Discovery-Result 3" ]},
                { id:'results', objective: 2, options: [ "Service-Result 1", "Service-Result 2", "Service-Result 3" ]},
                { id:'results', objective: 3, options: [ "Value...-Result 1", "Value...-Result 2", "Value...-Result 3" ]},
                { id:'results', objective: 4, options: [ "Category-Result 1", "Category-Result 2", "Category-Result 3" ]},
                { id:'results', objective: 5, options: [ "Prospecting-Result 1", "Prospecting-Result 2", "Prospecting-Result 3" ]}
            ], 
            document.getElementById('results')
        ],

        [
            [
                { id:'actions', objective: 1, options: [ "Discovery-Actions 1", "Discovery-Actions 2", "Discovery-Actions 3" ]},
                { id:'actions', objective: 2, options: [ "Service-Actions 1", "Service-Actions 2", "Service-Actions 3" ]},
                { id:'actions', objective: 3, options: [ "Value...-Actions 1", "Value...-Actions 2", "Value...-Actions 3" ]},
                { id:'actions', objective: 4, options: [ "Category-Actions 1", "Category-Actions 2", "Category-Actions 3" ]},
                { id:'actions', objective: 5, options: [ "Prospecting-Actions 1", "Prospecting-Actions 2", "Prospecting-Actions 3" ]}
            ], 
            document.getElementById('actions')
        ],

        [
            [
                { id: 'nextvisit', objective: 1, options: [ "Discovery-NextVisit 1", "Discovery-NextVisit 2", "Discovery-NextVisit 3" ]},
                { id: 'nextvisit', objective: 2, options: [ "Service-NextVisit 1", "Service-NextVisit 2", "Service-NextVisit 3" ]},
                { id: 'nextvisit', objective: 3, options: [ "Value...-NextVisit 1", "Value...-NextVisit 2", "Value...-NextVisit 3" ]},
                { id: 'nextvisit', objective: 4, options: [ "Category-NextVisit 1", "Category-NextVisit 2", "Category-NextVisit 3" ]},
                { id: 'nextvisit', objective: 5, options: [ "Prospecting-NextVisit 1", "Prospecting-NextVisit 2", "Prospecting-NextVisit 3" ]}
            ], 
            document.getElementById('next_visit')
        ]
    ])
}
