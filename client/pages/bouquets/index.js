import Link from "next/link";

const BouquetIndex = () => {
    return (
        <div>
            <ul className="nav d-flex align-items-center">
                    <li key="view" className="nav-item">
                        <Link href="/bouquets/new">
                            <a className="nav-link">Create Bouquet</a>
                        </Link>
                    </li>
            </ul>
            <div className="table-responsive">
            <table className="table table-info table-striped table-hover table-bordered">
                <thead className="table-light">
                    <tr className="table-active">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {flowerList} */}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default BouquetIndex;