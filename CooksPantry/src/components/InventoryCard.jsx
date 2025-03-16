import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/cards.css';

function InventoryCard({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(item);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem({
            ...updatedItem,
            [name]: value,
        });
    };

    const handleSave = () => {
        onUpdate(updatedItem);
        setIsEditing(false);
    };
    const getExpirationClass = () => {
        if (!item.expirationDate) return "";

        const today = new Date();
        const expirationDate = new Date(item.expirationDate);
        const timeDiff = expirationDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) {
            return "expired-expiration"
        } else if (daysLeft < 3) {
            return "danger-expiration";
        } else if (daysLeft <= 7) {
            return "warning-expiration"
        }
        return "";
    };


    return (
        <div className="inventory-card">
            {isEditing ? (
                <>
                    <input className="inventory-input" type="text" name="name" value={updatedItem.name} onChange={handleChange} />
                    {item.amount && (
                        <>
                            <input className="inventory-input" type="number" name="amount" value={updatedItem.amount} onChange={handleChange} />
                            <input className="inventory-input" type="text" name="unit" value={updatedItem.unit} onChange={handleChange} />
                        </>
                    )}
                    {item.category && <input className="inventory-input" type="text" name="category" value={updatedItem.category} onChange={handleChange} />}
                    {item.location && <input className="inventory-input" type="text" name="location" value={updatedItem.location} onChange={handleChange} />}
                    {item.servings && <input className="inventory-input" type="number" name="servings" value={updatedItem.servings} onChange={handleChange} />}
                    {item.purchaseDate && <input className="inventory-input" type="date" name="purchaseDate" value={updatedItem.purchaseDate} onChange={handleChange} />}
                    {item.expirationDate && <input className="inventory-input" type="date" name="expirationDate" value={updatedItem.expirationDate} onChange={handleChange} />}
                    {item.notes && <textarea className="inventory-textarea" name="notes" value={updatedItem.notes} onChange={handleChange} />}

                    <button className="primary-btn" onClick={handleSave}>Save</button>
                    <button className="secondary-btn" onClick={handleEditToggle}>Cancel</button>
                </>
            ) : (
                <>
                    <h3 className="inventory-title">{item.name}</h3>
                    {item.amount && <p className="inventory-info">Amount: {item.amount} {item.unit}</p>}
                    {item.category && <p className="inventory-info">Category: {item.category}</p>}
                    {item.location && <p className="inventory-info">Location: {item.location}</p>}
                    {item.servings && <p className="inventory-info">Servings: {item.servings}</p>}
                    {item.purchaseDate && <p className="inventory-info">Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</p>}
                    {item.expirationDate && <p className={`inventory-expiration ${getExpirationClass()}`}>Expires: {new Date(item.expirationDate).toLocaleDateString()}</p>}
                    {item.notes && <p className="inventory-notes">Notes: {item.notes}</p>}

                    <button className="edit-btn" onClick={handleEditToggle}>Edit</button>
                    <button className="danger-btn" onClick={onDelete}>Delete</button>
                </>
            )}
        </div>
    );
}

InventoryCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        amount: PropTypes.number,
        unit: PropTypes.string,
        category: PropTypes.string,
        location: PropTypes.string,
        servings: PropTypes.number,
        purchaseDate: PropTypes.string,
        expirationDate: PropTypes.string,
        notes: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default InventoryCard;