/* Global Variables */
const apiKey = '&appid=03feb7c079071bbecef898d801d8d1fc&units=metric';
const baseUrl = 'http://localhost:8000';
const zipCode = document.querySelector('#zip');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const feeling = document.querySelector('#feelings');
const content = document.querySelector('#content');
const btn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', func);

/* Function called by event listener */
function func() {
    let data = {
        zip: zipCode.value, 
        content: feeling.value,
        date: newDate,
    };
    
    // Post data to API to get information
    zipInfo(data.zip).then(info => {
       
        if (info.cod != 200)
            return alert(info.message)

        data.temp = info.main.temp;
        postData(data);
    })
};

//Get zip code information
async function zipInfo(zip) {
    return (await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}${apiKey}`)).json()

}

//Post data to server
async function postData(data) {
    const response = await fetch(`/postData`, {
        method: 'POST', 
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
    try {

        const newData = await response.json();
        return newUI();
      }catch(error) {
      console.log(error);
      }
}

// Update UI
async function newUI () {
    let response = await fetch(`/all`);
    try {
        response.json().then(data => {
            date.innerHTML = `The Date is: ${data.date}`;
            temp.innerHTML = `The Temperature is: ${data.temp}`;
            content.innerHTML = `My Feeling is: ${data.content}`;
        }).catch(error);
    } catch(error) {
        //catchError(error);
    }
}