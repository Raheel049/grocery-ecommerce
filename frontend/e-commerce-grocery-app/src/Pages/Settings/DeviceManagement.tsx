import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceCard from "../../components/SessionManagement/DeviceCard.js";
import { getSessions, logoutDevice, logoutAllDevices } from "../../services/sessionService.js";
import type  { Session }  from "../../types/session.js";

const DeviceManagement = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSessions = async () => {
    try {
      setLoading(true);

      const response = await getSessions();
      console.log(response);
      setSessions(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleLogoutDevice = async (id: string) => {
    try {
      const confirmLogout = window.confirm(
        "Are you sure you want to logout this device?"
      );

      if (!confirmLogout) return;

      await logoutDevice(id);

      await loadSessions();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      const confirmLogout = window.confirm(
        "Logout from all devices?"
      );

      if (!confirmLogout) return;

      await logoutAllDevices();

      localStorage.clear();

      navigate("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const currentDevice = sessions.find(
    (session) => session.current === true
  );

  const otherDevices = sessions.filter(
    (session) => session.current === false
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading Devices...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        Device Management
      </h1>

      <p className="text-gray-500 mb-8">
        Manage all devices currently logged into your account.
      </p>

      {/* Current Device */}

      {currentDevice && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Current Device
          </h2>

          <DeviceCard
            session={currentDevice}
            onLogout={() => {}}
          />
        </>
      )}

      {/* Other Devices */}

      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Other Devices
        </h2>

        {otherDevices.length === 0 ? (
          <div className="border rounded-lg p-6 text-center text-gray-500">
            No other active devices found.
          </div>
        ) : (
          <div className="space-y-4">

            {otherDevices.map((session) => (
              <DeviceCard
                key={session._id}
                session={session}
                onLogout={() =>
                  handleLogoutDevice(session._id)
                }
              />
            ))}

          </div>
        )}

      </div>

      {/* Logout All */}

      {otherDevices.length > 0 && (
        <div className="mt-10">

          <button
            onClick={handleLogoutAllDevices}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Logout All Devices
          </button>

        </div>
      )}
    </div>
  );
};

export default DeviceManagement;