const { ExpectationFailed } = require('http-errors');
var Bicicleta = require('../../models/bicicleta');


beforeEach( () => {
    Bicicleta.allBicis = []
})

describe('Bicicleta.allBicis',() => {
    it('comienza vacia', () => {
         expect(Bicicleta.allBicis.length).toBe(0);
    })
})

describe('Bicicleta.add',() => {
    it('Agregamos una', () => {
        //chequeo la precondicion

        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', '29', [-34.60,-58.38]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);


    })
})


describe('Bicicleta.findById',() => {
    it('Debe devolver la bici con id 1', () => {
        //chequeo la precondicion
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1, 'verde', 'urbana', [-34.60,-58.38]);
        var aBici2 = new Bicicleta(2, 'verde', 'urbana', [-34.60,-58.38]);

        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);

    })
})