"use strict";
var expect = chai.expect;

var sum = 0;

function cyfry(napis) {
    var suma = [0, 0];

    for (var znak of napis) {
        if (!isNaN(znak)) {
            if (znak % 2 == 1) suma[0] += parseInt(znak);
            else suma[1] += parseInt(znak);
        }
    }

    return suma;
}

function litery(napis) {
    var ilosc = [0, 0];

    for (var znak of napis) {
        if (isNaN(znak)) {
            if (znak == znak.toLowerCase()) ilosc[0]++;
            else if (znak === znak.toUpperCase()) ilosc[1]++;
        }
    }

    return ilosc;
}

function suma(napis) {
    var liczba = parseInt(napis);
    if(!isNaN(liczba)) sum += liczba;
    return sum;
}

function skrypt() {

    
    var napis = window.prompt('Dane:');
    
    if (napis != null) {
        console.log('\t' + cyfry(napis) + '\t' + litery(napis) + '\t' + suma(napis));
        skrypt();
    }
}

skrypt();

describe('The cyfry() function', function() {

    it('Returns [4,2] for "123"', function() {
        expect(cyfry("123")).to.deep.equal([4,2]);
    });

    it('Returns [0,0] for "abc"', function() {
        expect(cyfry("abc")).to.deep.equal([0,0]);
    });

    it('Returns [5,10] for "abc456"', function() {
        expect(cyfry("abc456")).to.deep.equal([5,10]);
    });

    it('Returns [16,8] for "789abc"', function() {
        expect(cyfry("789abc")).to.deep.equal([16,8]);
    });

    it('Returns [0,0] for ""', function() {
        expect(cyfry("")).to.deep.equal([0,0]);
    });
});

describe('The litery() function', function() {

    it('Returns [0,0] for "123"', function() {
        expect(litery("123")).to.deep.equal([0,0]);
    });

    it('Returns [2,1] for "abc"', function() {
        expect(litery("abC")).to.deep.equal([2,1]);
    });

    it('Returns [3,0] for "abc456"', function() {
        expect(litery("abc456")).to.deep.equal([3,0]);
    });

    it('Returns [3,0] for "789abc"', function() {
        expect(litery("789abc")).to.deep.equal([3,0]);
    });

    it('Returns [0,0] for ""', function() {
        expect(litery("")).to.deep.equal([0,0]);
    });
});

describe('The suma() function', function() {

    sum = 0;

    it('Returns 123 for "123"', function() {
        expect(suma("123")).to.deep.equal(123);
    });

    it('Returns 123 for "abc"', function() {
        expect(suma("abC")).to.deep.equal(123);
    });

    it('Returns 123 for "abc456"', function() {
        expect(suma("abc456")).to.deep.equal(123);
    });

    it('Returns 912 for "789abc"', function() {
        expect(suma("789abc")).to.deep.equal(912);
    });

    it('Returns 912 for ""', function() {
        expect(suma("")).to.deep.equal(912);
    });
});
