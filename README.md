# TugasCucumber_71220908

Buatlah step dari 3 skenario berikut dan susun 2 scenario lainnya (bebas, gherkin + step.js):

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

![Screenshot 2025-06-07 000042](https://github.com/user-attachments/assets/b8dd1a8f-47a2-4ebf-92d5-74da2d5ed1b8)
