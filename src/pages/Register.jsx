import { useState } from "react";
import { supabase } from "../utils/supabaseclient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Verification email sent. Check your inbox.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={registerUser}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}