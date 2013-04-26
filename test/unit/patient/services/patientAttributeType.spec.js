'use strict';

describe('Patient attributes', function () {
    var openmrsUrl = 'http://blah.com';

    var rootScope = {};
    var mockHttpGet = {
        defaults: {headers: {common: {'X-Requested-With': 'present'}} },
        get: jasmine.createSpy('Http get').andReturn({success: function(callBack){
            return callBack({results: []});}})
    };

    beforeEach(module('resources.patientAttributeType'));
    beforeEach(module(function ($provide) {
        rootScope.openmrsUrl = openmrsUrl;
        $provide.value('$http', mockHttpGet);
        $provide.value('$rootScope', rootScope);
    }));


    describe("init", function () {
       it('Should make call to getAll', inject(['patientAttributeType',function (patientAttribute) {
            patientAttribute.init();

            expect(mockHttpGet.get).toHaveBeenCalled();
            expect(mockHttpGet.get.mostRecentCall.args[0]).toBe(openmrsUrl + '/ws/rest/v1/personattributetype?v=full');
        }]));
    });
});
