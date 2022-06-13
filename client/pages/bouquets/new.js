import Router from "next/router";
import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";

const rows = [];
const htmlRows =[];
const reqRows = [];
let id = 1;
const NewBouquet = ({ flowers }) => {

    const flowerIDMap = []; 
    const options = [];
    id = 1;
    flowers.forEach(flower => {
        options.push({ label : flower.name, id: id })
        flowerIDMap[id++] = flower
    });

    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [qty, setQty] = useState('');
    const [name, setName] = useState('');
    const [tableRows, setTableRows] = useState(htmlRows);

    const { doRequest, errors } = useRequest({
        url: '/api/bouquets',
        method: 'post',
        body: {
            name,
        },
        onSuccess: (flower) => {
            Router.push('/bouquets')
        }
    });

    useEffect(() => {
            // rows = [];
            // htmlRows =[];
            // reqRows = [];
    }, []);

    const buildRow= (rowValue) => {
        return(
            <tr key={rowValue.value.id}>
            <td> {rowValue.value.label}</td>
            <td> {rowValue.qty} </td>
            <td>
            <button id={rowValue.value.id}
                type="button" 
                onClick={deleteFlower}
                className="btn btn-primary"> Remove</button>
            </td>
            </tr>
        );
    }

    const buildRows = () => {
        htmlRows = [];
        htmlRows = rows.map(rowValue =>{
            return buildRow(rowValue);
        })
        setTableRows(htmlRows);
    }

    const addFlower = (event) => {
        event.preventDefault();
        if(inputValue) {
            rows[value.id] = {value, qty};
            buildRows()
            setQty('')
            setValue(options[0])
            setInputValue('')
        }
    }

    const deleteFlower = (event) => {
        delete rows[event.target.id];
        buildRows()
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        reqRows = [];
        rows.forEach(element => {
            reqRows.push({flower: flowerIDMap[element.value.id], qty: element.qty})
        });
        console.log(reqRows);
        await doRequest({flowers: reqRows});
    };


    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="col-4 mb-3">
                    <label>Name</label>
                    <input 
                        value={name}
                        onChange= {(e) => setName(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="add-flower">
                    <div className="mb-3">
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={options}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Flower" />}
                        />
                    </div>
                    <div className="col-4 mb-3">
                        <label>Qty</label>
                        <input 
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="form-control"/>
                    </div>

                    {errors}

                    <button type="button" 
                        onClick={addFlower}
                        className="btn btn-primary">Add Flower</button>
                </div>

                {/* Table below has the flowers added to bouquet */}

                { (rows.length>0 )? (
                            <table className="table table-info table-striped table-hover table-bordered">
                                <thead className="table-light">
                                    <tr className="table-active">
                                        <th>Name</th>
                                        <th>Qty</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows}
                                </tbody>
                            </table>
                ): ""}
                
                { (rows.length>0 )? (
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
                ): ""}
            </form>
        </div>
    );
}

NewBouquet.getInitialProps = async(context, client) => {
    const {data} = await client.get('api/bouquets/flower');
    return {flowers: data};
};

export default NewBouquet;