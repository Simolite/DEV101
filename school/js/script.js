function add() {
    const input = document.getElementById('search');
    const ul = document.getElementById('list');
    const li = document.createElement('li');
    li.innerHTML = input.value;
    ul.appendChild(li);
    if (input.value == `<script>alert('XSS Attack!');</script>`) {
        alert('XSS Attack!');
    }else if (input.value == `<script>console.log('Hacked !!');</script>`) {
        console.log('Hacked !!');
    }
    input.value = '';
}