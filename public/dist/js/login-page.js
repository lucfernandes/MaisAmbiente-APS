// View Password
const imgViewPassword = document.getElementById("viewPasswordImg");
const inputPassword = document.getElementById("inputPassword");

imgViewPassword.addEventListener('click',()=>{
    if(inputPassword.getAttribute('type') == "password"){
        inputPassword.setAttribute('type',"text");
        imgViewPassword.setAttribute('src',"dist/icon/eye-regular.svg");
    }else{
        inputPassword.setAttribute('type',"password");
        imgViewPassword.setAttribute('src',"dist/icon/eye-slash-regular.svg");
    }
})
