  
// View Password
const imgViewPassword = document.getElementById("viewPasswordImg");
const inputPassword = document.getElementById("inputPassword");

imgViewPassword.addEventListener('click',()=>{
    if(inputPassword.getAttribute('type') == "password"){
        inputPassword.setAttribute('type',"text");
        imgViewPassword.setAttribute('src',"/img/eye-regular.svg");
    }else{
        inputPassword.setAttribute('type',"password");
        imgViewPassword.setAttribute('src',"/img/eye-slash-regular.svg");
    }
})
