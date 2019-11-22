const inputForm = document.getElementById("inputform");
const app_view = document.getElementById("results");

const template_resultItem = document.getElementById("result-item-template");
const template_loadingItem = document.getElementById("loading-state");  
const template_emptyState = document.getElementById("empty-state");


const renderFromTemplate = (templateNode, targetNode, querySelectorValues) => {
    const template = templateNode;
    const target = targetNode;
    const newNode = template.content.cloneNode(true);
    for (selector of querySelectorValues){
        switch(selector.method){
            case "addClass":
            newNode.querySelector(selector.selector).classList.add(selector.value);
            break;
            case "removeClass":
            newNode.querySelector(selector.selector).classList.remove(selector.value);
            break;
            case "toggleClass":
            newNode.querySelector(selector.selector).classList.toggle(selector.value);
            break;
            case "value":
            newNode.querySelector(selector.selector).value=selector.value;
            break;
            case "src":
            newNode.querySelector(selector.selector).src=selector.value;
            break;
            case "innerText":
            newNode.querySelector(selector.selector).innerText=selector.value;
            break;
            default:
            newNode.querySelector(selector.selector).textContent=selector.value;
        }
    }
    target.appendChild(newNode);
}

const nodeItem = (selector, method, value)=>{
    return {selector, method, value}
}

const clear_area = (area=app_view)=>{
    area.querySelectorAll('*').forEach(n => n.remove());
}

const renderLoadingState = (repeat=3, clear=false)=>{
    if(clear) clear_area();
    for(let i=0; i<repeat;i++){
        app_view.appendChild(template_loadingItem.content.cloneNode(true));
    }
}

const renderEmptyMessageState = (error=false, message=false, clear=false)=>{
    if(clear) clear_area();
    const bgClass = (!error) ? "bg-gray-200" : "bg-red-200";
    const nodeMessage = (!message) ? "No results found, start by searching or try another search" : message;
    const nodes = [
        nodeItem("div", "addClass", bgClass),
        nodeItem("p","innterText",nodeMessage)
    ];
    renderFromTemplate(template_emptyState, app_view, nodes);
}


const filter_nameAvailable = item => (!!item.purchasePrice == true);
const filter_domainNameMatch = (needle, item) =>{
    let a = item.sld.toLowerCase();
    let b = needle.replace(" ","").trim().toLowerCase();
    return (a==b) ?true:false
};
const sort_priceLowHigh = (a, b) => parseFloat(a.purchasePrice) - parseFloat(b.purchasePrice);


const appendUI = (lookup_results, userInput)=>{
    const availableDomains = lookup_results
    .filter(filter_nameAvailable)
    .filter(filter_domainNameMatch.bind(this, userInput))
    .sort(sort_priceLowHigh);

    if(availableDomains.length < 1){
        renderEmptyMessageState(false, "No results");
    }
    else{
        availableDomains.forEach(item=>{
            const nodes = [
                nodeItem("#tld", "innerText","."+item.tld),
                nodeItem("#sld", "innerText", item.sld),
                nodeItem("#price","innerText","$"+item.purchasePrice)
            ];
            renderFromTemplate(template_resultItem, app_view, nodes);
        })
    }
}

const getDomainStatus = async (userInput)=>{
    const url = "http://localhost:5000/lookup/namedotcom/" + userInput;
    try{
        const callNameAPI = await fetch(url);
        const callNameAPI_response = await callNameAPI.json();
        if(!callNameAPI_response.results)throw callNameAPI_response.message + ": "+ callNameAPI_response.details;
        clear_area();
        appendUI(callNameAPI_response.results, userInput);
    }
    catch(error){
        renderEmptyMessageState(true, "Something went wrong", true);
        console.error(error);
    }
};


const doUserInput = (userInput) => {
    if(userInput.trim().length > 1){
        renderLoadingState(5, true);
        getDomainStatus(userInput);
    }else{
        //renderEmptyMessageState(false,"do more than 1 char",true);
    }
};

inputForm.addEventListener("submit", (e)=>{
    let userInput = document.getElementById("userinput");
    doUserInput(userInput.value);
    e.preventDefault();
});




(async()=>{
    const quoteRespons = await fetch("https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");
    const quote = await quoteRespons.json();
    document.getElementById("quote").innerText=quote.quoteText;
    document.querySelector("cite").innerText="-- "+quote.quoteAuthor;
})();
