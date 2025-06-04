let screen = document.querySelector('input');
const btn = document.querySelector('button');
const url = 'https://icanhazdadjoke.com/';
btn.addEventListener('click',getjoke);

async function getjoke() {
    try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        });

        const data = await response.json();
        screen.value = data.joke;
      } catch (error) {
        screen.value = 'Failed to load joke. Try again.';
        console.error(error);
      }
}