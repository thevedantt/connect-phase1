import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../lib/firebase"; // Ensure correct import
import { doc, setDoc } from "firebase/firestore"; // Fix the typo
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  // Handle Avatar Upload
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Upload avatar to Firebase Storage if there's a file selected
      let avatarURL = "";
      if (avatar.file) {
        const avatarRef = ref(storage, `avatars/${avatar.file.name}`);
        await uploadBytes(avatarRef, avatar.file);
        avatarURL = await getDownloadURL(avatarRef); // Get the download URL of the uploaded image
      }

      // Add user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        username: username,
        email: email,
        avatarURL: avatarURL,  // Save the avatar URL
        createdAt: new Date(),
        blocked: [],
      });

      // Add user chats data
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created successfully!");
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error(err.message);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (err) {
      console.error("Error during login:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">Upload an Image</label>
          <img src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" required />
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
