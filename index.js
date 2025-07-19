import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
import { getDatabase,
    ref, push, onValue,remove
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js"


const firebaseConfig = {
  databaseURL: DATABASE_URL
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

// Scrimba Environment Variable
// console.log(process.env.DATABASE_URL);


let inputEl = document.querySelector("#input-el")
let inputBtn = document.querySelector("#input-btn")
let clearBtn = document.querySelector ("#clear-btn")
let tabBtn = document.querySelector("#tab-btn")
let ulEl = document.querySelector("#ul-el")




// CLEAR BTN
clearBtn.addEventListener("click", function() {
    let listItems = ""
    console.log("Clear Btn clicked!")
    inputEl.value = ""

    remove (referenceInDB)
    listItems = `<li id="bookmarked-list-item"><span style="color:rgb(199, 199, 199)" >- Place Holder -</span></li>`
    ulEl.innerHTML = listItems
})


onValue(referenceInDB, function(snapshot) {
    let snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist === true) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    console.log(snapshotValues)
    render(leads)}    
})

// SAVE BTN
inputBtn.addEventListener("click", function() {

    if (inputEl.value === "") {
        // Nothing Happens if input === empty
    } else {
    console.log("Save Btn clicked!")
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
}})

// ENTER KEY
inputEl.addEventListener ("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        document.querySelector("#input-btn").click()
    }
})




function render(leads){ 
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target=_blank href="${leads[i]}">${leads[i]}</a></li>`
    }

    ulEl.innerHTML = listItems
    console.log("last steps")
}












//     COPY TAB BTN
//     tabBtn.addEventListener("click", function(){

//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//             console.log(tabs)
//             myLeads.push(tabs[0].url)
//             inputEl.value = ""
//             render(myLeads)})
// })
