const url = "https://api.exchangerate-api.com/v4/latest/";

document.getElementById("SubmitButton").addEventListener("click", (e) => {
    e.preventDefault();
    const originalCurrencyAmount = parseInt(document.getElementById("ExchangeAmount").value);
    const originalCurrencyType = document.getElementById("fromCurrency").value;
    
});

document.getElementById("ExchangeAmount").addEventListener("keypress", (e) => {
    //e.preventDefault();
    const originalCurrencyAmount = parseInt(document.getElementById("ExchangeAmount").value);
    let fromCurrency = document.getElementById("fromCurrency").value; 
    let toCurrency = document.getElementById("toCurrency").value;
    if( fromCurrency === "default" || toCurrency === "default") {
        return;
    }
    fetch(url + fromCurrency)
      .then((response) => {
          let exchangeRate = 0;
          for(let rate of response.json.rates) {
              if (rate === toCurrency) {
                  exchangeRate = rate;
                  break;
              }
          } 
          document.getElementById("ExchangeAmount2").value = originalCurrencyAmount * exchangeRate;
      })
      .catch((response) => {
          console.log(response.json);
      })
    
})