/* eslint-disable no-prototype-builtins */
import { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function TotalInventory() {
    const { ingredients, dishes, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Combine ingredients and dishes into one array
    const allItems = [...ingredients, ...dishes];

    const handleUpdate = (id, updatedItem) => {
        const isDish = updatedItem.hasOwnProperty('servings');
        updateItem(id, updatedItem, isDish ? 'dishes' : 'ingredients');
    };

    const handleDelete = (id, item) => {
        const isDish = item.hasOwnProperty('servings');
        deleteItem(id, isDish ? 'dishes' : 'ingredients');
    };

    return (
        <div>
            <h2>Total Inventory</h2>
            {allItems.length > 0 ? (
                allItems.map(item => (
                    <InventoryCard
                        key={item._id}
                        item={item}
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id, item)}
                    />
                ))
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
}

export default TotalInventory;
