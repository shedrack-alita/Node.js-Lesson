
function addition(a,b){
    return a + b;
}

function substraction(a,b){
    return a - b;
}

function multiplication(a,b){
    return a * b;
}

function division(a,b){
    if (b === 0) {
        throw new Error('Dividing a number with zero is math error!')
    }
    return a/b;
}


module.exports = {
    addition, 
    substraction, 
    multiplication, 
    division
}

