import { api } from "@utils/utils";
import { LABEL_URL } from "@utils/constant";

const labelFetcher = {
  async create(body) {
    try {
      const response = await api.post(`${LABEL_URL}`, body);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.error(`Label Fetcher Create Error: ${error}`);
    }
  },

  async read() {
    try {
      const response = await api.get(`${LABEL_URL}`);
      return response.json();
    } catch (error) {
      console.error(`Label Fetcher Read Error: ${error}`);
    }
  },

  async update(id, body) {
    return api.put(`${LABEL_URL}/${id}`, body);
  },

  delete(id) {
    return api.delete(`${LABEL_URL}/${id}`);
  },
};

export default labelFetcher;
