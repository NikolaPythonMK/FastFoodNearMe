const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");
const btn = document.getElementById("submit");
const output = document.getElementById("output");
const form = document.getElementById("myForm");

function handleForm(event) { event.preventDefault(); }

btn.addEventListener("click", function(){

    fetch("http://localhost:8080/app/contact?name="+nameEl.value+"&email="+emailEl.value+"&message="+msgEl.value, {
        method: 'POST',

    }).then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));



    nameEl.value = "";
    emailEl.value = "";
    msgEl.value = "";
    output.textContent = "the message was successfully sent."
})

form.addEventListener('submit', handleForm);