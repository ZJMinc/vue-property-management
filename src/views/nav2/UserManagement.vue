<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入业主委员姓名查询" v-model="filterInput"></el-input>
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
            <el-table-column prop="time" label="入住时间" width="120" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="130" sortable>
            </el-table-column>
            <el-table-column prop="idCard" label="身份证号" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="props">
                    <el-button type="danger" size="small" @click="deleteUserManagement(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                filterInput:"",
                users:[],
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
                this.$http.get("http://localhost:3000/users/?managementer=1").then(function (response) {
                    console.log(response);
                    this.users = response.body;
                })
            },
            //删除操作函数
            deleteUserManagement(id){
                let updateUser = {
                    managementer: 0,
                }
                this.$http.patch("http://localhost:3000/users/"+id,updateUser).then(function () {
                    this.fetchUsers();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            },
        },
        created(){
            this.fetchUsers();
        }
    }
</script>
