const {test} = require('@playwright/test');

export const testWithDataAsFixture = test.extend ({
    testDataFixture : {
        emailId: "anand@ygag.com",
        password: "Ygag123!@"
    }
});