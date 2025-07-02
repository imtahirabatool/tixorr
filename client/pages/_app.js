import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  let currentUser = null;

  try {
    const { data } = await client.get("/api/users/currentuser");
    currentUser = data.currentUser;
  } catch (err) {
    if (err.response?.status === 401) {
      console.log("Not signed in.");
    } else {
      console.error("Error fetching currentUser:", err.message);
    }
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      currentUser
    );
  }

  return { pageProps, currentUser };
};

export default AppComponent;
