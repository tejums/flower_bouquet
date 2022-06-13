import Link from "next/link";
import ACWrapper from "../../components/ACWrapper";

const FlowerIndex = (props) => {
    const {flowers, currentUser} = props
    const flowerList = flowers.map(flower =>{
        return (
            <tr key={flower.id}>
                <td>{flower.name}</td>
                <td>{flower.color}</td>
                <td>{flower.qty}</td>
                <td>{flower.price}</td>
                <td>
                <ul className="nav d-flex align-items-center">
                    <li key="view" className="nav-item">
                        <Link href="/flowers/[flowerId]/view" as={`/flowers/${flower.id}/view`}>
                            <a className="nav-link">View</a>
                        </Link>
                    </li>
                    <li key="edit" className="nav-item">
                        <Link href="/flowers/[flowerId]/edit" as={`/flowers/${flower.id}/edit`}>
                            <a className="nav-link">Edit</a>
                        </Link>
                    </li>
                    <li key="delete" className="nav-item">
                        <Link href="/flowers/[flowerId]/delete" as={`/flowers/${flower.id}/delete`}>
                            <a className="nav-link">Delete</a>
                        </Link>
                    </li>
                </ul>
                
                </td>
            </tr>
        );
    });

    return (
        <div >
            <h1>Flowers</h1>

        <ACWrapper withRoles= {["flower manager"]} withPermissions= {["create flower"]} {...props}>
            <ul className="nav d-flex align-items-center mb-2">
                    <li key="view" className="nav-item">
                        <Link href="/flowers/new">
                            <a className="nav-link">Create Flower</a>
                        </Link>
                    </li>
            </ul>
        </ACWrapper>

            <div className="table-responsive">
            <table className="table table-info table-striped table-hover table-bordered">
                <thead className="table-light">
                    <tr className="table-active">
                        <th>Name</th>
                        <th>Color</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {flowerList}
                </tbody>
            </table>
            </div>
        </div>
    );
};

FlowerIndex.getInitialProps = async(context, client, currentUser) => {
    const {data} = await client.get('/api/flowers');
    return {flowers: data, currentUser};
};

export default FlowerIndex;