console.log('JavaScript')

$(document).ready(onReady)

function onReady() {
    console.log('JQuery')

    $('#enterButton').on('click', performFunction)
    $('#clearButton').on('click', render)

    $('.operator').on('click', setOpertator)
}

let functions = []
let operator;

function performFunction(event) {
    event.preventDefault()

    functionObject = {
        number1: $('#numberInput1').val(),
        operator: operator,
        number2: $('#numberInput2').val()
    }

    $.ajax({
        url: '/calculation',
        method: 'POST',
        data: functionObject
      }).then((response) => {
    
        getCalculation();
      })
}

function setOpertator() {
    operator = $(this).val();
    $('.operator').prop('disabled', true);
    console.log(operator);
}

function getCalculation() {
    $.ajax({
        url: '/calculation',
        method: 'GET',
      }).then((response) => {
        calculations = response;
        render();
      })
}

function clearInputs() {
    $('#numberInput1').val('')
    $('#numberInput2').val('')
}

function render() {
    $('#historyList').empty();
    $('#answer').empty();

    $('.operator').prop('disabled', false);

    let mostRecent = calculations[calculations.length - 1]

    $('#answer').append(`
        Answer : ${mostRecent.total}
    `)
    
    for(let calculation of calculations) {
        
        $('#historyList').append(`
            <ul>${calculation.number1} ${calculation.operator} ${calculation.number2} = ${calculation.total}</ul>
        `)
    }
}


