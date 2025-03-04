import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateProject = () => {
  // State for handling form data
  const [formData, setFormData] = useState({
    projectName: "",
    language: "",
    code: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle programming language selection
  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, language: value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/code",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Project created successfully!");
      console.log("Success Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(
        "Project creation failed! " +
          (error.response?.data?.message || "Try again.")
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black pt-18">
      <Toaster position="top-right" /> {/* Toast notifications */}
      <Card className="w-[450px] bg-[#121212] text-white border border-gray-700">
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Project Name Input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  className="bg-[#1f1f1f] text-white border-gray-600"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </div>

              {/* Programming Language Selection */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">Programming Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger
                    id="language"
                    className="bg-[#1f1f1f] text-white border-gray-600"
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1f1f1f] text-white border-gray-600">
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="golang">Go (Golang)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Code Input Field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Code</Label>
                <textarea
                  id="code"
                  className="w-full h-32 p-2 bg-[#1f1f1f] text-white border-gray-600 rounded-md"
                  placeholder="Paste your code here..."
                  value={formData.code}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Form Actions */}
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Deploy</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;
