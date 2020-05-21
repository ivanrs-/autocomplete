/** 
 * Autosuggest Notes V1.0.2
 * Author: Ivan Ramos <rs.jivan@gmail.com>
 * Updated: MAY 08, 2020
 * Description: Provides autocomplete and suggestions capabilities
 *              for notes field so users can improve their time by
 *              using predefined sentences or words.
 * Changes:
 * IR MAY 08, 2020: Initial testings, using IIFE 🍃 
 * IR May 20, 2020: Destructure implementation for multiple controls 🧬 
 * IR May 21, 2020: Independent controls data source and unified event listeners 🐜 
 */

// Using Revealing Module Pattern
Suggest = (() => {
    // key and value in Map can be in any data type
    // for testing I'm using an [object,DOM Element] key pairs
    let suggestInputs = new Map([
        [{
            id: 'obj_desc',
            url: 'https://jsonplaceholder.typicode.com/posts',
            jkey: 'title'
        }, document.getElementById('obj_desc')],
        [{
            id: 'result',
            url: 'https://jsonplaceholder.typicode.com/posts',
            jkey: 'body'
        }, document.getElementById('results')],
        [{
            id: 'result',
            url: 'https://jsonplaceholder.typicode.com/photos',
            jkey: 'title'
        }, document.getElementById('actions')],
        [{
            id: 'nextVisit',
            url: 'https://type.fit/api/quotes',
            jkey: 'text'
        }, document.getElementById('next_visit')]
    ])
    
    console.dir(suggestInputs);

    initialize = () => {
        setItemSource()
        addListeners()
    }

    setItemSource = async () => {
        // Return new initialization of awesomplete
        for (const [key,input] of suggestInputs) {
            let element = setAutoSuggest(input)
            //   element.list = ["hello", "my", "name", "is", "ari"];
            let response = await fetch(key.url)
            let data = await response.json()
            element.list = data.map(r => r[key.jkey])
        }
    }
    
    /**
     * Add listeners to DOM elements
     */
    addListeners = () => {
        for (const input of suggestInputs.values()) {
            input.addEventListener('keyup', (e) => {
                let code = (e.keyCode || e.which);
                if (code === 37 || code === 38 || code === 39 || code === 40 || code === 27 || code === 13)
                    return;
            })

            input.addEventListener('change', () => {
                notes.save(suggestInputs)
            })
        }

        // Submit listener
        document.getElementById('submit').addEventListener('click', (e) => {
            notes.save(suggestInputs)
        })
    }
    // Expose needed methods
    return{
        initialize
    }
    
})();

/**
 * Set HTML DOM element as AutoSuggest
 * (Object literal notation 'pattern')
 * @param {HTMLElement} element 
 */
let setAutoSuggest = (element) =>{
    return new Awesomplete(element, {
        //list: ["hello", "my", "name", "is", "ari"],
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
const notes = (function() {
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