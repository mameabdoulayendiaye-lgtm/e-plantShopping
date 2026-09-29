import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcule le coût total de tous les articles dans le panier
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)); // Enlève le "$" et convertit en nombre
      total += cost * item.quantity;
    });
    return total.toFixed(2);
  };

  // Calcule le sous-total pour un article (coût × quantité)
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  // Retour à la page de liste des plantes
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // Fonction placeholder pour le checkout
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // Incrémente la quantité d'un article
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Décrémente la quantité ou supprime l'article si la quantité tombe à 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Supprime complètement un article du panier
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
