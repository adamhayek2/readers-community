import axios from 'axios';

const apiUrl = 'http://localhost:8000/posts/feed';

const Feed = async () => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            });
        return response.data
    } catch (error) {
        console.error('Error fetching posts', error);
    }
};

export default Feed;