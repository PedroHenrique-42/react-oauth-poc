import { User, UserManager } from "oidc-client-ts";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SigninRedirectProps {
  userManager: UserManager;
}

const SigninRedirect: React.FC<SigninRedirectProps> = ({ userManager }) => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    userManager
      .signinCallback()
      .then((user) => {
        console.log("signin popup callback response success");
        if (user) {
          setUser(user);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [userManager]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <p>Processing Signin...</p>;
};

export default SigninRedirect;
