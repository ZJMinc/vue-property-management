<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入户主名称查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="showAddForm">新增</el-button>
                    </el-form-item>
                </el-form-item>

            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(housemaintains,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="户主" width="120" sortable>
            </el-table-column>
            <el-table-column prop="address" label="住址" width="120" sortable>
            </el-table-column>
            <el-table-column prop="fault" label="维修内容" width="120" sortable>
            </el-table-column>
            <el-table-column prop="worker" label="维修人员" width="120" sortable>
            </el-table-column>
            <el-table-column prop="status" label="维修状态" min-width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增维修" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addHousemaintain">
                <el-form-item label="户主" :label-width="formLabelWidth">
                    <el-input v-model="addhousemaintain.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="addhousemaintain.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="维修内容" :label-width="formLabelWidth">
                    <el-input v-model="addhousemaintain.fault" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="维修人员" :label-width="formLabelWidth">
                    <el-input v-model="addhousemaintain.worker" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="维修状态" :label-width="formLabelWidth">
                    <el-select v-model="addhousemaintain.status" placeholder="请选择装修情况">
                        <el-option label="未维修" value="未维修"></el-option>
                        <el-option label="维修中" value="维修中"></el-option>
                        <el-option label="已维修" value="已维修"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHousemaintain">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改维修信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateBuilding">
                <el-form-item label="维修人员" :label-width="formLabelWidth">
                    <el-input v-model="housemaintain.worker" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="维修状态" :label-width="formLabelWidth">
                    <el-select v-model="housemaintain.status" placeholder="请选择装修情况">
                        <el-option label="未维修" value="未维修"></el-option>
                        <el-option label="维修中" value="维修中"></el-option>
                        <el-option label="已维修" value="已维修"></el-option>
                    </el-select>                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateHousemaintain">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "HouseMaintain",
        data(){
            return{
                filterInput:"",
                //新增界面数据
                addhousemaintain:{
                    addname: '',
                    addaddress: '',
                    addfault:'',
                    addworker:'',
                    addstatus:''
                },
                //编辑界面数据
                housemaintain:{
                    name: '',
                    address:'',
                    fault:'',
                    worker:'',
                    status:''
                },
                housemaintains:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(housemaintains,value){
                return housemaintains.filter(function (housemaintain) {
                    return housemaintain.name.match(value);
                })
            },
            fetchHousemaintains() {
                this.$http.get("http://localhost:3000/housemaintains").then(function (response) {
                    console.log(response);
                    this.housemaintains = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addHousemaintain(e){
                if(!this.addhousemaintain.name ||!this.addhousemaintain.address||!this.addhousemaintain.fault||!this.addhousemaintain.worker||!this.addhousemaintain.status){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newHousemaintain = {
                        name: this.addhousemaintain.name,
                        address: this.addhousemaintain.address,
                        fault: this.addhousemaintain.fault,
                        worker: this.addhousemaintain.worker,
                        status: this.addhousemaintain.status
                    }
                    this.$http.post("http://localhost:3000/housemaintains",newHousemaintain).then(function (response) {
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
                this.fetchHousemaintains();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/housemaintains/"+id).then(function (response) {
                    this.housemaintain = response.body;
                });
            },
            updateHousemaintain(id){
                if(!this.housemaintain.worker ||!this.housemaintain.status){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateHousemaintain = {
                        name: this.housemaintain.name,
                        status: this.housemaintain.status
                    }
                    this.$http.patch("http://localhost:3000/housemaintains/"+this.id,updateHousemaintain).then(function () {
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                    this.fetchHousemaintains();
                }
            }
        },
        created(){
            this.fetchHousemaintains();
        }
    }
</script>

<style scoped>

</style>
