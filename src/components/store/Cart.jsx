import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const context = useContext(BooksContext);
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);

    const totalCartAmount = context.state.cart
        .reduce((total, book) => total + book.price * book.count, 0)
        .toFixed(2);

    const totalCartCount = context.state.cart.reduce(
        (total, book) => total + book.count,
        0
    );

    const handlePlaceOrder = () => {
        context.placeOrder();
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    return (
        <div className="p-4 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
                <button
                    onClick={handlePlaceOrder}
                    className="text-blue-500 hover:text-blue-700"
                    disabled={context.state.cart.every(item => !item.isSelected)}
                >
                    Place Order
                </button>
                <Link to="/Products" className="text-blue-500 hover:text-blue-700">
                    Books
                </Link>
                <span>My Cart({totalCartCount})</span>
            </h2>

            <h3 className="text-xl font-semibold mb-6">
                Total Cart Amount: &#8378;{totalCartAmount}
            </h3>

            <div className="space-y-4">
                {context.state.cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    context.state.cart.map((book) => (
                       <>
                        
                       
                        <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex space-x-4">

                        <input
                                        type="checkbox"
                                        checked={book.isSelected}
                                        onChange={() => context.toggleSelect(book.id)}
                                        className="mr-2 h-8"
                                    />
                       
                            <img
                                src={book.image}
                                alt={book.name}
                                className="w-40 h-60 object-cover rounded"
                            />
                            
                            <div className="w-48">
                                <h4 className="text-lg font-semibold mb-2">{book.name}</h4>
                                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                                <p className="text-gray-800 font-bold mb-2">Price: &#8378;{book.price}</p>
                                <p className="text-gray-800 mb-2">Total: &#8378;{(book.price * book.count).toFixed(2)}</p>
                                <p className="text-gray-600 mb-4">You have a total of {book.count} in your cart.</p>
                                <div className="flex items-center space-x-2">
                                    
                                    <button
                                        onClick={() => context.decrease(book.id)}
                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => context.removeFromCart(book.id)}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => context.increase(book.id)}
                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                       </>
                    ))
                )}
            </div>
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg">
                        <h3 className="text-lg font-semibold mb-2">{context.state.orderSuccess.message}</h3>
                        <ul className="list-disc pl-5 mb-4">
                            {context.state.orderSuccess.cartDetails.map((item, index) => (
                                <li key={index} className="mb-2 list-none">
                                    <p className="font-semibold">{item.name}</p>
                                    <p>Price: &#8378;{item.price}</p>
                                    <p>Quantity: {item.count}</p>
                                    <p>Total: &#8378;{(item.price * item.count).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleCloseSuccess}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
