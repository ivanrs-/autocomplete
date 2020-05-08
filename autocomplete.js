function autocomplete() {
    const input = document.getElementById('notes');
    const awesomplete = new Awesomplete(input, {
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
    });

    input.addEventListener('keyup', (e) => {
        var code =
            (e.keyCode || e.which);
        if (code === 37 || code === 38 || code === 39 || code ===
            40 || code === 27 || code === 13) {
            return;
        } else {
            const murl =
                'https://jsonplaceholder.typicode.com/comments';
            fetch(murl).then(r =>
                r.json()).then(d => {
                awesomplete.list = d.map(r => r.name);
            });
        }
    });
}