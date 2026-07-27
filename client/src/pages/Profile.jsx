import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getProfile,
    updateProfile,
    changePassword,
    logout,
} from "../api/profile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    const [name, setName] = useState("");

    const [passwords, setPasswords] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

    });

    async function fetchProfile() {

        try {

            const response = await getProfile();

            setProfile(response.data.data);

            setName(response.data.data.name);

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }
        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchProfile();

    }, []);

    async function handleUpdateProfile(e) {

        e.preventDefault();

        try {

            const response =
                await updateProfile({
                    name,
                });

            setProfile(response.data.data);

            toast.success(
                "Profile updated"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleChangePassword(e) {

        e.preventDefault();

        if (
            passwords.newPassword !==
            passwords.confirmPassword
        ) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }

        try {

            await changePassword({

                currentPassword:
                    passwords.currentPassword,

                newPassword:
                    passwords.newPassword,

            });

            toast.success(
                "Password changed"
            );

            setPasswords({

                currentPassword: "",

                newPassword: "",

                confirmPassword: "",

            });

        }
        catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }

    }

    async function handleLogout() {

        try {

            await logout();

        }
        finally {

            navigate("/login");

        }

    }

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="p-8">

                    Loading...

                </div>
            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="max-w-xl mx-auto p-6 space-y-8">

                <div className="text-center">

                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold">

                        {profile.name[0].toUpperCase()}

                    </div>

                    <h2 className="text-2xl font-bold">

                        {profile.name}

                    </h2>

                    <p className="text-gray-500">

                        {profile.email}

                    </p>

                </div>

                <form
                    onSubmit={handleUpdateProfile}
                    className="space-y-4"
                >

                    <Label>

                        Name

                    </Label>

                    <Input
                        value={name}
                        onChange={(e)=>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <Button type="submit">

                        Update Profile

                    </Button>

                </form>

                <form
                    onSubmit={handleChangePassword}
                    className="space-y-4"
                >

                    <Label>

                        Current Password

                    </Label>

                    <Input
                        type="password"
                        value={
                            passwords.currentPassword
                        }
                        onChange={(e)=>

                            setPasswords({

                                ...passwords,

                                currentPassword:
                                    e.target.value,

                            })

                        }
                    />

                    <Label>

                        New Password

                    </Label>

                    <Input
                        type="password"
                        value={
                            passwords.newPassword
                        }
                        onChange={(e)=>

                            setPasswords({

                                ...passwords,

                                newPassword:
                                    e.target.value,

                            })

                        }
                    />

                    <Label>

                        Confirm Password

                    </Label>

                    <Input
                        type="password"
                        value={
                            passwords.confirmPassword
                        }
                        onChange={(e)=>

                            setPasswords({

                                ...passwords,

                                confirmPassword:
                                    e.target.value,

                            })

                        }
                    />

                    <Button type="submit">

                        Change Password

                    </Button>

                </form>

                <Button
                    variant="destructive"
                    onClick={handleLogout}
                >

                    Logout

                </Button>

            </div>

        </>

    );

}