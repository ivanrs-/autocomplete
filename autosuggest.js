/** 
 * Autosuggest Notes V1.0.1
 * Author: Ivan Ramos <rs.jivan@gmail.com>
 * Updated: MAY 08, 2020
 * Description: Provides autocomplete and suggestions capabilities
 *              for notes field so users can improve their time by
 *              using predefined sentences or words.
 * Changes:
 * IR MAY 08, 2020: Initial testings, using IIFE 
 */
AutoSuggest = (() => {
    const submit = document.getElementById('submit')
    let content = document.getElementById('notes')
    let noteAutoSuggest = null;

    initControl = () => {
        noteAutoSuggest = new Awesomplete(content, {
            //list: ["hello", "my", "name", "is", "ari"],
            filter: function (text, input) {
                return Awesomplete.FILTER_CONTAINS(text, input.match(/[^ ]*$/)[0]);
            },

            item: function (text, input) {
                return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
            },

            replace: function (text) {
                let before = this.input.value.match(/^.+ \s*|/)[0];
                this.input.value = before + text + " ";
            }
        })
    };

    /**
     * Add listeners to DOM elements
     * content -> textarea for notes input
     * submit  -> submit button
     */
    addListeners = () => {
        // Text area listener
        content.addEventListener('keyup', (e) => {
            let code = (e.keyCode || e.which);
            if (code === 37 || code === 38 || code === 39 || code === 40 || code === 27 || code === 13)
                return;
            // Set control source for data sentences
            setSource()
        });

        // Submit listener
        submit.addEventListener('click', (e) => {
            Notes.save(content.value)
        });      
    };

    /**
     * 
     */
    setSource = () => {
        //noteAutoSuggest.list= ["hello", "my", "name", "is", "ari"];
        const murl = 'https://type.fit/api/quotes';
        fetch(murl).then(r =>
            r.json()).then(d => {
            noteAutoSuggest.list = d.map(r => r.text);
        });
    }

    // Expose needed methods
    return{
        initControl,
        addListeners
    }
    
})();


/**
 * Notes operations
 */
const Notes =(() => {
    save = (note) =>  {
        alert('Proceed to save?\n' + note)
        document.getElementById('final').value(note)
    }

    return{
        save
    }
})();