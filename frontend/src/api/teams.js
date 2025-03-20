import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const inviteTeamMember = async (email) => {
  const token = localStorage.getItem("token");
  const teamId = localStorage.getItem("teamId");

  const response = await axios.post(
    `${API_BASE_URL}/invitations`,
    { teamId, email, role: "member", ownerId: localStorage.getItem("userId") },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Invitation failed");
  }

  return response.data;
};

export const fetchTeamMembers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch team members");
  }

  return response.data;
};

export const fetchPendingInvitations = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/invitations/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch pending invitations");
  }

  return response.data;
};