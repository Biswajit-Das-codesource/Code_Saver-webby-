import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      {/* Profile Card */}
      <Card className="w-96 bg-gray-800 shadow-xl rounded-xl p-6 text-center border border-gray-700 mt-10">
        <CardHeader>
          <img
            src="http://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
          />
          <CardTitle className="text-2xl font-semibold mt-3">
            {user.username}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm">📧 {user.user.email}</p>
          <p className="text-gray-300 text-sm">📞 {user.user.phonenumber}</p>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-200">
          Repositories
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="border-b border-gray-700 py-4 last:border-b-0 flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-blue-400 hover:underline cursor-pointer transition-all duration-200">
                  {project.projectName}
                </h3>
                <p className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-lg border border-gray-600">
                  🟢 {project.language}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No repositories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
