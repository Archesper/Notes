var nav = new Vue({
    delimiters: ["((", "))"],
    el: '#nav',
    data: {
        button_1: true,
        button_2: false,
        button_3: false,
    },
    methods: {
        toggle(event) {
            button_id = event.target.id;
            if (button_id === '1') {
                this.button_1 = vm1.$data.seen = true
                this.button_2 = vm2.$data.seen = false
                this.button_3 = vm3.$data.seen = false
                load_notes()
            } else if (button_id === '2') {
                this.button_1 = vm1.$data.seen = false
                this.button_2 = vm2.$data.seen = true
                this.button_3 = vm3.$data.seen = false
            } else {
                this.button_1 = vm1.$data.seen = false
                this.button_2 = vm2.$data.seen = false
                this.button_3 = vm3.$data.seen = true
            }
        }
    }
})

var vm1 = new Vue({
    delimiters: ["((", "))"],
    el: '#vm1',
    data: {
        seen: true,
        notes: [],
    },
})
var vm2 = new Vue({
    el: '#vm2',
    data: {
        seen: false,
        category: 'studying',
    },
    methods: {
        categorize(event) {
            new_category = event.target.value
            this.category = new_category
        },
        new_note(event) {
            console.log(event)
            fetch('add_note/', {
                method: 'POST',
                body: JSON.stringify({
                    title: event.target.title.value,
                    body: event.target.body.value,
                    image: event.target.image.value,
                    category: event.target.category.value,
                })
            })
            .then(load_notes())
            .then(function () {
                    nav.$data.button_1 = vm1.$data.seen = true
                    nav.$data.button_2 = vm2.$data.seen = false
                    nav.$data.button_3 = vm3.$data.seen = false
                })
        }
    }
})
var vm3 = new Vue({
    el: '#vm3',
    data: {
        seen: false,
    },
        methods: {
            back(event) {
                nav.$data.button_1 = vm1.$data.seen = true
                nav.$data.button_2 = vm2.$data.seen = false
                nav.$data.button_3= vm3.$data.seen = false
            },
            wipe(event) {
                fetch('wipe', {
                    method: 'DELETE'
                })
                .then(function() {
                    load_notes()
                    nav.$data.button_1 = vm1.$data.seen = true
                    nav.$data.button_2 = vm2.$data.seen = false
                    nav.$data.button_3= vm3.$data.seen = false
                })
            }
        }
})
Vue.component('note', {
    delimiters: ['((', '))'],
    props: ['note'],
    template: `
        <li class="list-group-item" v-bind:class="note.category">
            <h3> ((note.title)) <span> ((note.time)) </span> <svg v-bind:data-note="note.id" onclick="del(event)"
                 width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path v-bind:data-note="note.id" onclick="del(event)" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg> 
            </h3>
            <img v-if="note.image" v-bind:src="note.image">
            <p> ((note.body)) </p>
        </li>`
})
function load_notes() {
    fetch('/note')
        .then(response => response.json())
        .then(notes => {
            vm1.$data.notes = notes
        })
}
function del(event) {
            console.log(event.target)
            id = event.target.dataset.note
            fetch(`delete/${id}`, {
                method: 'DELETE'
            })
            .then(setTimeout('load_notes()', 700))
        }
document.addEventListener('DOMContentLoaded', function () {
    load_notes()
})