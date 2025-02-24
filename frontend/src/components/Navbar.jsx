import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react"; // ✅ Icons for mobile menu
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("bottom");

  const isUser = useSelector((store)=>store.app.user)


  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent shadow-md z-50 ">
      <div className="container mx-auto flex justify-around items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-white font-bold text-2xl">Webby</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-white font-semibold">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/codes" className="hover:text-gray-400">
            Codes
          </Link>
          <Link to="/explore" className="hover:text-gray-400">
            Explore
          </Link>
          <Link to="/docs" className="hover:text-gray-400">
            Docs
          </Link>

          {isUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="h-10 rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white text-black">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Bottom
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Right
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
             
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          )}

          {/* User Avatar Dropdown */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu (Visible when `isOpen` is true) */}
      {isOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center gap-4 py-4">
          <Link
            to="/"
            className="hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/codes"
            className="hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Codes
          </Link>
          <Link
            to="/explore"
            className="hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Explore
          </Link>
          <Link
            to="/docs"
            className="hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Docs
          </Link>

          <Link to="/login" onClick={() => setIsOpen(false)}>
            <Button>Login</Button>
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            <Button>Signup</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
