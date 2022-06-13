const FlowerDetails = ({ flower}) => {
    const detail = flower? (
    <div>
        <h1>Flower Detail</h1>
        <h1>{flower.name}</h1>
        <h4>{flower.color}</h4>
        <h4>{flower.qty}</h4>
        <h4>{flower.price}</h4>
    </div>) : <div>Flower Not Found</div>;

    return (
        <div>
            {detail}
        </div>
    );
};

FlowerDetails.getInitialProps = async (context, client, currentUser) => {
    const  { flowerId } = context.query;
    try {
        const { data } = await client.get(`/api/flowers/${flowerId}`);
        return { flower: data};
    }catch(err) {
        return {flower: null};
    }   
}


export default FlowerDetails;