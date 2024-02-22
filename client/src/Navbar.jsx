import { useState, useEffect } from "react";
import "./GradientBackground.css";
import NavbarBtn from "./NavbarBtn";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("/api/session", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setIsLoggedIn(data);
            });
    }, []);

    const logout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
        window.location.href = "/";
        setIsLoggedIn(false);
    };

    return (
        <div className="GradientBackground flex p-2 min-h-16 items-center justify-center md:justify-end">
            <div className="md:flex-1">
                <NavbarBtn name={"Todulo"} dest={"/"} />

                {isLoggedIn && <NavbarBtn name={"Tasks"} dest={"/todo"} />}
            </div>

            <div className="">
                {!isLoggedIn && <NavbarBtn name={"Login"} dest={"/login"} />}
                {isLoggedIn && (
                    <NavbarBtn name={"Logout"} dest={"/"} action={logout} />
                )}
            </div>
        </div>
    );
}
