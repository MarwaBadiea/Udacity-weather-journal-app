/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');


// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=03feb7c079071bbecef898d801d8d1fc&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onButtonClick);

/* Function called by event listener */
function onButtonClick() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zipCode == '') {
        alert ('Please enter your zip code');
        return false;
    }
    

    getData(baseUrl, zipCode, apiKey)
    .then (function (data) {
        postData('/postData', { 
            date: newDate,
            temp: data.main.temp,
            feelings: feelings
        });

        
    }) .then (function () {
        updateUI();
    });
}

/* Function to GET Web API Data*/
const getData = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch (baseUrl+zipCode+apiKey)

    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}


/* Function to POST data */
const postData = async ( url = '', data = {}) => {
    const response = await fetch( '/postData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify(data), 
    }); try {
        const newData = await response.json();
        console.log(newData);
        return newData;    
    } catch(error) {
        console.log('error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const data = await request.json();
      date.innerHTML = `The Date is: ${data.date}`;
      temp.innerHTML = `The Temperature is: ${data.temp}`;
      content.innerHTML = `My Feeling is: ${data.feelings}`;
  
    }catch(error){
      console.log("error", error);
    }
  }