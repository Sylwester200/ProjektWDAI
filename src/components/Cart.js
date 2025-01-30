import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user, placeOrder } = useContext(AuthContext);
  const navigate = useNavigate();

  // przekierowanie niezalogowanego uzytkownika na strone glowna
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Grupowanie książek w koszyku (żeby nie było duplikatów)
  const groupedCart = cart.reduce((acc, book) => {
    const existingBook = acc.find((item) => item.id === book.id);
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      acc.push({ ...book, quantity: 1 });
    }
    return acc;
  }, []);

  const totalPrice = cart.reduce((sum, book) => sum + book.price, 0).toFixed(2);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Koszyk</h2>
      {groupedCart.length === 0 ? (
        <p className="text-center text-muted">Twój koszyk jest pusty.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Książka</th>
                <th>Ilość</th>
                <th>Cena (szt.)</th>
                <th>Łączna cena</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {groupedCart.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.quantity}</td>
                  <td>{book.price.toFixed(2)} zł</td> {/* Cena pojedynczej sztuki */}
                  <td>{(book.price * book.quantity).toFixed(2)} zł</td> {/* Cena łączna */}
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(book.id)}>Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4>Łączna wartość: <span className="fw-bold">{totalPrice} zł</span></h4>
          </div>

          {/* PRZYCISK ZŁÓŻ ZAMÓWIENIE */}
          <div className="text-end mt-3">
            <button
              className="btn btn-success"
              onClick={() => {
                placeOrder(cart);
                clearCart(); // Opróżnienie koszyka po zamówieniu
                navigate("/orders"); // Przekierowanie do historii zamówień
              }}
            >
              🛒 Złóż zamówienie
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
