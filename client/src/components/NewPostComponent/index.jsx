import React, {useState} from 'react'
import InputField from '../basic/InputFeild.jsx'
import Button from '../basic/Button/index.jsx'
import CreatePost from '../../api/CreatePost/index.jsx'

const NewPost = ({open, onClose}) => {

    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');
    const [image, setImage] = useState('');
    const [decodedimage, setDecodedImage] = useState('');
    const [error, setError] = useState(false); 


    const submitPost = async() => {
      try {
        const token = await CreatePost(bookName, author, decodedimage, review);
        setError(false); 
        onClose();
      } catch (error) {
        console.error('Post creation failed', error);
      }  
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
          convertImageToBase64(selectedImage);
        }
      };
    
      const convertImageToBase64 = (imageFile) => {
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = function () {
            console.log(reader.result);
            setDecodedImage(reader.result);
            console.log(decodedimage)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
      };

    


    if(!open) return null
  return (
    <div onClick={onClose} className='fixed w-screen h-screen bg-black/[.6]'>
        <div onClick={(e) => {
            e.stopPropagation()
        }}
        className='flex flex-col centering bg-white w-1/3 p-10'>
            <div on onClick={onClose} className='float-right'>X</div>
            <InputField
            className="text-xs w-full m-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            type="text"
            placeholder="Book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            />
            <InputField
            className="text-xs w-full m-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            />
            <InputField
            className="text-xs w-full m-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            type="text"
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />
            <InputField
            className="text-xs w-full m-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            type="file"
            placeholder="Image"
            value={image}
            onChange={handleImageChange}
            />
            
            <div className='float-right w-fit left-0 relative' onClick={submitPost}>
                <Button
                    text="Create Post" 
                /> 
            </div>
        </div>
    </div>
  )
}

export default NewPost