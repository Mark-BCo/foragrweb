What is Middleware?

Middleware can add additional functionality to the REST api.
Preliminary request processing

Three types of middleware:

1. Built In
2. Custom
3. Third-Party

------- Server Side Tasks -----------

1. State management [x]
2. File Structure [x]
3. Routing structure [Partial]
4. Redux and RTK query [Partial]
5. Redux file structure [Partial]
6. User Schema [x]
7. Axios [Partial] (Client side requests)
8. Controllers [Partial]
9. Plant Schema [Partial]
10. Crafting Schema [x]
11. Folklore Schema [x]
12. Recipie Schema [x]
13. Location Schema [Partial]
14. Confirm final database []

---------  Client Side tasks ----------

1. Add a public page [x]
2. Allow a user to register on the site (axios request) [x]
3. After registraion gather the users interests []
        - Are you new to foraging? (Options, radio buttons, determine user) []
        - Do you enjoy making crafts? (Yes, No) []
        - Do you enjoy cooking? (Yes, No) []
        - Would you like to know more about sustainble living? (Yes, No) []
        - Would you like to know more about folklore and the enviornment in your local area? (Yes, No) []

        - Professional questions geared towards a professional []
        
4. Add a welcome page after login [x]
5. Add a logout function [x]
6. Authorisation - Users can be admin, manager or user [x]
7. Add a new user [x]
8. Update user details [x]
9. Password reset function for users []
10. Delete a user [x]
11. Search function [x]
12. Pin foraging spots on a map and add a comment section [Partial]
13. Create an upload photo function to allow users to upload pictures []
14. Add a professional page with bio, events and links to their own website []
15. (Optional) User challenges - see if a user can find a certain species and mark off the species they find []
16. (Optional) Each time a user finds a species a user gains points increasing their knowledge of foraging []


Purpose of imports:

1. ASYNC HANDLER - Middleware that handles exceptions inside of express routes and passes them to express error handlers

