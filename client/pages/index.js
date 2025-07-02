import Link from "next/link";
import buildClient from "../api/build-client";

const LandingPage = ({ currentUser, tickets }) => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">🎟️ Available Tickets</h2>
      {tickets.length === 0 ? (
        <div className="alert alert-info">
          No tickets available at the moment.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="align-middle">{ticket.title}</td>
                  <td className="align-middle">${ticket.price}</td>
                  <td className="align-middle">
                    <Link
                      href="/tickets/[ticketId]"
                      as={`/tickets/${ticket.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default LandingPage;
