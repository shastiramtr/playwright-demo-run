Feature: Hotel Room Booking 
Scenario: User can book a hotel room successfully
Given the user is on the hotel booking website
When the user selects the check-in date as "2026-12-04" and check-out date as "2026-12-07"
And the user selects "2" adults
And the user clicks on the "Search" button
Then the user should see a list of available rooms for the selected dates and number of adults







