import { AdRecord } from "../records/ad.record"

test('AdRecord returns data from database for one entry.', async() =>{
    const ad = await AdRecord.getOne('abc');
    console.log("ad:", ad);
    
    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Test');
    expect(ad.description).toBe('Desc');
})

test('AdRecord returns null from database for unexisting entry.', async() =>{
    const ad = await AdRecord.getOne('----');
    expect(ad).toBeNull();
})