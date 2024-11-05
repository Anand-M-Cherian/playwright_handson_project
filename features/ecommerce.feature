Feature: Ecommerce Validations

    Validations related to ecommerce service
    @positive
    Scenario: Verify that user can place an order
        Given user logs into the ecommerce application with "fullstackdeveloper+1234@gmail.com" and "Password123!@#"
        When user adds "ADIDAS ORIGINAL" into the cart
        Then verify that "ADIDAS ORIGINAL" has been added into the cart
        When user enters valid receiver details with "India", "123", "Anand", "rahulshettyacademy", "fullstackdeveloper+1234@gmail.com" and places order
        Then verify that order id is generated and present in the order history

    Scenario Outline: Verify that user cannot login with invalid credentials
        When user enters "<email>" as email id and "<password>" as password
        Then incorrect login message should be displayed

        Examples:
            | email             | password          | 
            | anand@gmail.com   | password123!@     | 
            | tony@gmail.com    | qwerty123!@       |  