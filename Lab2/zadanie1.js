function f() {
    for (var i = 1 ; i <= 4; i++) {
        var value = window.prompt('Wartość ' + i + ':');
        console.log(value + ':' + typeof(value));
    }
}

function wypisz() {
    var val1 = document.forms['form'].elements['pole_tekstowe'].value;
    var val2 = document.forms['form'].elements['pole_liczbowe'].value;
    console.log(val1 + ':' + typeof(val1));
    console.log(val2 + ':' + typeof(val2));
}

f();
