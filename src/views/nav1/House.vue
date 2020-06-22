<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入房屋号查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(houses,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="户主姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="hid" label="房屋号" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑房屋资料</el-button>
                    <el-button type="danger" size="small" @click="deleteHouse(props.row.id)">删除房屋资料</el-button>
                </template>
            </el-table-column>
        </el-table>

<!--        新增界面-->
        <el-dialog title="新增房屋" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addHouse">
                <el-form-item label="户主姓名" :label-width="formLabelWidth">
                    <el-input v-model="addhouse.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房屋号" :label-width="formLabelWidth">
                    <el-input v-model="addhouse.hid" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHouse">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改房屋信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateHouse">
                <el-form-item label="户主姓名" :label-width="formLabelWidth">
                    <el-input v-model="house.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房屋号" :label-width="formLabelWidth">
                    <el-input v-model="house.hid" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateHouse">修 改</el-button>
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
                addhouse:{
                    addname: '',
                    addhid: '',
                },
                //编辑界面数据
                house:{
                    name: '',
                    hid:''
                },
                houses:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(houses,value){
                return houses.filter(function (house) {
                    return house.hid.match(value);
                })
            },
            fetchHouses() {
                this.$http.get("http://localhost:3000/houses").then(function (response) {
                    console.log(response);
                    this.houses = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addHouse(e){
                if(!this.addhouse.name ||!this.addhouse.hid){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newHouse = {
                        name: this.addhouse.name,
                        hid: this.addhouse.hid
                    }
                    this.$http.post("http://localhost:3000/houses",newHouse).then(function (response) {
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
                this.fetchHouses();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/houses/"+id).then(function (response) {
                    this.house = response.body;
                });
            },
            updateHouse(id){
                if(!this.house.name ||!this.house.hid){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateHouse = {
                        name: this.house.name,
                        hid: this.house.hid
                    }
                    this.$http.patch("http://localhost:3000/houses/"+this.id,updateHouse).then(function () {
                        this.fetchHouses();
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
            deleteHouse(id){
                this.$http.delete("http://localhost:3000/houses/"+id).then(function () {
                    this.fetchHouses();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            }
        },
        created(){
            this.fetchHouses();
        }
    }
</script>


<style scoped>

</style>
