document.querySelector("#myForm").addEventListener("submit", function(e){
    if(!isValid){
        e.preventDefault();    //stop form from submitting
    }
});