import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const ReviewItem = ({ product }) => {
  const { id, img, price, name, quantity } = product;
  return (
    <div className="Review_item flex items-center ">
      <img src={img} alt="" />
      <div className="review_details ">
        <p className="product_title">{name}</p>
        <p>
          Price: <span className="orange_text">${price}</span>
        </p>
        <p>
          Order quantity: <span className="orange_text">{quantity}</span>
        </p>
      </div>
      <button className="btn_delete">
        <FontAwesomeIcon className="delete_icon" icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;
