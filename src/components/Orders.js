import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // przekierowanie niezalogowanego uzytkownika na strone glowna
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Historia zamówień</h2>
      {user?.orders?.length > 0 ? (
        user.orders.map((order, index) => {
          // GRUPOWANIE KSIĄŻEK W ZAMÓWIENIU
          const groupedItems = order.items.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.id === item.id);
            if (existingItem) {
              existingItem.quantity += item.quantity || 1;
            } else {
              acc.push({ ...item, quantity: item.quantity || 1 });
            }
            return acc;
          }, []);

          return (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Zamówienie z {new Date(order.date).toLocaleString()}</h5>
                <ul>
                  {groupedItems.map((item, i) => (
                    <li key={i}>
                      {item.title} - {item.price} zł (Ilość: {item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-muted">Brak zamówień.</p>
      )}
    </div>
  );
};

export default Orders;
