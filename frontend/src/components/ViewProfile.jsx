import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileCard = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/user/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
        setProjects(data.projects || []);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 animate-pulse">Loading...</p>;
  if (!user) return <p className="text-center text-red-500 text-lg font-semibold">User not found</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white py-12 px-4">
      {/* Profile Card */}
      <Card className="w-full max-w-md shadow-2xl p-6 text-center bg-gradient-to-b from-black to-gray-900 border border-gray-800 rounded-2xl transform transition duration-300 hover:scale-105 mt-10">
        <CardHeader>
          <img
            src="http://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-lg transition-all duration-300 hover:scale-110"
          />
          <CardTitle className="text-2xl font-semibold mt-4 text-blue-400">
            {user.username}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <p className="text-gray-400 text-lg">{user.user.username.toUpperCase()}</p>
      
          <p className="text-gray-400 text-lg">📧 {user.user.email}</p>
          <p className="text-gray-400 text-lg">📞 {user.user.phonenumber}</p>
          <p className="text-gray-200 text-lg">
            <span className="text-teal-300 text-xl font-bold">Bio:</span>
            <br />
            {!user.user.bio ? "____" : user.user.bio}
          </p>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <div className="mt-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-400 border-b-2 border-blue-500 pb-2">
          Repositories
        </h2>
        <div className="bg-gray-950 p-6 rounded-xl shadow-lg border border-gray-800">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="border-b border-gray-800 py-4 last:border-b-0 flex justify-between items-center transition-all duration-300 hover:bg-gray-900 px-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-blue-400 hover:underline cursor-pointer transition-all duration-200">
                  <Link to={`/viewcode/${project._id}`}>
                    {project.projectName}
                  </Link>
                </h3>
                <p className="text-gray-300 text-sm bg-gray-900 px-3 py-1 rounded-lg border border-gray-700">
                  🟢 {project.language}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg font-medium">No repositories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
