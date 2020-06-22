<template>
    <section>
        <el-button type="warning" @click="updateRules" style="margin-top: 10px">修改</el-button>
        <el-card shadow="always" style="margin-top: 10px">
            <textarea v-model="rules.data" required lay-verify="required" placeholder="请输入" class="layui-textarea" style="width:1100px;height: 1000px"></textarea>
        </el-card>
    </section>
</template>

<script>
    export default {
        name: "PropertyManagement",
        data(){
            return{
                rules:{
                    data:''
                }
            }
        },
        methods:{
            updateRules(id){
                let updateRules = {
                    data: this.rules.data
                }
                this.$http.patch("http://localhost:3000/propertymanagement",updateRules).then(function () {
                    this.fetchRules();
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                });
            },
            fetchRules() {
                this.$http.get("http://localhost:3000/propertymanagement").then(function (response) {
                    console.log(response);
                    this.rules = response.body;
                })
            },
        },
        created(){
            this.fetchRules();
        }
    }
</script>

<style scoped>

</style>
