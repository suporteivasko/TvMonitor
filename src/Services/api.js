import axios from '../Plugin/axios';
const Api = {

    login: async(id, hash) => {        
        const response = await axios.post('/login', {id, hash});        
        return response;
    },
    validateToken: async() => {
        const response =  await axios.get('/me');
        return response;
        
    },
    getStores: async() => {
        const response = await axios.get('/stores');
        return response;
    },
    getSectors: async(id) => {
        const response = await axios.get(`/sectors/${id}`);       
        return response;
        
    },
    getProducts: async(company_id, sector_id ) => {
        const data = {
            id_empresa: company_id,
            id_setor: sector_id

        }       
        const dataSting = JSON.stringify(data);
     
        const response = await axios.get(`/stores/products/${dataSting}`);
        return response;
    },
   
    getMidias: async (company_id, sector_id) => {
        const data = {
            id_empresa: company_id,
            id_setor: sector_id
        };
    
        const dataString = JSON.stringify(data);
    
        try {
            const response = await axios.get(`/midias/${dataString}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching media data:', error);
            throw error;
        }
    },
    
    
    

}

export default Api;