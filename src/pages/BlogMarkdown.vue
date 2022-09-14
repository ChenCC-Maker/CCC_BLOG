<template>
<div class="wrap">
    <div class="markdownHeader">
        <h2 class="markdownTitle">new BlogList()</h2>
        <Button type="success" class="uploadButton" @click="visiable = true">上传markdown文档</Button>
        <Button type="warning" class="uploadButton" :style="{marginRight:'10px'}" @click="markdownValue = ''">清空markdown文档</Button>
    </div>
    <div class="markdownContent" >
        <mavon-editor v-model="markdownValue" class="markdown"></mavon-editor>
    </div>
    <Modal
        class="modal"
        v-model="visiable"
        title="填写Blog基本信息"
        @on-ok="ok"
        @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <Form-item label="博客名称:">
                    <Input v-model="formItem.blogListName" placeholder="请输入"></Input>
                </Form-item>
                 <Form-item label="博客作者:">
                    <Input v-model="formItem.blogListAuthor" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="博客类型:">
                    <Select v-model="formItem.blogListType" placeholder="请选择">
                      <Option v-for="item in blogType" :value="item.BLOG_TYPE_ID" :key="item.BLOG_TYPE_ID">{{item.BLOG_TYPE_NAME}}</Option>
                    </Select>
                </Form-item>
                <Form-item label="上传日期:">
                     <Input v-model="formItem.blogListDate" placeholder="请输入"></Input>
                </Form-item>
            </Form>
    </Modal>
</div>
  
</template>
<script>
import Vue from "vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {getBlogAllType,insertOneBlog} from '../api/blog'
Vue.component("mavon-editor", mavonEditor);

export default {
  name: 'BlogMarkdown',
  data () {
    return {
        markdownValue:'',
        visiable:false,
        formItem:{
            blogListName:'',
            blogListAuthor:'',
            blogListType:'',
            blogListDate:'',
        },
        blogType:[]
    }
  },
  methods: {
    getBlogType(){
        getBlogAllType().then(res => {
            this.blogType = res.data.data
        })
    },
    ok(){
        const blogContent = {markdownValue:this.markdownValue}
        insertOneBlog(this.formItem,blogContent).then( () => {
            this.$Message.success("添加博客成功");
            setTimeout(()=>{
                this.$router.push('/blogHome/blogManage')
            },1000)
        })
    },
    cancel(){
        this.formItem.blogListId = ''
        this.formItem.blogListName = ''
        this.formItem.blogListAuthor = ''
        this.formItem.blogListType = ''
        this.formItem.blogListDate = ''
    }
  },
  created () {
  },
  mounted () {
    this.getBlogType()
  },
}
</script>
<style  scoped>
    .markdownHeader{
        height:40px;
        width:100%;
    }
    .markdownTitle{
        color:#5976ba; 
        font-size: 27px;
        background-color: #dfd7c2;
        width:200px;
        border-radius: 15px;
        margin-top: 10px;
        margin-left: 20px;
    }
    .markdownContent{
        position: absolute;
        margin-top: 10px;
        height: 90%;
        width: 100%;
        z-index: -1;
    }
    .markdown{
        width: 100%;
    }
    .uploadButton{
        float: right;
        margin-top:-31px;
    }
    .modal{
        z-index: 2;
    }
    
</style>
