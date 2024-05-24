import axios from "axios";

const authHeader = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user && user.token ? { Authorization: 'Bearer ' + user.token } : null;
};

// Utility function to handle errors
const handleError = (error) => {
    if (error.response && error.response.data && error.response.data.error) {
        return { success: false, data: error.response.data.error };
    }
    return { success: false, data: error.message };
};

const checkAuthHeader = () => {
    const headers = authHeader();
    if (!headers) {
        throw new Error("Authorization token is missing. Please log in.");
    }
    return headers;
};

export const registerjs = async (userName, email, password) => {
    try {
        const response = await axios.post(`http://localhost:8082/auth/register`, {
            userName: userName,
            userEmail: email,
            password: password
        });
        return { success: true, data: "User successfully registered!!!" };
    } catch (error) {
        return handleError(error);
    }
};

export const loginjs = async (userName, password) => {
    try {
        const response = await axios.post(`http://localhost:8082/auth/login`, {
            userName: userName,
            password: password
        });
        sessionStorage.setItem("user", JSON.stringify(response.data));
        return { success: true, data: "Successfully logged in car shop" };
    } catch (error) {
        return handleError(error);
    }
};




export const getProduct = async () => {
    try {
        const response = await axios.get(`http://localhost:8082/shop/product`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getCategory = async () => {
    try {
        const response = await axios.get(`http://localhost:8091/shop/category`, { headers: checkAuthHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

    export const getOneProd = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8082/shop/product/${id}`, { headers: checkAuthHeader() });
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    };



export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`http://localhost:8082/shop/product/update/${id}`, product, { headers: checkAuthHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const saveProduct = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:8091/shop/addproduct`, formData, {
            headers: {
                ...checkAuthHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8091/shop/product/${id}`, { headers: checkAuthHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
export const saveCategory = async(category)=>{
    try{
     const response = await axios.post("http://localhost:8082/shop/addcategory",category,{
        headers: authHeader()
           }
     );
     return response.data;
    }
    catch(e){
         console.log(e);
    }
 }

 export const addCategory = async (category) => {
    try {
        const response = await axios.post(`http://localhost:8091/shop/addcategory`, category, { headers: checkAuthHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`http://localhost:8091/shop/category/update/${id}`, category, { headers: checkAuthHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8091/shop/category/${id}`, { headers: checkAuthHeader() });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

