import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, setBlogListOnInitialPageLoad, setCurrentEdittedBlogId, setFormData } from "../store/slice/blogslice";
import { useEffect } from "react";
function BlogList() {
  const {bloglist} = useSelector(state=>state);
  const dispatch = useDispatch();

  //so that we get the updated bloglist to be displayed on page load therfore we need to store the bloglist in the slice thats why we did this 
  useEffect(()=>{
    dispatch(setBlogListOnInitialPageLoad({
      bloglist: JSON.parse(localStorage.getItem("bloglist")) || [],
    }))
  },[])
 
  function handleDeleteBlog(currentBlogId){
    dispatch(deleteBlog({
      currentId: currentBlogId,
    }))
  }

  function handleEditBlog(currentBlog){
    dispatch(setCurrentEdittedBlogId({
      currentBlogId: currentBlog.id,
    }))
    dispatch(setFormData({
      title: currentBlog.title,
      description: currentBlog.description,
    }))
  }
  console.log(bloglist);
  return (
    <div>
      {
        bloglist?.length > 0?
        bloglist.map((blog)=>(
          <div key={blog.id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: "10px 0",
            boxSizing: "border-box", 
          }}
            >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{blog?.title}</h3>
              <p style={{
                margin: 0,
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              >
                {blog?.description}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <button onClick={()=>handleEditBlog(blog)}>Edit</button>
              <button onClick={()=>handleDeleteBlog(blog.id)}>Delete</button> 
              {/* here if u do like onClick={()=>handleDeleteBlog(blog.id)} then it will cause error since react first render the components then i looks into the modification or updatations so we cannot pass like this. react will read it updation while rendring which is a issue. so we should always pass a reference like we did here so that react understands that this function is to be called after rendering.
              difference btw onClick={abc} and onclick={abc(a)} is that in the first case since there is no argument we have to directly pass it since it will be automatically be taken as an reeference to that function but in the second case this will not happen so we need to do it like i did here.  */}
            </div>
          </div>
        ))
        : <h1>No Blogs. plzz enter one</h1> 
      }
    </div>
  );
}

export default BlogList;