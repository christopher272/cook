// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function Dishes() {
    const { dishes, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUpdate = (id, updatedItem) => {
        updateItem(id, updatedItem, 'dishes');
    };

    const handleDelete = (id) => {
        deleteItem(id, 'dishes');
    };

    return (
        <div>
            <h2>Dishes</h2>
            {dishes.length > 0 ? (
                dishes.map(item => (
                    <InventoryCard
                        key={item._id}
                        item={item}
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id)}
                    />
                ))
            ) : (
                <p>No dishes available</p>
            )}
        </div>
    );
}

export default Dishes;