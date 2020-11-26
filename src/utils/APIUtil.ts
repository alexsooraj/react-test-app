import axios from "axios";

export class APIUtil {
    static post = async (url: string, data: any) => {
        const result = await axios.post(url, data);
        if (result.data.error !== undefined) {
            throw new Error(result.data.error);
        }
        return result.data;
    }

    static get = async (url: string) => {
        const result = await axios.get(url);
        return result.data;
    }
}