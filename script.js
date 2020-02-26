const url = "https://api.exchangerate-api.com/v4/latest/";

document.getElementById("ExchangeAmount").addEventListener("keyup", (e) => {
    const originalCurrencyAmount = parseFloat(document.getElementById("ExchangeAmount").value);
    let fromCurrency = document.getElementById("fromCurrency").value; 
    let toCurrency = document.getElementById("toCurrency").value;
    if( fromCurrency === "default" || toCurrency === "default") {
        return;
    }
    let fetchUrl = url + fromCurrency;
    fetch(fetchUrl)
      .then((response) => {
          return response.json();
      })
      .then((json) => {
        console.log(json);
          let exchangeRate = extractRate(toCurrency, json.rates);
          document.getElementById("ExchangeAmount2").value = originalCurrencyAmount * exchangeRate;
          updateDateAndTime(json);
      })
      .catch((response) => {
          console.log(response);
      });
});

document.getElementById("ExchangeAmount2").addEventListener("keyup", (e) => {
    const originalCurrencyAmount = parseFloat(document.getElementById("ExchangeAmount2").value);
    let fromCurrency = document.getElementById("toCurrency").value; 
    let toCurrency = document.getElementById("fromCurrency").value;
    if( fromCurrency === "default" || toCurrency === "default") {
        return;
    }
    let fetchUrl = url + fromCurrency;
    fetch(fetchUrl)
      .then((response) => {
          return response.json();
      })
      .then((json) => {
        console.log(json);
          let exchangeRate = extractRate(toCurrency, json.rates);
          document.getElementById("ExchangeAmount").value = originalCurrencyAmount * exchangeRate;
          updateDateAndTime(json);
      })
      .catch((response) => {
          console.log(response);
      });
});

document.getElementById("toCurrency").addEventListener("change", (e) => {
    const originalCurrencyAmount = parseFloat(document.getElementById("ExchangeAmount").value);
    let fromCurrency = document.getElementById("fromCurrency").value; 
    let toCurrency = document.getElementById("toCurrency").value;
    if(originalCurrencyAmount === 'NaN' || fromCurrency === "default" || toCurrency === "default") {
        return;
    }
    let fetchUrl = url + fromCurrency;
    fetch(fetchUrl)
      .then((response) => {
          return response.json();
      })
      .then((json) => {
        console.log(json);
          let exchangeRate = extractRate(toCurrency, json.rates);
          document.getElementById("ExchangeAmount2").value = originalCurrencyAmount * exchangeRate;
          updateDateAndTime(json);
      })
      .catch((response) => {
          console.log(response);
      });
});

document.getElementById("fromCurrency").addEventListener("change", (e) => {
    const originalCurrencyAmount = parseFloat(document.getElementById("ExchangeAmount").value);
    let fromCurrency = document.getElementById("fromCurrency").value; 
    let toCurrency = document.getElementById("toCurrency").value;
    if(originalCurrencyAmount === 'NaN' || fromCurrency === "default" || toCurrency === "default") {
        return;
    }
    let fetchUrl = url + fromCurrency;
    fetch(fetchUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        let exchangeRate = extractRate(toCurrency, json.rates);
        document.getElementById("ExchangeAmount2").value = originalCurrencyAmount * exchangeRate;
        updateDateAndTime(json);
      })
      .catch((response) => {
        console.log(response);
      });
});

function extractRate(currencyName, rates) {
    for(let rate of Object.keys(rates)) {
        if (rate === currencyName) {
            return rates[rate];
        }
    }
    return 'NaN';
}

function updateDateAndTime(json) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    let result;
    var date = new Date(json.time_last_updated * 1000);
    var hour;
    var temp;
    if (date.getHours() >= 12) {
        temp = 'pm';
    }
    else {
        temp = 'am';
    }
    var hour = (date.getHours() % 12);
    var mins = date.getMinutes();
    time = hour + temp;
    result += '<div id="time">As of ' + time + ' </div>';
    result += '<div id="date">on ' + date.toDateString() + '</div>';
    document.getElementById("info-box").innerHTML = result;

}