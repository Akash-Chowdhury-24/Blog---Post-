import { createSlice, nanoid } from "@reduxjs/toolkit";




const initialState={
  formData : {
    title: "",
    description: "",
  },
  bloglist : [],
  currentEdittedBlogId:null,
};
export const blogSlice=createSlice({
  name:"blog",
  initialState,
  reducers:{

    setFormData:(state,action)=>{
      let cpyFormData={...state.formData};
      cpyFormData={
        ...cpyFormData,
        ...action.payload,
      }
      state.formData=cpyFormData;
    },
    setBlogList:(state,action)=>{
      state.bloglist.push({
        id: nanoid(),
        ...state.formData,
      });

      state.formData={
        title: "",
        description: "",
      }
      localStorage.setItem("bloglist",JSON.stringify(state.bloglist));
    },
    setBlogListOnInitialPageLoad:(state,action)=>{
      // this action is only for the localstorage so we can get the updated list on the page load everytime 
      state.bloglist=action.payload.bloglist || []; 
    },
    deleteBlog:(state,action)=>{

      // way 1
      let cpyBlog = [...state.bloglist];
      cpyBlog=cpyBlog.filter((blog)=>blog.id!==action.payload.currentId);
      state.bloglist=cpyBlog;

      // way 2
      // state.bloglist=state.bloglist.filter((blog)=>blog.id!==action.payload.currentId);

      // way 3
      // const index = state.bloglist.findIndex((blog)=>blog.id == action.payload.currentId)
      // if(index) state.bloglist.slice(index,1);

      localStorage.setItem("bloglist",JSON.stringify(cpyBlog));
    },

    setCurrentEdittedBlogId:(state,action)=>{
      state.currentEdittedBlogId=action.payload.currentBlogId;
    },

    editBlog:(state,action)=>{
      let cpyBloglist = state.bloglist;
      const index = cpyBloglist.findIndex(blog => blog.id === state.currentEdittedBlogId)

      if (index !== -1) {
        cpyBloglist[index] = {
          ...cpyBloglist[index], // extra precaution so that we are not removing data which is not updated 
          ...state.formData,
        }
      }
      state.bloglist=cpyBloglist;
      localStorage.setItem("bloglist",JSON.stringify(cpyBloglist));

    }
  },
})
export const {
  setFormData,
  setBlogList,
  setBlogListOnInitialPageLoad,
  deleteBlog,
  setCurrentEdittedBlogId,
  editBlog,
} = blogSlice.actions;
export default blogSlice.reducer;