Feature: SauceDemo Login
  As a user
  I want to login to SauceDemo website
  So that I can access the application

  Scenario: Successful login with valid credentials
    Given I am on the SauceDemo login page
    When I enter valid username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the products page
    And I should see the products header