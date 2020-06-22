<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入租客姓名查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
<!--                    当前欠款租户数量为:{{leaserNum}}-->
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(leasers,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="姓名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="fee" label="租金" width="180" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" min-width="130" sortable>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                leaserNum:'',
                filterInput:"",
                //编辑界面数据
                leasers:[],
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(leasers,value){
                return leasers.filter(function (leaser) {
                    return leaser.name.match(value);
                })
            },
            fetchLeasers() {
                this.$http.get("http://localhost:3000/leasers?fee_lte=0").then(function (response) {
                    console.log(response);
                    this.leasers = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/leasers/"+id).then(function (response) {
                    this.leaser = response.body;
                });
            },
            updateLeaser(id){
                if(!this.leaser.yjfee ||!this.leaser.feedate){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateLeaser = {
                        yjfee: this.leaser.yjfee,
                        feedate: this.leaser.feedate
                    }
                    this.$http.patch("http://localhost:3000/leasers/"+this.id,updateLeaser).then(function () {
                        this.fetchLeasers();
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                }
            },
            //删除操作函数
            deleteLeaser(id){
                this.$http.delete("http://localhost:3000/leasers/"+id).then(function () {
                    this.fetchLeasers();
                    this.getLeaserNum();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            },
            getLeaserNum(){
                this.$http.get("http://localhost:3000/leasers").then(function (response) {
                    this.leaserNum = response.body.length;
                })
            }
        },
        created(){
            this.fetchLeasers();
            this.getLeaserNum();
        }
    }
</script>
