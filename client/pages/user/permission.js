const Permission = ({permissions}) => {
    const permList = permissions.map(permission =>{
        return (
            <tr key={permission.id}>
                <td className="text-capitalize">{permission.name}</td>
                <td>{permission.name}</td>
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
                        {permList}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Permission;