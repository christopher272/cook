// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function Leftovers() {
    const { leftovers, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUpdate = (id, updatedItem) => {
        updateItem(id, updatedItem, 'leftovers');
    };

    const handleDelete = (id) => {
        deleteItem(id, 'leftovers');
    };

    return (
        <div>
            <h2>Leftovers</h2>
            {leftovers.length > 0 ? (
                leftovers.map(item => (
                    <InventoryCard
                        key={item._id}
                        item={item}
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id)}
                    />
                ))
            ) : (
                <p>No leftovers available</p>
            )}
        </div>
    );
}

export default Leftovers;