const userInput = document.getElementById("userinput");
const inputForm = document.getElementById("inputform");


const getGoDaddyTLDS = async()=>{
    const requests = await fetch('../godaddy_TLDS.json');
    const data = await requests.json();
    return data;
};

const getDomainStatus = async (tlds)=>{
};


const doUserInput = (userInput) => {
    const goDaddy = getGoDaddyTLDS();
    goDaddy
    .then((supportedTlds)=>{
        getDomainStatus(supportedTlds);
    })
    .catch((err)=>{
        console.error(err);
    });
};

inputForm.addEventListener("submit", (e)=>{
    doUserInput(userInput.value);
    e.preventDefault();
});


fetch("http://localhost:5000/lookup/jfksdjlsfjl-sfd")
.then(resp=>{
    const data = resp.json();
    return data;
})
.then(resp=>{
    console.log(resp);
})