import { useDispatch, useSelector } from "react-redux";
import { editBlog, setBlogList, setCurrentEdittedBlogId, setFormData } from "../store/slice/blogslice";

function BlogInput() {

  const {formData,currentEdittedBlogId} = useSelector(state => state);
  const dispatch = useDispatch();

  // console.log(bloglist);
  function handleOnchange(event){
    dispatch(setFormData({
      [event.target.name]: event.target.value,
    }))
  }
  function handleOnSubmit(event){
    event.preventDefault();

    if(currentEdittedBlogId != null){
      dispatch(editBlog());
      dispatch(setCurrentEdittedBlogId({
        currentBlogId:null
      }));
      dispatch(setFormData({
        title: "",
        description: "",
      }));
    }else{
      dispatch(setBlogList({
        title: formData?.title,
        description: formData?.description,
      }))
       // u can definatly reset the input fields like this but try to do this in the slice only it would be better
      // dispatch(setFormData({  
      //   title: "",
      //   description: "",
      // }))
    }
    
  }
  return (
    <form 
      onSubmit={handleOnSubmit}
      style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <input 
        onChange={handleOnchange}
        type="text" 
        placeholder="Title" 
        id="title"
        name="title"
        value={formData?.title}
        style={{
          width: "300px",
          height: "30px",
          borderRadius: "5px",
          border: "1px solid black",
          padding: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          outline: "none",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 10px #ccc",
          },
          "&:focus": {
            boxShadow: "0 0 10px #ccc",
          } 
        }}
      />
      <input 
        onChange={handleOnchange}
        type="text" 
        placeholder="Description" 
        id="description"
        name="description"
        value={formData?.description}
        style={{
          width: "300px",
          height: "30px",
          borderRadius: "5px",
          border: "1px solid black",
          padding: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          outline: "none",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 10px #ccc",
          },
          "&:focus": {
            boxShadow: "0 0 10px #ccc",
          } 
        }}
      />
      <button 
        type="submit"
        style={{
          width: "100px",
          height: "30px",
          borderRadius: "5px",
          border: "1px solid black",
          padding: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          outline: "none",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 10px #ccc",
          },
          "&:focus": {
            boxShadow: "0 0 10px #ccc",
          }
        }}
        >
          {
            currentEdittedBlogId?'Edit Blog' : 'Add Blog'
          }
        </button>
    </form>
  );
}

export default BlogInput;