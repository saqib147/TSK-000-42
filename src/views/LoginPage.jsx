import FullPageLoader from "../components/FullPageLoader.jsx";
import { useState } from "react";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState();
  const [error, setError] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          id: user.uid,
          email: user.email,
        })
      );
      // ...
    } else {
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    // console.log(userCredentials);
  }

  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode);
      console.log(errorCode);
      // ..
    });
  }

  function handleLogIn(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode);
      console.log(errorCode);
    });
  }

  function handlePasswordReset() {
    const email = prompt("Enter your Email to reset your Password.");
    sendPasswordResetEmail(auth, email);
    alert("Email Sent! Check your inbox to reset your Password.");
  }
  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input
                onChange={(e) => {
                  handleCredentials(e);
                }}
                type="text"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                onChange={(e) => {
                  handleCredentials(e);
                }}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {loginType == "login" ? (
              <button
                onClick={(e) => {
                  handleLogIn(e);
                }}
                className="active btn btn-block"
              >
                Login
              </button>
            ) : (
              <button
                onClick={(e) => {
                  handleSignUp(e);
                }}
                className="active btn btn-block"
              >
                Sign Up
              </button>
            )}

            {error && <div className="error">{error}</div>}
            <p onClick={handlePasswordReset} className="forgot-password">
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
