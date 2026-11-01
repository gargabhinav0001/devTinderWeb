import { signupUser } from "../../actions/signup";
import SignupPage from "./SignupPage";

function Signup() {
  const handleSignup = async (payload) => {
    try {
      const response = await signupUser(payload);

      return response;
    } catch (error) {
      console.error("Signup failed:", error);
      return {
        status: 400,
        message: "Signup failed. Please try again.",
        data: {},
      };
    }
  };

  return <SignupPage onSignup={handleSignup} />;
}

export default Signup;
