Feature: User login

  Scenario: Login with valid details
    Given the user is on the login page
    When the user enters a valid username and password
    And the user clicks the login button
    Then the user should see a success message

  Scenario: Failed login with invalid credential
    Given the user is on the login page
    When the user enters an invalid username and password
    And the user clicks the login button
    Then the user should see a failed message

  Scenario: Successfully adding an item to cart
    Given the user is on the login page
    And the user is on the item page
    When the user add item to the cart
    And the user in the item list
    Then item should be seen in the item page

  Scenario: Successfully removing an item from cart
    Given the user is on the login page
    And the user is on the item page
    When the user add item to the cart
    And the user in the item list
    When the user remove item to the cart
    Then item shouldn't be seen in the item page

  Scenario: Sort items by price from low to high
    Given the user is on the login page
    And the user is on the item page
    When the user selects sort by price low to high
    Then the first item should be the cheapest

  Scenario: View item details page
    Given the user is on the login page
    And the user is on the item page
    When the user clicks on an item
    Then the user should see the item detail page
