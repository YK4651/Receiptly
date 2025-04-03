import React, { useState, useEffect } from "react";
import { inviteTeamMember, fetchTeamMembers, fetchPendingInvitations } from "../../../api/teams";
import { ToastContainer, toast } from "react-toastify";
import Toast from "../../common/Toast";

const Teams = () => {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(null);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [toast, setToast] = useState({ message: null, type: "success", title: null });

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        const data = await fetchTeamMembers();
        if (data.length > 0) {
          setTeam(data[0]);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setToast({
          message: "Error fetching team members. Please try again later",
          type: "error",
          title: error.message,
      });
      }
    };

    const getPendingInvitations = async () => {
      try {
        const data = await fetchPendingInvitations();
        setPendingInvitations(data);
      } catch (error) {
        console.error("Error fetching pending invitations:", error);
        setToast({
          message: "Error fetching pending invitations. Please try again later",
          type: "error",
          title: error.message,
      });
      }
    };

    getTeamMembers();
    getPendingInvitations();
  }, []);

  const handleInvite = async () => {
    try {
      await inviteTeamMember(email);
      toast.success("Invitation sent successfully");
      setEmail("");
      const data = await fetchPendingInvitations();
      setPendingInvitations(data);
      
    } catch (error) {
      console.error("Error sending invitation:", error);
      setToast({
        message: "Error sending invitation. Please try again later",
        type: "error",
        title: error.message,
    });
    }
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
       {toast.message && (
          <Toast
            type={toast.type}
            message={toast.message}
            title={toast.error || toast.title}
            onClose={() => setToast({ ...toast, message: null })}
          />
        )}
      <h2 className="text-2xl font-medium mb-4">Manage Team</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2">Invite Team Member:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Enter email"
        />
        <button
          onClick={handleInvite}
          className="p-2 bg-[#2E39E6] text-white rounded-lg"
        >
          Send Invitation
        </button>
      </div>
      {pendingInvitations.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Pending Invitations</h3>
          <ul>
            {pendingInvitations.map((invitation) => (
              <li key={invitation._id} className="mb-2">
                {invitation.email}
              </li>
            ))}
          </ul>
        </div>
      )}
      {team && (
        <div>
          <h3 className="text-xl font-medium mb-2">Team Members</h3>
          <ul>
            {team.members.map((member) => (
              <li key={member._id} className="mb-2">
                {member.name} ({member.email})
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Teams;