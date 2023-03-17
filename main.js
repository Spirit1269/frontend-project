let $name = $("#symbol");
let $value = $('#dropDown');
let $button = $("#submit")
let $results = $("#results")
let today =  new Date().toISOString().slice(0, 10)

console.log(today)
 
$button.on("click", function(event){
    getValues(event);
})
$value.on("change", function(event){
    // selectedValue = $value.val();
    getValues(event);
});

function getValues(event) {
    event.preventDefault();

    let name = $name.val().toUpperCase();
    let selectedValue = $value.val();
    
    if (!name && selectedValue === 'Please choose') {
        alert("Please enter a symbol or select one from the list.");
        return;
    }

    if (name && selectedValue !== 'Please choose') {
        // If both input field and dropdown have values, use dropdown value
        name = selectedValue;
    }

    console.log(name)
    console.log(selectedValue)
    
     $.get(`https://financialmodelingprep.com/api/v3/quote/${name}?apikey=8672d4bf71053ec270bb774352caec83` , (data) => {
        $results.empty();
    console.log(data);
    let results = data[0];
    if (data.length === 0){
       alert("The symbol cannot be found, please search a different symbol!");
  
    }else {
        let $card = $('<div>').addClass('result-card');
        let $cardTitle = $('<h4>').text(`NAME:  ${results.name}`);
        let $cardPrice = $('<h4>').text(`CURRENT PRICE:  $ ${results.price}`);
        let $cardChange = $('<h4>').text(`CHANGE:  ${results.change}`);
        let $cardDayLow = $('<h4>').text(`DAYS LOW:  ${results.dayLow}`);
        let $cardDayHigh = $('<h4>').text(`DAYS HIGH:  ${results.dayHigh}`);
        let $cardOpen = $('<h4>').text(`OPEN PRICE:  ${results.open}`);
        let $cardEarnAnn = $('<h4>').text(`EARNINGS ANNOUNCEMENT:  ${results.earningsAnnouncement}`)
        let $cardExchange = $('<h4>').text(`EXCHANGE:  ${results.exchange}`);
        $card.append( today, $cardTitle, $cardPrice, $cardOpen, $cardChange, $cardDayLow, $cardDayHigh, $cardEarnAnn, $cardExchange)
        $results.append($card)
    }
    })
    .fail(function() {
        alert("An error occurred while retrieving the data. Please try again later.");
})
}
