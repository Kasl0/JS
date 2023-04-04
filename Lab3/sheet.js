var setButton = document.getElementById("set");
setButton.addEventListener('click', set, false);

function set() {
    
    var aside = document.querySelector('aside');
    aside.style.float = "right";
    aside.style.position = "relative";
    aside.style.bottom = "120px";
    aside.style.width = "400px";

    const headers = document.querySelectorAll('h1, h2');
    headers.forEach(header => {
        header.style.margin = '0 0';
    });

    var main = document.querySelector('main');
    main.style.width = "400px";

    var blockquote = document.querySelector('blockquote');
    blockquote.style.left = "0";

    var nav = document.querySelector('nav');
    nav.style.width = "max-content";

    var nav_ul = document.querySelector('nav ul');
    nav_ul.style.margin = "1em 0";

    const azure = document.querySelectorAll('.azure');
    azure.forEach(entity => {
        entity.style.backgroundColor = '#EFF';
    });

    const border = document.querySelectorAll('.border');
    border.forEach(entity => {
        entity.style.border = '1px solid black';
        entity.style.boxShadow = '1px 1px 1px black';
        entity.style.padding = '0.5em 1em';
        entity.style.margin = '1em 0';
    });
}

var deleteButton = document.getElementById("delete");
deleteButton.addEventListener('click', deletes, false);

function deletes() {
    var aside = document.querySelector('aside');
    aside.style.removeProperty("float");
    aside.style.removeProperty("position");
    aside.style.removeProperty("bottom");
    aside.style.removeProperty("width");

    const headers = document.querySelectorAll('h1, h2');
    headers.forEach(header => {
        header.style.removeProperty("margin");
    });

    var main = document.querySelector('main');
    main.style.removeProperty("width");

    var blockquote = document.querySelector('blockquote');
    blockquote.style.removeProperty("left");

    var nav = document.querySelector('nav');
    nav.style.removeProperty("width");

    var nav_ul = document.querySelector('nav ul');
    nav_ul.style.removeProperty("margin");

    const azure = document.querySelectorAll('.azure');
    azure.forEach(entity => {
        entity.style.removeProperty("background-color");
    });

    const border = document.querySelectorAll('.border');
    border.forEach(entity => {
        entity.style.removeProperty("border");
        entity.style.removeProperty("box-shadow");
        entity.style.removeProperty("padding");
        entity.style.removeProperty("margin");
    });
}

var content = ["Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem.",
                "Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy.",
                "Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."];
var i = 0;

var addButton = document.getElementById("add");
addButton.addEventListener('click', add, false);

function add() {
    var paragraph = document.createElement('p');
    paragraph.textContent = content[i];
    i++;
    if(i == 3) addButton.disabled = true;
    var blockquote = document.querySelector('blockquote');
    blockquote.appendChild(paragraph);
}
