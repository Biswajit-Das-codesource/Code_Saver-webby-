import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast, Toaster } from "sonner";

const CodeCommentPage = () => {
  const [commentDetails, setCommentDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({ text: "" });
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:8000/user/getcode/${id}`, {
          withCredentials: true,
        });
        setCommentDetails(response.data);
        setComments(response.data.userCodes.comments || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/user/addComment/${id}`, // Use `id` dynamically
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Success:", response.data);
      toast.success(response?.data.message);

      setComments([...comments, { text: userData.text, user: { username: "You" } }]);

      setUserData({ text: "" }); // Clear input field
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!commentDetails) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white pt-10">
      <Toaster position="top-right" />

      {/* Code Section */}
      <div className="w-full md:w-1/2 p-6 border-b md:border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Code</h2>
        <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-auto border border-gray-700">
          {commentDetails.code.code}
        </pre>
      </div>

      {/* Comments Section */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((e, index) => (
            <div key={index} className="bg-gray-800 p-3 rounded-lg">
              <p>{e.text}</p>
              <span className="text-gray-500 text-sm">{e.user?.username || "Anonymous"}</span>
            </div>
          ))}
        </div>

        {/* Add Comment Input */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            name="text"
            value={userData.text}
            onChange={handleChange}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
            onClick={submitComment}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeCommentPage;
