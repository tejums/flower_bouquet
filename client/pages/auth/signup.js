import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            name,
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async(event) =>{
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="col-4">

                <div className="mb-3">
                    <label>Name</label>
                    <input value={name} 
                        onChange={e => setName(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="mb-3">
                    <label>Email Address</label>
                    <input value={email} 
                        onChange={e => setEmail(e.target.value)}
                        className="form-control"/>
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" className="form-control"/>
                </div>
                {errors}
                <div className="mb-3">
                    <button className="btn btn-primary">Sign Up</button>
                </div>

            </div>
        </form>
    );
};