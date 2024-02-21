import Todo from "./Todo";
import LoginPage from "./LoginPage";
import Home from "./Home";
import RegistrationPage from "./RegistrationPage";

function App() {
    const path = window.location.pathname;

    return (
        <>
            {path == "/" && <Home />}

            {path === "/todo" && <Todo />}

            {path === "/login" && <LoginPage />}

            {path === "/register" && <RegistrationPage />}
        </>
    );
}

export default App;
