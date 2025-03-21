/* eslint-disable no-prototype-builtins */
import { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function Fridge() {
    const { ingredients, leftovers, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Combine ingredients and leftovers, and filter for items located in the refrigerator
    const fridgeItems = [
        ...ingredients.filter(item => item.location === 'refrigerator'),
        ...leftovers.filter(item => item.location === 'refrigerator')
    ];

    const handleUpdate = (id, updatedItem) => {
        const isLeftovers = updatedItem.hasOwnProperty('servings');
        updateItem(id, updatedItem, isLeftovers ? 'leftovers' : 'ingredients');  // Use correct category
    };

    const handleDelete = (id, item) => {
        const isLeftovers = item.hasOwnProperty('servings');
        deleteItem(id, isLeftovers ? 'leftovers' : 'ingredients');  // Use correct category
    };

    return (
        <div>
            <h2>Fridge Items</h2>
            {fridgeItems.length > 0 ? (
                fridgeItems.map(item => (
                    <InventoryCard
                        key={item._id}
                        item={item}
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id, item)}
                    />
                ))
            ) : (
                <p>No fridge items available</p>
            )}
        </div>
    );
}

export default Fridge;
