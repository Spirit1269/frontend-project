let $typedValue = $("#symbol");
let $selectedValue = $('#dropDown');
let $button = $("#submit")
let $results = $("#results")
let $form = $('#userSection')
let today =  new Date().toISOString().slice(0, 10)
console.log(today)
 

// $button.on("click", function(event){
//     getValues(event);
// })
// $selectedValue.on("change", function(event){ 
//     getValues(event);
// });

$form.on("submit", function(event) {
    event.preventDefault();
    getValues(event);
})
// funtion to receive and display values 
function getValues(event) {
    event.preventDefault();
    let name = []
    let typedValue = $typedValue.val().toUpperCase();
    let selectedValue = $selectedValue.val();
    
    if (!typedValue && selectedValue === 'Please choose') {
        alert("Please enter a symbol or select one from the list.");
        return;
    }

    if (typedValue && selectedValue !== 'Please choose') {
        // If both input field and dropdown have values, use dropdown value
        name = typedValue;
    }
    if (!typedValue && selectedValue !== 'Please choose') {
        name = selectedValue

    }
    if (typedValue &&  selectedValue === 'Please choose' ) {
        name = typedValue;
    }


    console.log(typedValue)
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
    $form[0].reset();
}