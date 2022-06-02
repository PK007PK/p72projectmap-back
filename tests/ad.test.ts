import { AdRecord } from "../records/ad.record"
import { pool } from "../utils/db";

afterAll(async () => {
    await pool.end(); // Zamknięcie połączenia po testach powinno testy przyśpieszyć
})

test('AdRecord returns data from database for one entry.', async() =>{
    const ad = await AdRecord.getOne('abc');
    console.log("ad:", ad);
    
    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Test');
    expect(ad.description).toBe('Desc');
})

test('AdRecord.getOne returns null from database for unexisting entry.', async() =>{
    const ad = await AdRecord.getOne('----');
    expect(ad).toBeNull();
})

test('AdRecord.findAll returns array of found entries.', async() =>{
    const ads = await AdRecord.findAll('');
    expect(ads).not.toEqual([]); //niepusta tablica, czyli coś zawierająca
    expect(ads[0].id).toBeDefined();
})

test('AdRecord.findAll returns array of found entries when searching for "a".', async() =>{
    const ads = await AdRecord.findAll('');
    expect(ads).not.toEqual([]); //niepusta tablica, czyli coś zawierająca
    expect(ads[0].id).toBeDefined();
})

test('AdRecord.findAll returns empty array when searching for something that does not exist', async() =>{
    const ads = await AdRecord.findAll('---------------');
    expect(ads).toEqual([]); 
})