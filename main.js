
let $name = $("#symbol");
let $button = $("#submit")
let $results = $("#results")

$button.on("click",function(){
  let name = $name.val();
  name.toUpperCase();
  $.get(`https://financialmodelingprep.com/api/v3/quote/${name}?apikey=8672d4bf71053ec270bb774352caec83` , (data) => {
    $results.empty();
    console.log(data);
    if (data ===[]){
       alert("The symbol cannot be found, please search a different symbol!");
    }else {
        let $card = $('<div>').addClass('result-card');
        let $cardTitle = $('<h4>').text(`NAME:  ${data[0].name}`);
        let $cardPrice = $('<h4>').text(`PRICE:  $ ${data[0].price}`);
        let $cardExchange = $('<h4>').text(`EXCHANGE:  ${data[0].exchange}`)
        $card.append($cardTitle, $cardPrice, $cardExchange)
        $results.append($card)
        }
    })
  })