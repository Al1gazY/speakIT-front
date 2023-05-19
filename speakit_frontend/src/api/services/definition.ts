import {api} from '../index'

export default {
    allDefinitions: () => api.get('/definitions'),
    getDefinition: (id: string) => api.get(`/definitons/${id}`),
    
}