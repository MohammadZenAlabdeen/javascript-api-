const username=document.querySelector("#user");
const pass=document.querySelector("#password");
const login=document.querySelector("#login");
const logout=document.querySelector("#out");
const form=document.querySelector("form");
const info=document.querySelector(".get > .contain");
const h1=document.querySelector(".get > h1");
let u,p;
logout.style.display="none";
info.style.display="none";
h1.style.display="none";
login.addEventListener("click",(event)=>{
    event.preventDefault();
        fetch("https://test.lavetro-agency.com/api/login_admin",{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },redirect: "follow",
    body:JSON.stringify({
        "name" : username.value , "password" : pass.value
    })
    }).then(res => res.json())
            .then(res=>localStorage.setItem("token",`Bearer ${res.token}`)).then(res=>{
                if(localStorage.getItem("token")!="Bearer undefined"){
                    logout.style.display="block";
                    form.style.display="none";
                    info.style.display="grid";
                    h1.style.display="block";
                    }
                    else{
                        form.innerHTML+="<p>Wrong info</p>"
            
                    }

            })
            info.innerHTML="";
            fetch("https://reqres.in/api/users",{
                headers:{
                    'Accept': 'application/json',
                    "Authorization" : localStorage.getItem("token")
                }
            }).then(res=>res.json()).then(res=>{res.data.forEach(element => {
                info.innerHTML+=`<div class="card">
                <img src="${element.avatar}">
                <h1>${element.first_name} ${element.last_name}</h1>
                <p>${element.email}</p>
                </div>`
            });})
         
            
            
})




logout.addEventListener("click",()=>{
    fetch("https://test.lavetro-agency.com/api/logout",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).then(res=>res.json()).then(localStorage.removeItem("token")).then(location.reload())

})


