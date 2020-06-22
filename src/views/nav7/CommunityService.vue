<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入服务名称查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(communityservices,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="服务" width="120" sortable>
            </el-table-column>
            <el-table-column prop="address" label="地址" min-width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteCommunityservice(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增服务" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addCommunityservice">
                <el-form-item label="服务名称" :label-width="formLabelWidth">
                    <el-input v-model="addcommunityservice.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="addcommunityservice.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCommunityservice">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改服务信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateCommunityservice">
                <el-form-item label="服务名称" :label-width="formLabelWidth">
                    <el-input v-model="communityservice.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="communityservice.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateCommunityservice">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    export default {
        data(){
            return{
                filterInput:"",
                //新增界面数据
                addcommunityservice:{
                    addname: '',
                    addaddress: '',
                },
                //编辑界面数据
                communityservice:{
                    name: '',
                    address: '',
                },
                communityservices:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(communityservices,value){
                return communityservices.filter(function (communityservice) {
                    return communityservice.name.match(value);
                })
            },
            fetchCommunityservices() {
                this.$http.get("http://localhost:3000/communityservices").then(function (response) {
                    console.log(response);
                    this.communityservices = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addCommunityservice(e){
                if(!this.addcommunityservice.name ||!this.communityservice.address){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newCommunityservice = {
                        name: this.addcommunityservice.name,
                        address: this.addcommunityservice.address,

                    }
                    this.$http.post("http://localhost:3000/communityservices",newCommunityservice).then(function (response) {
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
                this.fetchCommunityservices();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/communityservices/"+id).then(function (response) {
                    this.communityservice = response.body;
                });
            },
            updateCommunityservice(id){
                if(!this.communityservice.name ||!this.communityservice.address){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateCommunityservice = {
                        name: this.communityservice.name,
                        address: this.communityservice.address
                    }
                    this.$http.patch("http://localhost:3000/communityservices/"+this.id,updateCommunityservice).then(function () {
                        this.fetchCommunityservices();
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
            deleteCommunityservice(id){
                this.$http.delete("http://localhost:3000/communityservices/"+id).then(function () {
                    this.fetchCommunityservices();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            }
        },
        created(){
            this.fetchCommunityservices();
        }
    }
</script>


<style scoped>

</style>
