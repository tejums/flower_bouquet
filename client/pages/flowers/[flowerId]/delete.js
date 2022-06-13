import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import useRequest from '../../../hooks/use-request';


const FlowerDelete = () => {
    const flowerId = useRouter().query.flowerId;
    const { doRequest, errors } = useRequest({
        url: `/api/flowers/${flowerId}`,
        method: 'delete',
        body: {},
        onSuccess: () => Router.push('/flowers')
    });

    useEffect(() => {
        doRequest();
    }, []);

    return (
        <div>
            Deleting the Flower.....
        </div>
    );    
};

export default FlowerDelete;


