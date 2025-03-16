/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Create the Kitchen Inventory Context
export const KitchenInventoryContext = React.createContext();

const userAxios = axios.create();

// Include the interceptor exactly as you specified
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// KitchenInventoryProvider component
export default function KitchenInventoryProvider(props) {
    // State for managing ingredients, dishes, and user authentication
    const [ingredients, setIngredients] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize user state from localStorage if available
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        dishes: [],
        ingredients: [],
        errMsg: ""
    };

    const [userState, setUserState] = useState(initState);

    // Signup function
    async function Signup(creds) {
        try {
            const res = await axios.post('/api/auth/signup', creds); // POST to the signup route
            const { user, token } = res.data; // Destructure response
            localStorage.setItem("token", token); // Store token
            localStorage.setItem("user", JSON.stringify(user)); // Store user info
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }));
            window.location.href = "/inventory";
        } catch (error) {
            handleAuthErr(error.response?.data?.errMsg || "Signup failed");
        }
    }

    // Login function
    async function Login(creds) {
        try {
            const res = await axios.post('/api/auth/login', creds); // POST to the login route
            const { user, token } = res.data; // Destructure response
            localStorage.setItem("token", token); // Store token
            localStorage.setItem("user", JSON.stringify(user)); // Store user info
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }));
            window.location.href = "/inventory";
        } catch (error) {
            handleAuthErr(error.response?.data?.errMsg || "Login failed");
        }
    }

    // Logout function
    async function logout() {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUserState({
                user: {},
                token: "",
                errMsg: ""
            });
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out", error);
        }
    }

    // Handle authentication errors
    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }));
    }

    // Reset authentication error messages
    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ""
        }));
    }

    // Fetch ingredients and dishes (only if token is present)
    async function fetchData() {
        try {
            const ingredientsResponse = await userAxios.get('/api/main/ingredients');
            const dishesResponse = await userAxios.get('/api/main/dishes');
            setIngredients(ingredientsResponse.data);
            setDishes(dishesResponse.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }
    // Update an item (either ingredient or dish)
    const updateItem = async (id, updatedItem, category) => {
        try {
            const response = await userAxios.put(`/api/main/${category}/${id}`, updatedItem);
            const updatedData = response.data;

            if (category === 'ingredients') {
                setIngredients(prevIngredients =>
                    prevIngredients.map(item => (item._id === id ? updatedData : item))
                );
            } else if (category === 'dishes') {
                setDishes(prevDishes =>
                    prevDishes.map(item => (item._id === id ? updatedData : item))
                );
            }
        } catch (err) {
            setError('Failed to update item. Please try again later.');
            console.error('Failed to update item:', err);
        }
    };

    // Delete an item (either ingredient or dish)
    const deleteItem = async (id, category) => {
        try {
            await userAxios.delete(`/api/main/${category}/${id}`);
            if (category === 'ingredients') {
                setIngredients(prevIngredients => prevIngredients.filter(item => item._id !== id));
            } else if (category === 'dishes') {
                setDishes(prevDishes => prevDishes.filter(item => item._id !== id));
            }
        } catch (err) {
            setError('Failed to delete item. Please try again later.');
            console.error('Failed to delete item:', err);
        }
    };

    // Provide all the states and functions to the context
    return (
        <KitchenInventoryContext.Provider value={{
            ...userState,
            userAxios,
            errMsg: userState.errMsg,
            token: userState.token,
            ingredients,
            dishes,
            loading,
            error,
            fetchData,
            Signup,
            Login,
            logout,
            updateItem,
            deleteItem,
            resetAuthErr
        }}>
            {props.children}
        </KitchenInventoryContext.Provider>
    );
}

KitchenInventoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
