// TODO: refactor the newItems elements to a more standardized format.
// TODO: Create a fuction to transform each providers API respons to the standard format

// foreach provider call their API --> transform respons to standard format --> send standardized output to Obserer array. ---> reRender output from observed array callback.

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
            case "html":
            newNode.querySelector(selector.selector).innerHTML=selector.value;
            break;
            default:
            newNode.querySelector(selector.selector).innerText=selector.value;
        }
    }
    target.appendChild(newNode);
}