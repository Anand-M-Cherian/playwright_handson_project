Feature: Login Validations
    @negative
    Scenario Outline: Verify that user cannot login with invalid credentials
        When user enters "<email>" as email id and "<password>" as password
        Then incorrect login message should be displayed

        Examples:
            | email             | password          | 
            | anand@gmail.com   | password123!@     | 
            | tony@gmail.com    | qwerty123!@       |  