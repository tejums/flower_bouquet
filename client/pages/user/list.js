import { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';

const List = ({users}) => {
    const userList = users.map(user =>{
        return (
            <tr key={user.id}>
                <td className="text-capitalize">{user.name}</td>
                <td>{user.email}</td>
            </tr>
        );
    })

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-info table-striped table-hover table-bordered">
                    <thead className="table-light">
                        <tr className="table-active">
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;