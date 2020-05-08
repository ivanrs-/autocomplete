
let notes = document.getElementById('notes')
let submit = document.getElementById('submit')
// Submit listener
document.getElementById('submit').addEventListener('click', (e) => {
    let data = new Notes(notes.value)
    data.save()
});

class AutoSuggest{
    constructor(input){
        this.input = input
    }
    
    initControl(){
        this.noteAutoSuggest = new Awesomplete(this.input, {
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
    }

    addListener(){
        this.input.addEventListener('keyup', (e) => {
            let code = (e.keyCode || e.which);
            if (code === 37 || code === 38 || code === 39 || code === 40 || code === 27 || code === 13)
                return;
            
            const murl = 'https://jsonplaceholder.typicode.com/comments';
                fetch(murl).then(r =>
                    r.json()).then(d => {
                    this.noteAutoSuggest.list = d.map(r => r.name);
            });
        });
    }
}

class Notes{
    constructor(notes){
        this.notes = notes
    }

    save(){
        alert('Proceed to save?\n'+this.notes)
    }
}

(() => {
    document.onreadystatechange =  () => {
        if (document.readyState === 'interactive') {
            let note = new AutoSuggest(notes)
            note.initControl();
            note.addListener()
        }
    }
})()