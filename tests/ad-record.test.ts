import { AdRecord } from "../records/ad.record"

const defObject = {
    name: 'Test name',
    description: 'Blalla',
    id: '123',
    lat: 19,
    lon: 12,
    price: 10,
    url: '24213423423',
};

test('Can build AdRecord', ()=>{
    const ad = new AdRecord(defObject)

    expect(ad.name).toBe('Test name');
    expect(ad.description).toBe('Blalla');
} )

test('Validates invalid price', ()=>{
    expect(()=> new AdRecord({
        ...defObject,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 ani większa niż 9 999 999')
})