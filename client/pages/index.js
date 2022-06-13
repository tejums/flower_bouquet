const LandingPage = ({ currentUser }) => {
    return (
        <div>
            {currentUser? <div className="registered-user">Registered User</div> : <div className="anonymous-user">Anonymous user</div>}
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    return {};
};

export default LandingPage;