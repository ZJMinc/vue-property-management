<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入业主姓名查询" v-model="filterInput"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(users,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="姓名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable>
            </el-table-column>
            <el-table-column prop="address" label="住址" width="180" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="130" sortable>
            </el-table-column>
            <el-table-column prop="date" label="有效期" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">修改有效期</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="修改出入证信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateUser">
                <el-form-item label="有效期" :label-width="formLabelWidth">
                    <el-input v-model="user.date" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                userNum:'',
                filterInput:"",
                //编辑界面数据
                user:{
                    date:"",
                },
                users:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(users,value){
                return users.filter(function (user) {
                    return user.name.match(value);
                })
            },
            fetchUsers() {
                this.$http.get("http://localhost:3000/users").then(function (response) {
                    console.log(response);
                    this.users = response.body;
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
                this.$http.get("http://localhost:3000/users/"+id).then(function (response) {
                    this.user = response.body;
                });
            },
            updateUser(id){
                if(!this.user.date){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateUser = {
                        date: this.user.date,
                    }
                    this.$http.patch("http://localhost:3000/users/"+this.id,updateUser).then(function () {
                        this.fetchUsers();
                        // this.getUserNum();
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                }
            },
        },
        created(){
            this.fetchUsers();
        }
    }
</script>
