import { Roles } from "@mvsrtickets/common";
import { permissions } from "./constants/permissions";
import { Permission, PermissionDoc } from "./models/permission";
import { Role } from "./models/role";
import { app } from "./app";
// define the default Roles

const createDefaultRoles = async() => {
    const roles = [Role.build({name: Roles.AnonymousUser}),
        Role.build({name: Roles.AuthenticatedUser}), 
        Role.build({name: Roles.Administrator})];

    await Role.insertMany(roles)
    .then(function(docs: any) {
        console.log('Roles created');
    })
    .catch(function(err: any) {
        console.log(err);
        throw new Error("Roles can't be created");
    });   
}

const createUserServicePermissions = async() => {
const permissionDocs: PermissionDoc[] = [];
    permissions.forEach(permission => {
        if(permission.trim().length > 0) {
            permissionDocs.push(Permission.build({name: permission, service: 'user'}));
        }
    });

    if(permissionDocs.length>0) {
        await Permission.insertMany(permissionDocs)
        .then(function(docs: any) {
            console.log('Permissions created');
        })
        .catch(function(err: any) {
            console.log(err);
            throw new Error("User Permissions not created");
        });  
    } 
}

const routes = () => {
    console.log(app._router.stack);
}

export { createDefaultRoles , createUserServicePermissions, routes};