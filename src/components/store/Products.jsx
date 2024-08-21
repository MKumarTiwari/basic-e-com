import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../../App";

const Products = (props) => {
  const context = useContext(BooksContext);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  console.log(totalCartCount,"totalCartCount")

  return (
    <div className="p-4 min-h-screen">
    <h2 className="text-2xl font-semibold mb-12 flex justify-between items-center">
      <span>Books</span>
      <Link to="/cart" className="text-blue-500 hover:text-blue-700">
        My Cart({totalCartCount})
      </Link>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {context.state.booklist.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={book.image} alt={book.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">{book.name}</h4>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-800 font-bold mb-4">Price: &#8378; {book.price}</p>
            <button
              onClick={() => context.addToCart(book)}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Products;
