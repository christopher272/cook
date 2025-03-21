// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { KitchenInventoryContext } from './KitchenInventoryContext';
import '../styles/forms.css';

function InventoryForm() {
    const { userAxios, fetchData } = useContext(KitchenInventoryContext);
    const [formType, setFormType] = useState('ingredient'); // Default form type
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        unit: 'cup', // Default value
        location: 'refrigerator', // Default value
        category: 'spices', // Default value for ingredients
        purchaseDate: '',
        expiration: true,
        expirationDate: '',
        servings: '',
        notes: '',
    });

    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
        setFormData({
            ...formData,
            amount: '',
            unit: 'cup',
            category: 'spices',
            purchaseDate: '',
            expiration: true,
            expirationDate: '',
            servings: '',
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = formType === 'ingredient' ? 'ingredients' : 'leftovers';

        const filteredData = formType === 'ingredient'
            ? {
                name: formData.name,
                amount: formData.amount,
                unit: formData.unit,
                location: formData.location,
                category: formData.category,
                purchaseDate: formData.purchaseDate,
                expiration: formData.expiration,
                expirationDate: formData.expirationDate,
                notes: formData.notes,
                userId: localStorage.getItem('user_id'),
            }
            : {
                name: formData.name,
                servings: formData.servings,
                location: formData.location,
                expirationDate: formData.expirationDate,
                notes: formData.notes,
                userId: localStorage.getItem('user_id'),
            };

        try {
            await userAxios.post(`/api/main/${endpoint}`, filteredData);
            alert(`${formType === 'ingredient' ? 'Ingredient' : 'Leftover'} added successfully!`);
            setFormData({
                name: '',
                amount: '',
                unit: 'cup',
                location: 'refrigerator',
                category: 'spices',
                purchaseDate: '',
                expiration: true,
                expirationDate: '',
                servings: '',
                notes: '',
            });
            fetchData();
        } catch (err) {
            console.error(`Error adding ${formType}:`, err);
            alert(`Failed to add ${formType}`);
        }
    };

    return (
        <div className='inventory-container'>
            <h1 className='inventory-title'>Inventory Management</h1>
            <div className='form-switch'>
                <label>
                    <input
                        type="radio"
                        value="ingredient"
                        checked={formType === 'ingredient'}
                        onChange={handleFormTypeChange}
                    />
                    Add Ingredient
                </label>
                <label>
                    <input
                        type="radio"
                        value="leftover"
                        checked={formType === 'leftover'}
                        onChange={handleFormTypeChange}
                    />
                    Add Leftover
                </label>
            </div>
            <form className="inventory-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                {formType === 'ingredient' && (
                    <>
                        <div className="form-group">
                            <label>Amount: </label>
                            <input className="form-input" type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Unit: </label>
                            <select className="form-select" name="unit" value={formData.unit} onChange={handleChange} required>
                                <option value="cup">Cup</option>
                                <option value="gallon">Gallon</option>
                                <option value="pound">Pound</option>
                                <option value="kg">Kg</option>
                                <option value="oz">Oz</option>
                                <option value="floz">Fluid Oz</option>
                                <option value="jar">Jar</option>
                                <option value="dozen">Dozen</option>
                                <option value="each">Each</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category: </label>
                            <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                                <option value="spices">Spices</option>
                                <option value="grains">Grains</option>
                                <option value="dairy">Dairy</option>
                                <option value="veggies">Veggies</option>
                                <option value="fruits">Fruits</option>
                                <option value="protein">Protein</option>
                                <option value="condiments">Condiments</option>
                                <option value="other">Other</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Location: </label>
                            <select className="form-select" name="location" value={formData.location} onChange={handleChange} required>
                                <option value="refrigerator">Refrigerator</option>
                                <option value="freezer">Freezer</option>
                                <option value="pantry">Pantry</option>
                                <option value="cupboard">Cupboard</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Purchase Date: </label>
                            <input className="form-input" type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required />
                        </div>
                    </>
                )}

                {formType === 'ingredient' && (
                    <div className="form-group">
                        <label>Expiration: </label>
                        <input className="form-checkbox" type="checkbox" name="expiration" checked={formData.expiration} onChange={handleChange} />
                    </div>
                )}

                {(formData.expiration || formType === 'leftover') && (
                    <div className="form-group">
                        <label>Expiration Date: </label>
                        <input className="form-input" type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
                    </div>
                )}

                {formType === 'leftover' && (
                    <>
                        <div className="form-group">
                            <label>Servings: </label>
                            <input className="form-input" type="number" name="servings" value={formData.servings} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Location: </label>
                            <select className="form-select" name="location" value={formData.location} onChange={handleChange} required>
                                <option value="refrigerator">Refrigerator</option>
                                <option value="freezer">Freezer</option>
                                <option value="pantry">Pantry</option>
                                <option value="cupboard">Cupboard</option>
                            </select>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Notes: </label>
                    <textarea className='form-textarea' name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>

                <button className="primary-btn" type="submit">Add {formType === 'ingredient' ? 'Ingredient' : 'leftover'}</button>
            </form>
        </div>
    );
}

export default InventoryForm;