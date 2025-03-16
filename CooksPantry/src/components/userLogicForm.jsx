import { useState, useContext } from "react";
import { KitchenInventoryContext } from "./KitchenInventoryContext";
import '../styles/login.css';
import '../styles/forms.css';



export default function AuthForm() {
    const { Signup, Login, errMsg } = useContext(KitchenInventoryContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [isLogin, setIsLogin] = useState(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const toggleMode = () => {
        setIsLogin(!isLogin);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            Login(formData);
        } else {
            Signup(formData);
        }
    }

    return (
        <div className="auth-page"> {/* Ensures centering */}
            <div className="auth-container">
                <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
    
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label> Username:</label>
                        <input className="form-input" type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
    
                    <div className="form-group">
                        <label> Password:</label>
                        <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
    
                    <button className="primary-btn" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
    
                    {errMsg && <p className="error-message">{errMsg}</p>}
                </form>
    
                <p className="auth-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button className="auth-toggle-btn" onClick={toggleMode}>{isLogin ? "Sign Up" : "Login"}</button>
                </p>
            </div>
        </div>
    );
}