<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入员工姓名查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    当前清洁工数量为:{{personnelNum}}
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(personnels,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="work" label="工作安排" width="120" sortable>
            </el-table-column>
            <el-table-column prop="area" label="工作区域" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="修改人员信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updatePersonnel">
                <el-form-item label="工作区域" :label-width="formLabelWidth">
                    <el-input v-model="personnel.area" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePersonnel">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "WorkSchedule",
        data(){
            return{
                personnelNum:'',
                filterInput:"",
                //编辑界面数据
                personnel:{
                    area: ''
                },
                personnels:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(personnels,value){
                return personnels.filter(function (personnel) {
                    return personnel.work.match(value);
                })
            },
            fetchPersonnels() {
                this.$http.get("http://localhost:3000/personnels?work=清洁工").then(function (response) {
                    console.log(response);
                    this.personnels = response.body;
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
                this.$http.get("http://localhost:3000/personnels/"+id).then(function (response) {
                    this.personnel = response.body;
                });
            },
            updatePersonnel(id){
                if(!this.personnel.area){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updatePersonnel = {
                        area: this.personnel.area,
                    }
                    this.$http.patch("http://localhost:3000/personnels/"+this.id,updatePersonnel).then(function () {
                        this.fetchPersonnels();
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                }
            },
            getPersonnelNum(){
                this.$http.get("http://localhost:3000/personnels/?work=清洁工").then(function (response) {
                    this.personnelNum = response.body.length;
                })
            }
        },
        created(){
            this.fetchPersonnels();
            this.getPersonnelNum();
        }
    }
</script>
