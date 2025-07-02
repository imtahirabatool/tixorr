import Link from "next/link";

const OrderIndex = ({ orders }) => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Price</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const statusColor =
              order.status === "complete"
                ? "text-success"
                : order.status === "cancelled"
                ? "text-danger"
                : "text-warning";

            return (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>${order.ticket.price}</td>
                <td className={statusColor} style={{ fontWeight: 600 }}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-outline-primary"
                    href={`/orders/${order.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");
  return { orders: data };
};

export default OrderIndex;
