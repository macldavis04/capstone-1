import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="page">
      <h1>Whoops, nothing here!</h1>
      <p>That page does not exist.</p>
      <Link to="/">Back to the home page</Link>
    </main>
  );
}

export default NotFoundPage;