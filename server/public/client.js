$(document).ready(onReady)

let functions = []

function onReady() {
    $('#keyPad input').on('click', addToInputField); // set up
    $('.operator').on('click', setOpertator);
    $('#clearButton').on('click', clearInputs);

    $('#enterButton').on('click', performFunction); // calculation
    $(document).on('click', '#historyList button', rerunFunction);
    
    
    $('#delete').on('click', deleteHistory); // delete server data
    getCalculation()
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

function clearInputs() {
    $('#functionInput').val('')
    $('.operator').prop('disabled', false);
}

// sends to server via POST
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

// gets response from server via GET
function getCalculation() {
    $.ajax({
        url: '/calculation',
        method: 'GET',
    }).then((response) => {
        calculations = response;
        render();
    })
}

// posts to dom
function render() {
    $('#historyList').empty();
        $('#answer').empty();
    $('#delete').empty();


    $('#functionInput').val('')

    $('.operator').prop('disabled', false);

    let mostRecent = calculations[calculations.length - 1]

    $('#answer').append(`${mostRecent.total}`)
    
    
    for(let calculation of calculations) {
        $('#historyList').append(`
            <button class='number insideList'>${calculation.number1} ${calculation.operator} ${calculation.number2} = ${calculation.total}</button>
        `)
    }

    $('#delete').append(`<button>DELETE HISTORY</button>`)
}

function rerunFunction () {
    previousInput = $(this).text().split(' '); // to array
    answerOf = previousInput[previousInput.length - 1]

    $('#historyList button').css('color', 'black')
    $(this).css('color', 'lightcoral')
    $('#answer').empty()
    $('#answer').append(`${answerOf}`)
}

// deletes server data
function deleteHistory() {
    console.log('delete!')

    $.ajax({
        url: '/calculation',
        method: 'DELETE',
    }).then((response) => {
        getCalculation();
    })
}


