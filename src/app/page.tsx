"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  const onSignup = async () => {
    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong!");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
        },
      }
    );
  };

  const onSignin = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong!");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
        },
      }
    );
  };

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="p-4 w-150 flex flex-col space-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSignup} className="self-center">
          Sign up
        </Button>
      </div>
      <div className="p-4 w-150 flex flex-col space-y-4">
        <Input
          placeholder="email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSignin} className="self-center">
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Home;
