import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const NewFlower = () => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/flowers',
        method: 'post',
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
        <div className="col-4">
            <h1>Create a Flower</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input 
                        value={name}
                        onChange= {(e) => setName(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="mb-3">
                    <label>Color</label>
                    <input 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="mb-3">
                    <label>Qty</label>
                    <input 
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="mb-3">
                    <label>Price</label>
                    <input 
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"/>
                </div>
                {errors}

                <div className="mb-3">
                <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>

    );
};

export default NewFlower;
