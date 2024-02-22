import Navbar from "./Navbar";
import RegistrationForm from "./RegistrationForm";

function RegistrationPage() {
    const register = async (registerData) => {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res) => {
            if (res.status === 200) {
                window.location.href = "/todo";
            } else if (res.status === 401) {
                alert("Failed to create account, please try again.");
            }
        });
    };

    return (
        <div className="GradientBackground h-screen flex flex-col relative">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <div className="bg-white w-80 h-96 rounded-xl shadow-2xl p-2">
                    <h1 className="text-rose-500 text-2xl text-center py-4">
                        Create a new account
                    </h1>
                    <p className="text-gray-400 text-center mx-8">
                        Welcome to Todulo! Please sign up to continue
                    </p>
                    <RegistrationForm register={register} />
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
