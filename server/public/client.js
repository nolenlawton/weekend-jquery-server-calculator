console.log('JavaScript')

$(document).ready(onReady)

function onReady() {
    console.log('JQuery');

    $('#enterButton').on('click', performFunction);
    $('#clearButton').on('click', clearInputs);

    $('.operator').on('click', setOpertator);
    $('#keyPad input').on('click', addToInputField);
}

let functions = []
let operator;

function addToInputField() {
    let input = $(this).val()
    let totalInput = $('#functionInput').val() + input
    $('#functionInput').val(totalInput)
}

function performFunction(event) {
    event.preventDefault();

    let functionValue = $('#functionInput').val();
    let number1 = '';
    let operator;
    let number2 = '';
    let numberOne = 'incompleted';

    for (let i in functionValue) {
        if(functionValue[i] === '+' || functionValue[i] === '-' || functionValue[i] === 'x' || functionValue[i] === '/'){
            operator = functionValue[i];
            numberOne = 'completed';
        }
        else if (numberOne === 'completed') {
            number2 += functionValue[i];
        }
        else if(isNaN(functionValue[i]) === false) {
            number1 += functionValue[i];
        }
    }

    functionObject = {
        number1: number1,
        operator: operator,
        number2: number2,
    }

    console.log(functionObject)

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
    $('#functionInput').val('')
    $('.operator').prop('disabled', false);
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


