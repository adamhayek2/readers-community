import axios from 'axios';

const apiUrl = 'http://localhost:8000/posts/';

const CreatePost = async (book_name, author,decodedimage, review) => {
    try {
        const response = await axios.post(apiUrl, {
            book_name: book_name,
            author: author,
            picture: decodedimage,
            review: review
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching posts', error);
    }
};

export default CreatePost;
