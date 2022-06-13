//['view flower', 'create flower', 'view flower any', 'edit flower', 'edit flower any', 'delete flower', 'delete flower any']


//['anonymous user', 'authenticated user', 'administrator', 'consumer', 'general manager', 
//'flower manager', 'flower supervisor', 'bouquet manager']

const userPermissions = ['view flower', 'create flower']

const userRoles = ['authenticated user', 'administrator']

const checkRoles = (userRoles, allowedRoles) => {
    if (allowedRoles.length === 0) {
    return true;
    }

    return userRoles.some(role =>
        allowedRoles.includes(role)
    );
};

const checkPermissions = (userPermissions, allowedPermissions) => {
    if (allowedPermissions.length === 0) {
    return true;
    }

    return userPermissions.some(permission =>
    allowedPermissions.includes(permission)
    );
};


const ACWrapper = (props) => {
    const { children, withRoles, withPermissions, currentUser ,renderNoAccess, objectIds} = props;
    console.log(currentUser);
    let permitted = false;

    if(withRoles.length > 0) {
        //check for the role passed
        permitted = checkRoles(userRoles, withRoles);
    }

    if(withPermissions.length > 0) {
        permitted = checkPermissions(userPermissions, withPermissions);
    }

    if(permitted) {
        return children;
    }

    if(renderNoAccess) {
        return renderNoAccess();
    }
}

ACWrapper.defaultProps = {
    withRoles: [],
    withPermissions: [],
    renderNoAccess: () => null,
    objectIds: []
};

export default ACWrapper