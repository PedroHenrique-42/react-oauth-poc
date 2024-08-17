import { User, UserManager } from "oidc-client-ts";
import React from "react";

interface HomeProps {
  userManager: UserManager;
}

const Home: React.FC<HomeProps> = ({ userManager }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    userManager
      .getUser()
      .then((user) => {
        setUser(user);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [userManager]);

  const signinPopupHandler = async () => {
    try {
      const user = await userManager.signinPopup();
      setUser(user);
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  const signinRedirectHandler = async () => {
    try {
      await userManager.signinRedirect();
    } catch (err) {
      console.error(err);
    }
  };

  const signOutPopupHandler = async () => {
    try {
      await userManager.signoutPopup();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const signOutRedirectHandler = async () => {
    try {
      await userManager.signoutRedirect();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {user ? (
          <div>
            <p>Welcome, {user.profile.preferred_username}!</p>
            <button onClick={signOutPopupHandler}>Popup Logout</button>
            <button onClick={signOutRedirectHandler}>Redirect Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={signinPopupHandler}>Popup Login</button>
            <button onClick={signinRedirectHandler}>Redirect Login</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
