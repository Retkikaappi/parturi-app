import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFinalOrder } from '../services/dateService';

const Success = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['successfulOrder'],
    queryFn: () => getFinalOrder(id!),
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Could not find order.</div>;
  }
  if (!data) {
    <div>it's never undefined</div>;
  }

  return (
    <div>
      <p>Success!</p>
      <div className='w-1/3 m-auto'>
        <h1>
          Date: {data?.date} - {data?.hour}
        </h1>
        <p>price: {data?.price}</p>
        <p>service: {data?.service.type}</p>
        <p>user: {data?.user.name}</p>
      </div>
    </div>
  );
};

export default Success;
