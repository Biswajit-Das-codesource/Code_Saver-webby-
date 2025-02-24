import * as React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";
import { useState } from "react";
import axios from "axios";  // Import Axios
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setuser } from "@/redux/Slice";

export default function Signup() {

  const navigate=useNavigate()

  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    phonenumber: "",
  });

  function handleChange(e) {


    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const dispatch=useDispatch()
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting Data:", input);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup", // Adjust the API URL if needed
        input,
        { withCredentials: true } // Allows cookies if used
      );
      
      toast("signup Success fully")
      console.log("Signup Success:", response.data);  
      setTimeout(() => navigate("/login"), 2000);  
      // dispatch(setuser())
    } catch (error) {
      console.log(error)
      console.error("Signup Error:", error.response?.data);
     toast.error("Signup Failed! " + (error.response?.data?.message || "Try again."));
    }
  }

  return (
    <>
      <Aurora colorStops={["#3A29AF", "#FF94B4", "#FF3232"]} speed={0.5} />
      <div className="h-[80vh] w-full bg-black flex justify-center items-center absolute overflow-hidden">
        <Card className="w-[500px] bg-white">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Register your details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* Username */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" onChange={handleChange} name="username" />
                </div>
                <Toaster position="top-right"/>
                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" onChange={handleChange} name="email" />
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" onChange={handleChange} name="password" />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" onChange={handleChange} name="phonenumber" />
                </div>
              </div>

              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Register</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
