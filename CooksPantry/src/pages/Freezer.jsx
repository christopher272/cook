/* eslint-disable no-prototype-builtins */
import { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function Freezer() {
    const { ingredients, leftovers, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Combine ingredients and leftovers, and filter for items located in the freezer
    const freezerItems = [
        ...ingredients.filter(item => item.location === 'freezer'),
        ...leftovers.filter(item => item.location === 'freezer')
    ];

    const handleUpdate = (id, updatedItem) => {
        const isLeftovers = updatedItem.hasOwnProperty('servings');
        updateItem(id, updatedItem, isLeftovers ? 'leftovers' : 'ingredients');
    };

    const handleDelete = (id, item) => {
        const isLeftovers = item.hasOwnProperty('servings');
        deleteItem(id, isLeftovers ? 'leftovers' : 'ingredients');
    };

    return (
        <div>
            <h2>Freezer Items</h2>
            {freezerItems.length > 0 ? (
                freezerItems.map(item => (
                    <InventoryCard
                        key={item._id}
                        item={item}
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id, item)}
                    />
                ))
            ) : (
                <p>No freezer items available</p>
            )}
        </div>
    );
}

export default Freezer;
