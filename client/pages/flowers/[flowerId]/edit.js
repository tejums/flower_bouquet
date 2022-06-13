import Router from "next/router";
import { useState } from "react";
import useRequest from "../../../hooks/use-request";

const FlowerUpdate = ({ flower }) => {
    const [name, setName] = useState(flower?.name);
    const [color, setColor] = useState(flower?.color);
    const [qty, setQty] = useState(flower?.qty);
    const [price, setPrice] = useState(flower?.price);

    console.log('existing flower', flower);
    const { doRequest, errors } = useRequest({
        url: `/api/flowers/${flower.id}`,
        method: 'put',
        body: {
            name, 
            color, 
            qty, 
            price
        },
        onSuccess: (flower) => Router.push('/flowers')
    });
    

    const onSubmit = async(event) => {
        event.preventDefault();
        await doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if(isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div>
            <h1>Update Flower</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        value={name}
                        onChange= {(e) => setName(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Color</label>
                    <input 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Qty</label>
                    <input 
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input 
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"/>
                </div>
                {errors}
                <button className="btn btn-primary">Save</button>
            </form>
        </div>

    );
};

FlowerUpdate.getInitialProps = async(context, client, currentUser) => {
    const  { flowerId } = context.query;
    try {
        const { data } = await client.get(`/api/flowers/${flowerId}`);
        return { flower: data};
    }catch(err) {
        return {flower: null};
    }   
}

export default FlowerUpdate;
