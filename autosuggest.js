/** 
 * Autosuggest Notes V1.1.0
 * Author: Ivan Ramos <rs.jivan@gmail.com>
 * Updated: MAY 08, 2020
 * Description: Provides autocomplete and suggestions capabilities
 *              for notes field so users can improve their time by
 *              using predefined sentences or words.
 * Changes:
 * IR MAY 08, 2020: Initial testings, using IIFE 🍃 
 * IR May 20, 2020: Destructure implementation for multiple controls 🧬 
 * IR May 21, 2020: Independent controls data source and unified event listeners 🐜 
 * IR May 22, 2020: Separate logic for controls mapping into external js file,
 *                  added patch to fix not working <ul> clearing action when changing objective
 */
// Using Revealing Module Pattern
Suggest = (() => {
    let suggestInputs = ControlsMapping()    

    /**
     * Main exposed function to initialize controls and attach events
     * - Populate main dropdown objective
     * - Add event listeners to controls
     */
    initialize = () => {        
        addObjectives()
        addListeners()
    }
    
    /**
     * Populate objectives dropdown from objectives array of objects
     */
    addObjectives = () => {
        let dropdown = document.getElementById('objective');
        dropdown.length = 0;

        let defaultOption = document.createElement('option');
        defaultOption.text = '';

        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;
        
        objectives.forEach((key) =>{
            let option = new Option(key.text,key.id)
            dropdown.add(option);
        })
    }    
    /**
     * Add listeners to HTMLElements
     */
    addListeners = () => {
        // Objective dropdown instatiation as SemanticUI dropdown
        // with onChange event event attached internally.
        // (using jquery since it's dependant for the SemanticUI)
        $('#objective').dropdown({
            onChange: function (objectiveId, text) {
                console.log('Objective:', objectiveId, '-', text);
                // Set items source every time the objective changes
                setItemsSource(objectiveId)
            }
        });

        // Avoid 
        for (const input of suggestInputs.values()) {
            input.addEventListener('keyup', (e) => {
                let code = (e.keyCode || e.which);
                // escape left, righ, up, down arrows.. escape, enter keys
                if (code === 37 || code === 38 || code === 39 || code === 40 || code === 27 || code === 13)
                    return;
            })

            // Add change event to all HTMLElement contained in main Map object
            input.addEventListener('change', () => {
                notes.save(suggestInputs)
            })
        }

        // Submit listener
        document.getElementById('submit').addEventListener('click', (e) => {
            notes.save(suggestInputs)
        })
    }
    /**
     * Based on objective selection, loop through map controls
     * and instatiate the Awesomplete class to them
     * @param {int} objectiveId (selected option from objective) 
     */
    setItemsSource = (objectiveId) => {
        // {Patch} 🦜 Clear previously autogenerated <ul> when repopulating 
        // awesomplete behavior is adding new list to previously defined 
        $("ul").each(function () {
            $(this).remove()
        })

        //(value, key) => from Map
        // HTMLElement is placed in value pair and {objective->options} is placed in key pair
        suggestInputs.forEach((input, key) => {
            key // -> { id:'someid', objective: 1, options: [ "text1", "text2", "text3"...]},
                // get only the object where objective == objectiveId
                .filter(mappedControl => mappedControl.objective == objectiveId)
                // from filtered 'control' send the input (value key pair) and the filtered options for instatiation
                .map(control => setAutoSuggest(input, control.options))
        })
    }
    
    // Exposed needed methods
    return{
        initialize
    }
    
})();

/**
 * Set HTML DOM element as AutoSuggest
 * (Object literal notation 'pattern')
 * @param {HTMLElement} element 
 * @param {array} dataList
 */
let setAutoSuggest = (element, dataList) =>{
  
    return new Awesomplete(element, {
        list: dataList,
        filter: function (text, input) {
            return Awesomplete.FILTER_CONTAINS(text, input.match(/[^ ]*$/)[0]);
        },

        item: function (text, input) {
            return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
        },

        replace: function (text) {
            let before = this.input.value.match(/^.+ \s*|/)[0];
            this.input.value = before.trim() + " " + text.trim() + " ";
        }
    })
}

/**
 * Notes operations
 * (Revealing Module Pattern)
 */
const notes = (() =>{
    let finalNotes = document.getElementById('final_notes')

    save = (suggestInputs) => {
        let note = ''
        for (const input of suggestInputs.values()) {
            note += input.value + ' '
        }

        //alert('Proceed to save?\n' + note.trimStart() )
        finalNotes.textContent = note.trimStart()
    }
    return {
        save
    }
})()


