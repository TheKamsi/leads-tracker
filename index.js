let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")

const LeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(LeadsFromLocalStorage)

if (LeadsFromLocalStorage) {
    myLeads = LeadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">${leads[i]}
            </a>
        </li>
        `
    }

    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let activeTab = tabs[0].url
        myLeads.push(activeTab)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    alert("Are you sure you want to delete the leads?")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})