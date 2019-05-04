document.querySelector("#sign-up").addEventListener("submit", function(e){
    document.querySelector('input[name="username"]').value
    if(!isValid){
        e.preventDefault();    //stop form from submitting
    }
});