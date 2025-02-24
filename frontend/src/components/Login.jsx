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
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "@/redux/Slice";

export default function Login() {

  const user = useSelector((store)=>store.app.user)
  console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate(); 
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  async function onHandleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", input);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        input,
        { withCredentials: true } 
      );
      dispatch(setuser(response.data.user))
      toast.success("Login Successful! Redirecting...");
      console.log("Login Success:", response.data);
      setTimeout(() => navigate("/"), 2000);  

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error("Login Failed! " + (error.response?.data?.message || "Invalid credentials."));
    }
  }

  
  return (
    <>
      <Toaster />
      <Aurora colorStops={["#3A29AF", "#FF94B4", "#FF3232"]} speed={0.5} />
      <div className="h-[80vh] w-full flex justify-center items-center bg-black">
        <Card className="w-[400px] bg-white shadow-lg p-4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onHandleSubmit}>
              <div className="grid w-full items-center gap-4">
               
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
