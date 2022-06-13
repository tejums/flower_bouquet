const Role = ({roles}) => {
    const roleList = roles.map(role =>{
        return (
            <tr key={role.id}>
                <td className="text-capitalize">{role.name}</td>
                <td>{role.name}</td>
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
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleList}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Role;