import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "@/redux/Store";
import Login from "./Login";

import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const CreateProject = () => {
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [data, setData] = useState([]);

  const { _id } = useSelector((store) => store.app.user) || {};
  const userId = _id;

  function getdata() {
    axios
      .get("http://localhost:8000/user/getallcodes", {
        withCredentials: true,
      })
      .then((e) => {
        setData(e.data.code);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getdata();
  }, []);

  const toggleLanguages = () => {
    setIsLanguageVisible(!isLanguageVisible);
  };

  const copyToClipboard = (id) => {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${id}`, {
        withCredentials: true,
      });
      setData((prevData) => prevData.filter((post) => post._id !== id));
      alert("Code deleted successfully!");
      getdata();
    } catch (error) {
      console.error("Delete failed", error.response?.data || error.message);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="bg-gradient-to-br scrollbar-hide from-gray-900 via-black to-gray-900 text-white font-inter min-h-screen flex flex-col md:flex-row pt-20">
      {/* Sidebar Left */}
      <aside className="w-full md:w-1/5 bg-slate-950 bg-opacity-40 backdrop-blur-lg border-b md:border-r border-gray-700 p-4">
        <Card className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Deploy Your Code</h4>
          <p className="text-gray-400 text-sm mb-4">
            Create your code and save it for your future use. Easy to solve and
            find any problem.
          </p>
          <Button className="w-full">
            <Link to="/deploy">Deploy Now</Link>
          </Button>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-scroll scrollbar-hide h-[88vh]">
        <h1 className="text-white text-center text-4xl font-bold p-2">
          Code Posts
        </h1>
        {data.reverse().map((e, index) => (
          <Card
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-2"
          >
            <div className="flex items-center justify-between ">
              <h1 className="text-xl text-white break-words">
                Name: {e.createdBy.username}
              </h1>
              <Button variant="outline">
                <Link to={`/user/profile/${e.createdBy._id}`}>
                  View Profile
                </Link>
              </Button>
            </div>
            <p className="text-lg text-gray-300  break-words">
              Language: {e.language}
            </p>
            <p className="text-lg text-gray-200  break-words">
              Description: {e.projectName}
            </p>
            <span className="text-lg text-white">Code:</span>
            <div className="relative">
              <pre
                id={`codeBlock${index}`}
                className="text-sm bg-black text-gray-300 p-4 rounded-lg overflow-auto break-all border border-gray-700"
              >
                {e.code}
              </pre>
              <Button
                onClick={() => copyToClipboard(`codeBlock${index}`)}
                variant="secondary"
                className="absolute top-2 right-2"
              >
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              Posted on: {new Date(e.createdAt).toLocaleString()}
            </p>
            {userId === e.createdBy._id && (
              <Button onClick={() => deletePost(e._id)} variant="destructive">
                Delete
              </Button>
            )}
            <Link
              to={`/code/comment/${e._id}`}
              className=" flex justify-center"
            >
              <Button variant="outline">Give Comments</Button>
            </Link>
          </Card>
        ))}
      </main>

      {/* Sidebar Right */}
      <aside className="w-full md:w-1/5 bg-slate-950 bg-opacity-40 backdrop-blur-lg border-t md:border-l border-gray-700 p-2">
        <h3 className="text-lg font-semibold mb-2">On This Page</h3>
        <ul className="space-y-1 text-gray-300">
          <li>Public Codes</li>
          <li>See</li>
          <li>Changelog</li>
        </ul>
        <Card className="mt-2 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <h4 className="text-white font-semibold mb-2">
            Bring your app built with shadcn to life on Vercel
          </h4>
          <p className="text-gray-400 text-sm mb-4">
            Trusted by OpenAI, Sonos, Chick-fil-A, and more. Vercel provides
            tools and infrastructure to deploy apps and features at scale.
          </p>
          <Button>Deploy Now</Button>
        </Card>
      </aside>
    </div>
  );
};

export default CreateProject;
