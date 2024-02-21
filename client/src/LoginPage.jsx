import Navbar from "./Navbar";
import LoginForm from "./LoginForm";

function LoginPage() {
    const signIn = async (signInData) => {
        const res = await fetch("http://localhost:3000/api/login", {
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
        <div className="h-screen flex flex-col relative">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <div className="w-96 h-96 border border-gray-200 rounded-xl shadow-xl p-4">
                    <h1 className="text-rose-400 text-2xl text-center py-4">
                        Sign in to Todulo
                    </h1>
                    <p className="text-gray-400 text-center">
                        Welcome back! Please sign in to continue
                    </p>
                    <LoginForm signIn={signIn} />
                    <div className="text-rose-300 text-center my-2 p-2">
                        <a href="/register">New to Todulo? Sign up here</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
