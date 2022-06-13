import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from './list';
import Permission from './permission';
import Role from './role';


const userIndexPage = ({users, permissions, roles}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setSelectedTab(newValue);
        // router.push(event.target.href)
    };

    return (
        <div>
            <div>
                <Box sx={{ width: '100%' }}>
                <Tabs value={selectedTab} onChange={handleChange} aria-label="nav tabs example">
                    <Tab label="List" />
                    <Tab label="Permission" />
                    <Tab label="Role" />
                </Tabs>
                </Box>
            </div>
            {<div>
                {selectedTab === 0 &&  <List users = {users}/>}
                {selectedTab === 1 &&  <Permission permissions = {permissions}/>}
                {selectedTab === 2 &&  <Role roles = {roles}/>}
            </div> }
        </div>
    );
};

userIndexPage.getInitialProps = async(context, client) => {
    const {data} = await client.get('/api/users/data');
    return {users: data.users, permissions: data.permissions, roles:data.roles };
};

export default userIndexPage;