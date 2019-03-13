'use strict';

describe('Filter: neighbourhood', function () {

  // load the filter's module
  beforeEach(module('restaurantReviewsApp'));

  // initialize a new instance of the filter before each test
  var neighbourhood;
  beforeEach(inject(function ($filter) {
    neighbourhood = $filter('neighbourhood');
  }));

  it('should return the input prefixed with "neighbourhood filter:"', function () {
    var text = 'angularjs';
    expect(neighbourhood(text)).toBe('neighbourhood filter: ' + text);
  });

});
