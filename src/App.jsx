import { useState } from "react";
import TestComponent from "./components/TestComponent";
import UserContext from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { store } from "./store";
import { Provider } from "react-redux";
import WatchList from "./components/WatchList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  // const [user, setUser] = useState({ name: "", isLoggedIn: false });
  const [user, setUser] = useState(() => {
    // .getItem retrieves a value from our webStorage based on the key we pass it
    // in this case our application will search for a key called "user" in our sessionStorage and then return that data if it exists or return null otherwise
    
    let currentUser = sessionStorage.getItem("user");
    if(currentUser){
      // currentUser is good, we have data so unstringify it
      return JSON.parse(currentUser) // converts (parses) our string into an object
    } else {
      // currentUser is null, we don't have data so set up a default user
      return { name: "", isLoggedIn: false }
    }
  });

  return (
    <>
      {/* <TestComponent count={count} person={person}/> */}

      {/* Everything inside our UserContext.Provider will have access to the user state */}
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserContext.Provider value={{ user, setUser }}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/watch-list" element={<WatchList />} />
              </Routes>
            </Router>
          </UserContext.Provider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
