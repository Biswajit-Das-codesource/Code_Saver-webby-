import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast, Toaster } from "sonner";

const Viewcode = () => {
  const [commentDetails, setCommentDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({ text: "" });
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/getcode/${id}`,
          {
            withCredentials: true,
          }
        );
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

  if (!commentDetails) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white pt-10">
      <Toaster position="top-right" />

      {/* Code Section */}
      <div className="w-full md:w-full p-7 border-b md:border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Code</h2>
        <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-auto border border-gray-700">
          {commentDetails.code.code}
        </pre>
      </div>
    </div>
  );
};

export default Viewcode;
