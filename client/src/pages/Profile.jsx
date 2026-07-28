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

                <div className="flex h-[70vh] items-center justify-center">
                    <p className="text-lg text-gray-500">
                        Loading profile...
                    </p>
                </div>
            </>

        );

    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 md:px-8 py-8">

                {/* Header */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your account settings and security.
                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Left Column */}
                    <div className="lg:col-span-1">

                        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl p-8 text-center">

                            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur text-4xl font-bold border border-white/30">

                                {profile.name[0].toUpperCase()}

                            </div>

                            <h2 className="text-2xl font-bold">

                                {profile.name}

                            </h2>

                            <p className="mt-2 text-blue-100">

                                {profile.email}

                            </p>

                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-8 lg:col-span-2">

                        {/* Update Profile */}
                        <div className="rounded-3xl border-l-8 border-blue-500 bg-white shadow-xl p-6">

                            <h2 className="text-xl font-semibold mb-6">
                                Profile Information
                            </h2>

                            <form
                                onSubmit={handleUpdateProfile}
                                className="space-y-5"
                            >

                                <div>

                                    <Label>
                                        Name
                                    </Label>

                                    <Input
                                        className="mt-2
                                        h-11
                                        rounded-xl
                                        border-blue-200
                                        focus:ring-2
                                        focus:ring-blue-500"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />

                                </div>

                                <Button
                                    className="
                                        bg-blue-600
                                        hover:bg-blue-700
                                        rounded-xl
                                        shadow-lg
                                    "
                                >
                                    Save Changes
                                </Button>

                            </form>

                        </div>

                        {/* Change Password */}
                        <div className="rounded-3xl border-l-8 border-amber-500 bg-white shadow-xl p-6">

                            <h2 className="text-xl font-semibold mb-6">
                                Change Password
                            </h2>

                            <form
                                onSubmit={handleChangePassword}
                                className="space-y-5"
                            >

                                <div>

                                    <Label>
                                        Current Password
                                    </Label>

                                    <Input
                                        className="mt-2
                                        h-11
                                        rounded-xl
                                        border-blue-200
                                        focus:ring-2
                                        focus:ring-blue-500"
                                        type="password"
                                        value={passwords.currentPassword}
                                        onChange={(e) =>
                                            setPasswords({
                                                ...passwords,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                    />

                                </div>

                                <div>

                                    <Label>
                                        New Password
                                    </Label>

                                    <Input
                                        className="mt-2
                                        h-11
                                        rounded-xl
                                        border-blue-200
                                        focus:ring-2
                                        focus:ring-blue-500"
                                        type="password"
                                        value={passwords.newPassword}
                                        onChange={(e) =>
                                            setPasswords({
                                                ...passwords,
                                                newPassword: e.target.value,
                                            })
                                        }
                                    />

                                </div>

                                <div>

                                    <Label>
                                        Confirm Password
                                    </Label>

                                    <Input
                                        className="mt-2
                                        h-11
                                        rounded-xl
                                        border-blue-200
                                        focus:ring-2
                                        focus:ring-blue-500"
                                        type="password"
                                        value={passwords.confirmPassword}
                                        onChange={(e) =>
                                            setPasswords({
                                                ...passwords,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    />

                                </div>

                                <Button
                                    className="
                                        bg-amber-500
                                        hover:bg-amber-600
                                        rounded-xl
                                        shadow-lg
                                    "
                                >
                                    Update Password
                                </Button>

                            </form>

                        </div>

                        {/* Logout */}
                        <div className="rounded-3xl border-l-8 border-red-500 bg-white shadow-xl p-6">

                            <h2 className="text-xl font-bold text-slate-800">
                                Account
                            </h2>

                            <p className="text-gray-500 mb-6">
                                Sign out from your account.
                            </p>

                            <Button
                                className="
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-red-500
                                    to-rose-600
                                    hover:from-red-600
                                    hover:to-rose-700
                                    text-white
                                    shadow-lg
                                "
                            >
                                Logout
                            </Button>

                        </div>

                    </div>

                </div>

            </main>

        </>
    );

}