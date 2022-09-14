<template>
  <div class="wrap">
    <div class="manageLeft" >
        <row>
            <Col span="12">
                <Card>
                    <p slot="title">Blog Type</p>
                    <Table stripe :columns="typeColumn" :data="typeData"></Table>
                </Card>
            </col>
            <Col span="8" >
                <Card class="blogTypeRight">
                    <p slot="title">new BlogType()</p>
                        <Form ref="formInline" :model="blogTypeForm" :rules="ruleBlogType" inline>
                            <Form-item prop="blogTypeId">
                                <Input type="text" v-model="blogTypeForm.blogTypeId" placeholder="博客ID">
                                </Input>
                            </Form-item>
                            <Form-item prop="blogTypeName">
                                <Input  v-model="blogTypeForm.blogTypeName" placeholder="博客类型" @keydown.enter.native="handleSubmit">
                                </Input>
                            </Form-item>
                            <Form-item>
                                <Button class='newBlogTypeButton' type="primary" @click="handleSubmit">新增</Button>
                            </Form-item>
                        </Form>
                </Card>
            </Col>
        </row>
    </div>
    <div class="partingLine"></div>
    <div class="manageRight">
            <Row>
                <Col span="12">
                   <Card class="blogRightCard">
                     <p slot="title">BlogTree</p>
                     <Tree :data="baseData" @on-select-change="handleSelectTree"  show-checkbox></Tree>
                      <Poptip trigger="hover" :content="blogName">
                         <Button type="error" v-if="visibleDelete" @click="handleDelete" :style="{marginLeft:'80px'}">删除Blog</Button>
                     </Poptip>
                   </Card>
                </Col>
            </Row>
    </div>
    
    
  </div>
</template>
<script>
import {getBlogAllType,insertBlogType,getBlogList,deleteOneBlog} from '../api/blog.js'
export default {
  name: 'BlogManage',
  data () {
    return {
        typeColumn:[
            {
                title:'类型ID',
                key:'BLOG_TYPE_ID'
            },
             {
                title:'博客类型',
                key:'BLOG_TYPE_NAME'
            }
        ],
        typeData:[],
        blogTypeForm:{
            blogTypeId:'',
            blogTypeName:''
        },
        ruleBlogType:{
            blogTypeId:[
                {required:true,message:'请输入博客类型ID',trigger:'blur'}
            ],
            blogTypeName:[
                {required:true,message:'请输入博客类型名',trigger:'blur'}
            ]
        },
        baseData: [],
        visibleDelete:false,
        blogName:''
    }
  },
  methods: {
    getAllBlogType(){
        getBlogAllType().then(res =>{
            this.typeData = res.data.data
        })
    },
    getBlogList(){
        getBlogList().then(res => {
          this.baseData = res.data.data.map(item => {
                return {
                    title:item.blog_TYPE_NAME,
                    expand: true,
                    children:item.blog_TYPE_LIST.map(item => {
                        return {
                            title:item.blog_LIST_NAME,
                            expand: true,
                        }
                    })
                }
            })
        })
    },
    handleSubmit(){
        if(this.blogTypeForm.blogTypeId!='' && this.blogTypeForm.blogTypeName!=''){
            insertBlogType(this.blogTypeForm).then(res => {
                if(res.data.code === 200){
                    this.$Message.success("成功新增一个博客类型")
                    this.getAllBlogType()
                }else if(res.data.code === 500){
                    this.$Message.warning("该博客类型已存在")
                }else{
                    this.$Message.error("服务器出错，请联系系统管理员")
                }
            })
        }
    },
    handleSelectTree(data){
        this.visibleDelete = true
        this.blogName = data[0].title
        console.log(data[0]);
    },
    handleDelete(){
        deleteOneBlog(this.blogName).then((res)=>{
            console.log(res);
            if(res.data.code === 200){
                this.$Message.success("删除"+this.blogName+"成功")
                this.blogName = ''
                this.getBlogList()
            }else{
                this.$Message.error("删除"+this.blogName+"失败,服务器出错,请联系管理员")
            }
        }).catch(() => {
            this.$Message.error("删除"+this.blogName+"失败,服务器出错,请联系管理员")
        })
        this.visibleDelete = false
    }

  },
  created () {
  },
  mounted () {
    this.getAllBlogType()
    this.getBlogList()
  },
}
</script>
<style  scoped>
    .wrap{
        width:100%;
        height:100%;
        display: flex;
    }
    .manageLeft{
        width: 50%;
        height: 100%;
        margin-top: 20px;
    }
    .manageRight{
        width: 50%;
        height: 100%;
        margin-top: 20px;
    }
    .blogTypeRight{
        margin-left: 20px;
    }
    .newBlogTypeButton{
        width: 170px;
    }
    .blogRightCard{
        margin-left: 120px;
    }
    .partingLine{
        border:1px solid #ebeddf ;
        float:left;
        height:500px;
        margin-top: 80px;
    }
    p{
        color:#5976ba;
        font-weight: bolder;
    }
    
    
</style>
