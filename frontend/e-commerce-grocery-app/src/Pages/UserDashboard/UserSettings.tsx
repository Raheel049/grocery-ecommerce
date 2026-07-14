import React from "react";
import {
    FiGlobe,
    FiLock,
    FiMonitor,
    FiKey,
    FiCreditCard,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SettingCard from "../../components/UserComponent/SettingCard.js";
import { Link } from "react-router-dom";

const UserSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
                Settings
            </h1>

            <p className="text-gray-400 mb-8">
                Manage your account settings.
            </p>

            <div className="space-y-5">
                <SettingCard
                    title="Preferences"
                    description="Language & Timezone"
                    icon={<FiGlobe />}
                    onClick={() => console.log("Preferences")}
                />

                <SettingCard
                    title="Change Password"
                    description="Update your account password"
                    icon={<FiLock />}
                    onClick={() => console.log("Password")}
                />

                {/* Sahi complete nested path par redirect karein */}
                <SettingCard
                    title="Device Management"
                    description="Manage logged in devices"
                    icon={<FiMonitor />}
                    onClick={() => navigate("/UserDashboard/DeviceManagement")}
                />

                <SettingCard
                    title="API Keys"
                    description="Create and manage API keys"
                    icon={<FiKey />}
                    onClick={() => console.log("API")}
                />

                <SettingCard
                    title="Subscription"
                    description="Manage your subscription"
                    icon={<FiCreditCard />}
                    onClick={() => console.log("Subscription")}
                />
            </div>
        </div>
    );
};

export default UserSettings;