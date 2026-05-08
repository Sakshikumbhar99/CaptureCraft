import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

function Admin() {
  const [submissions, setSubmissions] = useState([]);

  // Fetch all submissions
  const fetchSubmissions = async () => {
    const res = await API.get("/submissions");
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Approve function
  const handleApprove = async (id) => {
    await API.put(`/submissions/${id}`, {
      status: "approved"
    });

    fetchSubmissions(); // refresh data
  };

  // Reject function
  const handleReject = async (id) => {
    await API.put(`/submissions/${id}`, {
      status: "rejected"
    });

    fetchSubmissions();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel 🔐</h1>

      {submissions.map((item) => (
        <div key={item._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>Name:</b> {item.name}</p>
          <p><b>Title:</b> {item.title}</p>
          <p><b>Status:</b> {item.status}</p>

          <button onClick={() => handleApprove(item._id)}>
            Approve
          </button>

          <button onClick={() => handleReject(item._id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;