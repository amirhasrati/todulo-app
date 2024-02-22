import Input from "./Input";
import { useState } from "react";

function RegistrationForm({ register }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    const validateUsername = (username) => {
        setUsernameIsValid(username.length > 0);
    };
    const validatePassword = (password) => {
        if (password.length > 0) {
            setPasswordIsValid(true);
        } else {
            setPasswordIsValid(false);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "username") validateUsername(e.target.value);
        if (e.target.name === "password") validatePassword(e.target.value);

        setFormData((currData) => {
            return {
                ...currData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usernameIsValid && passwordIsValid) {
            register(formData);
            setFormData({ username: "", password: "" });
            setUsernameIsValid(false);
            setPasswordIsValid(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-6 px-8">
                <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <Input
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button className="bg-rose-500 text-white p-2 mx-16 rounded-full mt-4 hover:bg-rose-600 transition delay-75">
                    Register
                </button>
            </div>
        </form>
    );
}

export default RegistrationForm;
