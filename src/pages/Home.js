import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import booksData from "../books.json";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const navigate = useNavigate();

  useEffect(() => {
    setBooks(booksData);
  }, []);

  // Pobranie unikalnych kategorii z książek
  const categories = ["Wszystkie", ...new Set(booksData.flatMap((book) => book.category))];

  // Filtrowanie książek po tytule i kategorii
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Wszystkie" || book.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center">Lista książek</h1>

      {/* FILTRY */}
      <div className="row mb-4">
        {/* WYSZUKIWARKA */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Wyszukaj książkę..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FILTROWANIE PO KATEGORII */}
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* LISTA KSIĄŻEK */}
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-4" key={book.id}>
              <div className="card shadow-sm mb-4">
                {/* Kliknięcie w okładkę otworzy stronę książki */}
                <div onClick={() => navigate(`/book/${book.id}`)} style={{ cursor: "pointer" }}>
                  <img src={book.image} className="card-img-top" alt={book.title} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author}</p>
                  <p className="card-text font-weight-bold">{book.price} zł</p>
                  <Link to={`/book/${book.id}`} className="btn btn-primary">Zobacz więcej</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Nie znaleziono książek.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

