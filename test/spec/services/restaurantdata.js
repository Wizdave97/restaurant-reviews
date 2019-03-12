'use strict';

describe('Service: restaurantData', function () {

  // load the service's module
  beforeEach(module('restaurantReviewsApp'));

  // instantiate service
  var restaurantData;
  beforeEach(inject(function (_restaurantData_) {
    restaurantData = _restaurantData_;
  }));

  it('should do something', function () {
    expect(!!restaurantData).toBe(true);
  });

});
