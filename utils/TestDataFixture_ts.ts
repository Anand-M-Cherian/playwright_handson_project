import {test as base} from '@playwright/test';

type TestDataFixture = {
    testDataFixture: {
        emailId: string;
        password: string;
    }
};

export const testWithDataAsFixture = base.extend<TestDataFixture> ({
    testDataFixture : {
        emailId: "anand@ygag.com",
        password: "Ygag123!@"
    }
});