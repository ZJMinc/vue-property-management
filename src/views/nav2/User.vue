<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入业主姓名查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
                <el-form-item>
                    当前业主数量为:{{userNum}}
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
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteUser(props.row.id)">删除</el-button>
                    <el-button type="primary" size="small" @click="addUserManagement(props.row.id)">添至业委会</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增人员" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addUser">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="adduser.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="adduser.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="adduser.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入住时间" :label-width="formLabelWidth">
                    <el-input v-model="adduser.time" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="adduser.phone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="adduser.idCard" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改业主信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateUser">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="user.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="user.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="user.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入住时间" :label-width="formLabelWidth">
                    <el-input v-model="user.time" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="user.phone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="user.idCard" autocomplete="off"></el-input>
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
                //新增界面数据
                adduser:{
                    addname: '',
                    addage: '',
                    addaddress: '',
                    addtime: '',
                    addphone: '',
                    addidCard: '',
                    date:''
                },
                //编辑界面数据
                user:{
                    name: '',
                    age: '',
                    address: '',
                    time: '',
                    phone: '',
                    idCard: '',
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
            addUser(e){
                if(!this.adduser.name ||!this.adduser.age ||!this.adduser.address  ||!this.adduser.time  ||!this.adduser.phone ||!this.adduser.idCard ){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newUser = {
                        name: this.adduser.name,
                        age: this.adduser.age,
                        address: this.adduser.address,
                        time: this.adduser.time,
                        phone: this.adduser.phone,
                        idCard: this.adduser.idCard,
                        date: this.adduser.date,
                    }
                    this.$http.post("http://localhost:3000/users",newUser).then(function (response) {
                    })
                    this.$notify({
                        title: '消息提示',
                        message: '添加成功',
                        type: 'success'
                    });
                    e.preventDefault();
                }
                e.preventDefault();
                this.addFormVisible = false
                this.fetchUsers();
                this.getUserNum();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/users/"+id).then(function (response) {
                    this.user = response.body;
                });
            },
            addUserManagement(id){
                let updateUser = {
                    managementer: 1,
                }
                this.$http.patch("http://localhost:3000/users/"+id,updateUser).then(function () {
                });
                this.$notify({
                    title: '消息提示',
                    message: '添加业委会成功',
                    type: 'success'
                });
            },
            updateUser(id){
                if(!this.user.name ||!this.user.age ||!this.user.address  ||!this.user.time  ||!this.user.phone ||!this.user.idCard ){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateUser = {
                        name: this.user.name,
                        age: this.user.age,
                        address: this.user.address,
                        time: this.user.time,
                        phone: this.user.phone,
                        idCard: this.user.idCard
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
            //删除操作函数
            deleteUser(id){
                this.$http.delete("http://localhost:3000/users/"+id).then(function () {
                    this.fetchUsers();
                    this.getUserNum();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            },
            getUserNum(){
                this.$http.get("http://localhost:3000/users").then(function (response) {
                    this.userNum = response.body.length;
                })
            }
        },
        created(){
            this.fetchUsers();
            this.getUserNum();
        }
    }
</script>
