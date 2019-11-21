const userInput = document.getElementById("userinput");
const inputForm = document.getElementById("inputform");
const resultsArea = document.getElementById("results");
const resultsAreaTemplate = document.getElementById("result-item-template");



function listenChangesinArray(arr,callback){
    // Add more methods here if you want to listen to them
   ['pop','push','reverse','shift','unshift','splice','sort'].forEach((m)=>{
       arr[m] = function(){
                    var res = Array.prototype[m].apply(arr, arguments);  // call normal behaviour
                    callback.apply(arr, arguments);  // finally call the callback supplied
                    return res;
                }
   });
}

const clearUI = (area=resultsArea)=>{
    area.querySelectorAll('*').forEach(n => n.remove());
}

const renderLoadingState = (repeat=3, clear=false)=>{
    if(clear) clearUI();
    const loadingTemplate = document.getElementById("loading-state");  
    let loadingNode = loadingTemplate.content.cloneNode(true);
    resultsArea.appendChild(loadingNode);
    for(let i=0; i< repeat -1;i++){
        loadingNode = loadingTemplate.content.cloneNode(true);
        resultsArea.appendChild(loadingNode);
    }
}

const renderEmptyMessageState = (error=false, message=false, clear=false)=>{
    if(clear) clearUI();
    const emptyTemplate = document.getElementById("empty-state");
    const emptyNode =  emptyTemplate.content.cloneNode(true);
    const bgClass = (!error) ? "bg-gray-200" : "bg-red-200";
    const nodeMessage = (!message) ? "Start by searching" : message;
    emptyNode.querySelector("div").classList.add(bgClass);
    emptyNode.querySelector("p").innerText=nodeMessage;
    resultsArea.appendChild(emptyNode);
}


const filter_nameAvailable = item => (!!item.purchasePrice == true);
const filter_exactName = (item) =>{
    let a = item.sld.toLowerCase();
    let b = userInput.value.replace(" ","").trim().toLowerCase();
    return (a==b) ?true:false
};

const appendUI = (newItems)=>{
    const availableDomains = newItems.filter(filter_nameAvailable).filter(filter_exactName);
    const sortByPrice = availableDomains.sort((a, b) => parseFloat(a.purchasePrice) - parseFloat(b.purchasePrice));
    if(sortByPrice.length < 1) {
        renderEmptyMessageState(false, "No results");
    }
    availableDomains.forEach(item=>{
        const newNode = resultsAreaTemplate.content.cloneNode(true);
        newNode.querySelector("#tld").innerText="."+item.tld;
        newNode.querySelector("#sld").innerText=item.sld;
        newNode.querySelector("#price").innerText="$"+item.purchasePrice;
        resultsArea.appendChild(newNode);
    })
}


const finishedLookups = [];
listenChangesinArray(finishedLookups, appendUI);



const getDomainStatus = async (tlds)=>{
    const url = "http://localhost:5000/lookup/" + userInput.value;
    fetch(url)
.then(resp=>{
    const data = resp.json();
    return data;
})
.then(resp=>{
    clearUI();
    finishedLookups.push(resp.results);
})
.catch((err)=>{
    renderEmptyMessageState(true, "Something went wrong", true);
    console.error(err);
})
};


const doUserInput = (userInput) => {
    if(userInput.trim().length > 1){
        renderLoadingState(5, true);
        getDomainStatus();
    }else{
        //renderEmptyMessageState(false,"do more than 1 char",true);
    }
};

inputForm.addEventListener("submit", (e)=>{
    doUserInput(userInput.value);
    e.preventDefault();
});




(async()=>{

const quoteRespons = await fetch("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");
const quote = await quoteRespons.json();
document.getElementById("quote").innerText=quote.quoteText;
document.querySelector("cite").innerText="-- "+quote.quoteAuthor;
})();
