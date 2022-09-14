import axios from "axios";
import config from '../config/config.js'

//分别暴露blog相关接口

//获取全部博客类型 接口
export const getBlogAllType = () => {
    return axios({
        method:'get',
        url:config.blogServerContext+'getblogtype'
    })
}

//新增博客类型 接口
export const insertBlogType = ({blogTypeId,blogTypeName}) => {
    return axios({
        method:'post',
        params:{
            blogTypeId,
            blogTypeName
        },
        url:config.blogServerContext+'insertblogtype'
    })
}

//获取所有类型下的博客 接口
export const getBlogList = () => {
    return axios({
        method:'get',
        url:config.blogServerContext+'getbloglist'
    })
}

//添加一条具体的博客 接口
export const insertOneBlog = (blogList,blogContnt) => {
    return axios({
        method:'post',
        params:blogList,
        data:blogContnt,
        url:config.blogServerContext+'insertOneBlog'
    })
}

//根据博客名删除对应博客 接口
export const deleteOneBlog = (blogName) => {
    return axios({
        method:'get',
        params:{blogListName:blogName},
        url:config.blogServerContext+'deleteBlogById'
    })
}


