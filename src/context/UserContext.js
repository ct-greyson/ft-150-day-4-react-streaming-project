import { createContext } from "react";

// our first context.  context is a global state management tool meaning we can access the state in our context throughout our application
// to set up context we use createContext and set up the data we want to keep track of.  in this case it's our user (data) and our setUser function (to modify our state)
const UserContext = createContext({
    user: { name: '', isLoggedIn: false }, //default data shape
    setUser: () => {} //setting it to an empty function is us specifying that this will be a function
})

export default UserContext;