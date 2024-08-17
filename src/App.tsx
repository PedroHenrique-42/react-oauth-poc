import { UserManager } from "oidc-client-ts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import SigninRedirect from "./SigninRedirect";
import SignoutRedirect from "./SignoutRedirect";

function App() {
  // export const client: UserManager = new UserManager({
  //   authority: "http://localhost:9000",
  //   client_id: "daf-webui",
  //   client_secret: "webui-secret",
  //   redirect_uri: "http://localhost:5050/login",
  //   // popup_redirect_uri: "http://localhost:5050/login",
  //   scope: "openid profile",
  //   client_authentication: "client_secret_basic",
  //   loadUserInfo: true,
  // });

  const userManager = new UserManager({
    authority: "http://localhost:9000",
    client_id: "test-id",
    client_secret: "test-secret",
    redirect_uri: "http://localhost:6060/signin_redirect",
    popup_redirect_uri: "http://localhost:6060/signin_redirect",
    popup_post_logout_redirect_uri: "http://localhost:6060/signout_redirect",
    post_logout_redirect_uri: "http://localhost:6060/signout_redirect",
    client_authentication: "client_secret_basic",
    scope: "openid profile",
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userManager={userManager} />} />
        <Route
          path="/signin_redirect"
          element={<SigninRedirect userManager={userManager} />}
        />
        <Route
          path="/signout_redirect"
          element={<SignoutRedirect userManager={userManager} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
