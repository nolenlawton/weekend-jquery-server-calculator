$(document).ready(onReady)

let functions = []

function onReady() {
    $('#enterButton').on('click', performFunction);
    $('#clearButton').on('click', clearInputs);
    $('.operator').on('click', setOpertator);
    $('#keyPad input').on('click', addToInputField);
    $('#delete').on('click', deleteHistory)
    $(document).on('click', 'ul', rerunFunction)
}

let operator;

function addToInputField() {
    let input = $(this).val()
    let totalInput = $('#functionInput').val() + input
    $('#functionInput').val(totalInput)
}

function setOpertator() {
    operator = $(this).val();
    $('.operator').prop('disabled', true);
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

    if(number1 !== '' && operator !== '' && number2 !== '') {
        $.ajax({
            url: '/calculation',
            method: 'POST',
            data: functionObject
        }).then((response) => {
    
            getCalculation();
        })
    }
    else {
        $('#answer').empty();

        $('#answer').append(`
            Error : Invalid Input
        `)
    }
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
    $('#delete').empty();

    $('#functionInput').val('')
    $('.operator').prop('disabled', false);

    let mostRecent = calculations[calculations.length - 1]
    $('#answer').append(`
        Answer = ${mostRecent.total}
    `)
    
    for(let calculation of calculations) {
        
        $('#historyList').append(`
            <ul class='list'>${calculation.number1} ${calculation.operator} ${calculation.number2} = ${calculation.total}</ul>
        `)
    }

    $('#delete').append(`<button>DELETE HISTORY</button>`)
}

function rerunFunction () {
    previousInput = $(this).text().split(' '); // to array
    answerOf = previousInput[previousInput.length - 1]

    $('#historyList ul').css('color', 'black')
    $(this).css('color', 'lightcoral')
    $('#answer').empty()
    $('#answer').append(`Answer = ${answerOf}`)
}

function deleteHistory() {
    console.log('delete!')

    $.ajax({
        url: '/calculation',
        method: 'DELETE',
    }).then((response) => {
        getCalculation();
    })
}


