import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import { useEffect } from 'react';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  
  useEffect(() => {
    if(window) {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
      <div className="page-wrapper">
        <Header currentUser={currentUser} />
        <div className="container mt-3">
          <Component currentUser={currentUser} {...pageProps} />
        </div>
      </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(
        appContext.ctx,
        client,
        data.currentUser
      );
    }
  
    return {
      pageProps,
      ...data,
    };
};
  
export default AppComponent;
  