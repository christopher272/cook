/* eslint-disable no-prototype-builtins */
import { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function Cupboard() {
    const { ingredients, dishes, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Combine ingredients and dishes, and filter for items located in the cupboard
    const cupboardItems = [
        ...ingredients.filter(item => item.location === 'cupboard'),
        ...dishes.filter(item => item.location === 'cupboard')
    ];

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
            <h2>Cupboard Items</h2>
            {cupboardItems.length > 0 ? (
                cupboardItems.map(item => (
                    <InventoryCard
                        key={item._id}
                        item={item}
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id, item)}
                    />
                ))
            ) : (
                <p>No cupboard items available</p>
            )}
        </div>
    );
}

export default Cupboard;
