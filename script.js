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
    if(originalCurrencyAmount === NaN || fromCurrency === "default" || toCurrency === "default") {
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
    if(originalCurrencyAmount === NaN || fromCurrency === "default" || toCurrency === "default") {
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

const threeLetterCurrencyCodes = { "default": "Default", "AED": "UAE Dirham", "ARS": "Argentine Peso", "AUD": "Australian Dollar",
    "BGN": "Bulgarian Lev", "BRL": "Brazilian Real", "BSD": "Bahamian Dollar", "CAD": "Canadian Dollar",
    "CHF": "Swiss Franc", "CLP": "Chilean Peso", "CNY": "Chinese Renminbi", "COP": "Colombian Peso",
    "CZK": "Czech Koruna", "DKK": "Danish Krone", "DOP": "Dominican Peso", "EGP": "Egyptian Pound",
    "EUR": "Euro", "FJD":"Fiji Dollar", "GBP": "Pound Sterling", "GTQ": "Guatemalan Quetzal", 
    "HKD": "Hong Kong Dollar","HRK": "Croatian Kuna", "HUF": "Hungarian Forint", "IDR": "Indonesian Rupiah",
    "ILS": "Israeli Shekel", "INR": "Indian Rupee", "ISK": "Icelandic Krona", "JPY": "Japanese Yen", "KRW": "South Korean Won",
    "KZT": "Kazakhstani Tenge", "MXN": "Mexican Peso", "MYR": "Malaysian Ringgit", "NOK": "Norwegian Krone",	
    "NZD": "New Zealand Dollar", "PAB": "Panamanian Balboa", "PEN": "Peruvian Nuevo Sol", "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee", "PLN": "Polish Zloty", "PYG": "Paraguayan Guarani", "RON": "Romanian Leu",
    "RUB": "Russian Ruble", "SAR": "Saudi Riyal", "SEK": "Swedish Krona", "SGD": "Singapore Dollar", 
    "THB": "Thai Baht", "TRY": "Turkish Lira", "TWD": "New Taiwan Dollar", "UAH": "Ukrainian Hryvnia",
    "USD": "US Dollar", "UYU": "Uruguayan Peso", "ZAR": "South African Rand"}

function writeOptions() {
    var results;
    for(let key of Object.keys(threeLetterCurrencyCodes)) {
        results += '<option value="' + key + '">';
        results += threeLetterCurrencyCodes[key];
        results += '</option>';
    }
    document.getElementById("fromCurrency").innerHTML = results;
    document.getElementById("toCurrency").innerHTML = results;
}
window.onload = writeOptions;