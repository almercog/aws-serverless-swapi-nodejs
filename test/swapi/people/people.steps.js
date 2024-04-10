defineFeature(feature, test => {
  test('Create a people', ({
    given,
    when,
    then
  }) => {
    given(/^A user (.*)$/, (arg0) => {

    });

    when('I send POST request to /people', () => {

    });

    then(/^I get (.*)$/, (arg0) => {

    });
  });
  test('Get All people', ({
    when,
    then
  }) => {
    when('I send GET request to /people', () => {

    });

    then(/^I get (.*)$/, (arg0) => {

    });
  });
  test('Get people', ({
    given,
    when,
    then
  }) => {
    given(/^A user with (.*) exist$/, (arg0) => {

    });

    when('I send GET request to /people/', () => {

    });

    then(/^I get (.*)$/, (arg0) => {

    });
  });
  test('modify people', ({
    given,
    when,
    then
  }) => {
    given(/^A user with (.*) exist$/, (arg0) => {

    });

    when(/^I send PATCH request with a (.*) to /people / $ / , (arg0) => {

    });

    then(/^I get (.*)$/, (arg0) => {

    });
  });
  test('delete people', ({
    given,
    when,
    then
  }) => {
    given(/^A user with (.*) exist$/, (arg0) => {

    });

    when('I send DELETE request to /people/', () => {

    });

    then(/^I get (.*)$/, (arg0) => {

    });
  });
});