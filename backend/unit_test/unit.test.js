const sDao = require('../sDao'); // module for accessing the DB

const newService = {
    "type":"post office",
    "time":"0"
}

const newTime = {
    "time":"5"
}

describe('service.addService', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await sDao.addService(newService.type, newService.time);
    });

    test('check returned result', async () => {
        const results = await sDao.getServices();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id === lastId);
        expect(result.id).toEqual(lastId);
        expect(result.type).toEqual(newService.type);
        expect(result.time).toEqual(newService.time);
    });
});

describe('service.setTime', () => {
    let lastId;
    beforeAll(async () => {
        lastId = await sDao.addService(newService.type, newService.time);
    });

    test('check returned result', async () => {
        const r0 = await sDao.setTime(newTime);
        expect (r0).toEqual('done');
        const results = await sDao.getServices();
        expect(results.length).toBeGreaterThan(0);
        const result = results.find(x => x.id == lastId);
        expect(result.id).toEqual(lastId);
        expect(result.type).toEqual(newService.type);
        expect(result.time).toEqual(newService.time);
    });
});