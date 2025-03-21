/* eslint-disable no-prototype-builtins */
import { useContext } from 'react';
import { KitchenInventoryContext } from '../components/KitchenInventoryContext';
import InventoryCard from '../components/InventoryCard';

function Pantry() {
    const { ingredients, leftovers, loading, error, updateItem, deleteItem } = useContext(KitchenInventoryContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Combine ingredients and leftovers, and filter for items located in the pantry
    const pantryItems = [
        ...ingredients.filter(item => item.location === 'pantry'),
        ...leftovers.filter(item => item.location === 'pantry')
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
            <h2>Pantry Items</h2>
            {pantryItems.length > 0 ? (
                pantryItems.map(item => (
                    <InventoryCard 
                        key={item._id} 
                        item={item} 
                        onUpdate={(updatedItem) => handleUpdate(item._id, updatedItem)}
                        onDelete={() => handleDelete(item._id, item)} 
                    />
                ))
            ) : (
                <p>No pantry items available</p>
            )}
        </div>
    );
}

export default Pantry;
