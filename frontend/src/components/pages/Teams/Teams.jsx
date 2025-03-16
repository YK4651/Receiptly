import React, { useState, useEffect } from "react";
import { inviteTeamMember, fetchTeamMembers } from "../../../api/teams";
import { toast } from "react-toastify";

const Teams = () => {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        const data = await fetchTeamMembers();
        if (data.length > 0) {
          setTeam(data[0]);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast.error("Error fetching team members");
      }
    };

    getTeamMembers();
  }, []);

  const handleInvite = async () => {
    try {
      await inviteTeamMember(email);
      toast.success("Invitation sent successfully");
      setEmail("");
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("Error sending invitation");
    }
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
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
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Send Invitation
        </button>
      </div>
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
    </div>
  );
};

export default Teams;