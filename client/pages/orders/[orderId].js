import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timeId);
  }, [order]);

  if (timeLeft < 0)
    return <div className="text-danger fw-semibold">Order Expired</div>;
  if (order.status === "cancelled")
    return (
      <div className="text-warning fw-semibold">
        Order has already been cancelled.
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">
          Time Left to Pay: <span className="text-danger">{timeLeft}s</span>
        </h4>
        <h5>Ticket: {order.ticket.title}</h5>
        <p className="mb-3">
          Price: <strong>${order.ticket.price}</strong>
        </p>

        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51PbrhbRptPWDQ5atJ3IB4G8V44M3wXPP3JwxAB4EiuZ6vfJSmCrGOT6sWTLfOOnVslMeiBJthsgabtJ6btErM9H2002haT3SxS"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />

        <div className="mt-3">{errors}</div>
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
