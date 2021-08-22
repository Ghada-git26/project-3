import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
    if (error.response.data) {
        console.log(error.response && error.response.data);
        throw error;
    }
    throw error;
}

const apiHandler = {
    service,

    signup(userInfo) {
        return service
            .post("/api/auth/signup", userInfo)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    signin(userInfo) {
        return service
            .post("/api/auth/signin", userInfo)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    isLoggedIn() {
        return service
            .get("/api/users/me")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    logout() {
        return service
            .get("/api/auth/logout")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    getRecipes() {
        return service
            .get("/api/recipes")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    getRecipe(id) {
        return service
            .get(`/api/recipes/${id}`)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    setFavRecipe(id) {
        return service
            .get(`/api/recipes/setFavourite/${id}`)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    unsetFavRecipe(id) {
        return service
            .get(`/api/recipes/unsetFavourite/${id}`)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    postRecipe(recipe) {
        return service
            .post("/api/recipes", recipe)
            .then((res) => res.data)
            .catch(errorHandler);
    },


    removeRecipe(id) {
        return service
            .delete(`/api/recipes/${id}`)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    updateRecipe(id, data) {
        return service
            .patch(`/api/recipes/${id}`, data)
            .then((res) => res.data)
            .catch(errorHandler);
    },


    addRecipe(data) {
        return service
            .post("/api/recipes", data)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    buildFormData(formData, data, parentKey) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            formData.append(parentKey, value);
        }
    },

    jsonToFormData(data) {
        const formData = new FormData();

        this.buildFormData(formData, data);

        return formData;
    }
};


export default apiHandler;