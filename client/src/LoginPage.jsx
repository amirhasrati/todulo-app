import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import "./GradientBackground.css";

function LoginPage() {
    const signIn = async (signInData) => {
        await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(signInData),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res) => {
            if (res.status === 200) {
                window.location.href = "/todo";
            } else if (res.status === 401) {
                alert("Invalid username or password");
            }
        });
    };

    return (
        <div className="GradientBackground h-screen flex flex-col relative">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <div className="bg-white w-80 h-96 rounded-xl shadow-2xl p-2">
                    <h1 className="text-rose-500 text-2xl text-center py-4">
                        Sign in to Todulo
                    </h1>
                    <p className="text-gray-400 text-center mx-2">
                        Welcome back! Please sign in to continue
                    </p>
                    <LoginForm signIn={signIn} />
                    <div className="text-rose-400 text-center my-2 p-2">
                        <a href="/register">New to Todulo? Sign up here</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
