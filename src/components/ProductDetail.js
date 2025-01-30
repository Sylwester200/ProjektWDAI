import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import booksData from "../books.json";

const ProductDetail = () => {
  const { id } = useParams();
  const book = booksData.find((b) => b.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  if (!book) return <h2 className="text-center mt-4">Nie znaleziono książki</h2>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src={book.image} className="img-fluid rounded" alt={book.title} />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <p className="text-muted">Autor: {book.author}</p>
          <p>{book.description}</p>
          <p className="h4">{book.price} zł</p>
          {user ? (
            <button className="btn btn-success" onClick={() => addToCart(book)}>Dodaj do koszyka</button>
          ) : (
            <p className="text-danger">Musisz się zalogować, aby dodać do koszyka.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
