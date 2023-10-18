import { useParams } from "react-router-dom";

const Order = () => {
  const { orderId } = useParams<{ orderId: string }>();
  return <div>Order {orderId}</div>;
};

export default Order;
