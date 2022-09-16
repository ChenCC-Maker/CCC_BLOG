<template>
  <div class="wrap">
    <div class="blogMenu">
        <Menu mode="horizontal" theme="light" active-name="1">
            <Menu-item name="1">
                <router-link to="/blogHome/blogManage">
                  <Icon type="ios-paper"></Icon>
                  Blog管理
                </router-link>
            </Menu-item>
            <Menu-item name="2">
              <router-link to="/blogHome/blogMarkdown">
                 <Icon type="ios-people"></Icon>
                  Markdown编辑器
              </router-link>
            </Menu-item>
            <Menu-item name="3">
              <router-link to="/blogHome/vueeasytable">
                 <Icon type="ios-people"></Icon>
                  VueEasyTable
              </router-link>
            </Menu-item>
        </Menu>
    </div>
    <div class="blogMain">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlogHome',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style scoped>
  
</style>
