import { FundEntityCache } from './fund.entity.cache';
import { FundEntityGroup, FundEntityEnumItem, FundEntity, FundEntityEnum } from './fund.entity.model';

fdescribe('The Fund Entity Cache', () => {

    let fixture: FundEntityCache;

    beforeEach(() => {
        fixture = new FundEntityCache();
    });

    it('should get() what has been put()', () => {
        const toCacheFundEntityGroup = createFundEntityGroup(FundEntityEnum.A, false, 2);
        const toCacheFilter = 'myFilter';

        fixture.put(toCacheFilter, toCacheFundEntityGroup);

        expect(fixture.get(toCacheFilter, FundEntityEnum.A)).toEqual(toCacheFundEntityGroup);
    });

    it('should cache distinguish filter for different fund entity types', () => {
        const toCacheFilter = 'myFilter';

        const entityGroup1 = createFundEntityGroup(FundEntityEnum.A, false, 2);
        fixture.put(toCacheFilter, entityGroup1);

        expect(fixture.get(toCacheFilter, FundEntityEnum.A)).toEqual(entityGroup1);
        expect(fixture.get(toCacheFilter, FundEntityEnum.B)).toBeNull();

        const entityGroup2 = createFundEntityGroup(FundEntityEnum.B, false, 3);
        fixture.put(toCacheFilter, entityGroup2);

        expect(fixture.get(toCacheFilter, FundEntityEnum.A)).toEqual(entityGroup1);
        expect(fixture.get(toCacheFilter, FundEntityEnum.B)).toEqual(entityGroup2);
    });

    it('should clear cache', () => {
        const toCacheFundEntityGroup = createFundEntityGroup(FundEntityEnum.A, false, 2);
        const toCacheFilter = 'myFilter';

        fixture.put(toCacheFilter, toCacheFundEntityGroup);

        fixture.clear();

        expect(fixture.get(toCacheFilter, FundEntityEnum.A)).toBeNull();
    });

    it('should prefer exact filter match', () => {
        const toCacheFilter = 'myFilter';
        const entityGroup1 = createFundEntityGroup(FundEntityEnum.A, false, 2);
        fixture.put(toCacheFilter, entityGroup1);

        const entityGroup2 = createFundEntityGroup(FundEntityEnum.A, false, 3);
        fixture.put('myFilterA', entityGroup2);

        const entityGroup3 = createFundEntityGroup(FundEntityEnum.A, false, 4);
        fixture.put('myFilte', entityGroup3);

        expect(fixture.get(toCacheFilter, FundEntityEnum.A).entities.length).toBe(2);
    });

    it('should prefer exact filter match even if data truncated', () => {
        const toCacheFilter = 'myFilter';
        const entityGroup1 = createFundEntityGroup(FundEntityEnum.A, true, 2);
        fixture.put(toCacheFilter, entityGroup1);

        const entityGroup2 = createFundEntityGroup(FundEntityEnum.A, false, 3);
        fixture.put('myFilterA', entityGroup2);

        const entityGroup3 = createFundEntityGroup(FundEntityEnum.A, false, 4);
        fixture.put('myFilte', entityGroup3);

        expect(fixture.get(toCacheFilter, FundEntityEnum.A).entities.length).toBe(2);
    });

    it('should prefer cached data with filter that is most closed to the provided one', () => {
        const entityGroup1 = createFundEntityGroup(FundEntityEnum.A, false, 2);
        fixture.put('myFilte', entityGroup1);

        const entityGroup2 = createFundEntityGroup(FundEntityEnum.A, false, 3);
        fixture.put('myFilter', entityGroup2);

        expect(fixture.get('myFilterA', FundEntityEnum.A).entities.length).toBe(3);
    });

    it('should not return cached data with filter that is most closed to the provided one if data is truncated', () => {
        const entityGroup1 = createFundEntityGroup(FundEntityEnum.A, true, 2);
        fixture.put('myFilter', entityGroup1);

        expect(fixture.get('myFilterA', FundEntityEnum.A)).toBeNull();
    });

    it('should cache be filter case insensitive', () => {
        const entityGroup1 = createFundEntityGroup(FundEntityEnum.A, false, 2);
        fixture.put('MyFIlter', entityGroup1);

        expect(fixture.get('myFilter', FundEntityEnum.A)).toEqual(entityGroup1);
        expect(fixture.get('MYFILtER', FundEntityEnum.A)).toEqual(entityGroup1);
    });
});

function createFundEntityGroup(type: FundEntityEnumItem, isTruncated: boolean, nbEntities: number = 10): FundEntityGroup {
    const entities = new Array<FundEntity>();
    for (let i = 0; i < nbEntities; i++) {
        entities.push(new FundEntity());
    }

    return new FundEntityGroup(type.getCode(), entities, isTruncated);
}

