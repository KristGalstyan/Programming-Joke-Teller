"use strict";
const button = document.querySelector('#button'),
    audioElement = document.querySelector('#audio');


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passign joke to VoiceRSS API
function tellMe(joke) {
 console.log(joke);
    console.log(joke);
    VoiceRSS.speech({
        key: 'cd6f4f9aec244512b6f528b0fc9f09ce',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&idRange=0-185';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) { }
}
// getJokes();

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);