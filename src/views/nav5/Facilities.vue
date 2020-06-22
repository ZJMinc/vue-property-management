<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入设施名称查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(facilities,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="设施名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="area" label="分布区域" width="120" sortable>
            </el-table-column>
            <el-table-column prop="broke" label="是否已损坏" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑设备</el-button>
                    <el-button type="danger" size="small" @click="deleteFacilities(props.row.id)">删除设备</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增界面-->
        <el-dialog title="新增设备信息：" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addFacilitie">
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="addfacilitie.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分布区域" :label-width="formLabelWidth">
                    <el-select v-model="addfacilitie.area" placeholder="请选择分布区域">
                        <el-option label="东区" value="东区"></el-option>
                        <el-option label="西区" value="西区"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFacilitie">新 增</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改设备信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateFacilitie">
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="facilitie.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分布区域" :label-width="formLabelWidth">
                    <el-select v-model="facilitie.area" placeholder="请选择分布区域">
                        <el-option label="东区" value="东区"></el-option>
                        <el-option label="西区" value="西区"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否已损坏" :label-width="formLabelWidth">
                    <el-select v-model="facilitie.broke" placeholder="请选择损坏情况">
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateFacilitie">修 改</el-button>
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
                addfacilitie:{
                    name: '',
                    area:'',
                    broke:''
                },
                //编辑界面数据
                facilitie:{
                    name: '',
                    area:'',
                    broke:''
                },
                facilities:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(facilities,value){
                return facilities.filter(function (facilitie) {
                    return facilitie.name.match(value);
                })
            },
            fetchFacilities() {
                this.$http.get("http://localhost:3000/facilities").then(function (response) {
                    console.log(response);
                    this.facilities = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addFacilitie(e){
                if(!this.addfacilitie.name ||!this.addfacilitie.area){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newFacilitie = {
                        name: this.addfacilitie.name,
                        area: this.addfacilitie.area,
                        broke: "否"
                    }
                    this.$http.post("http://localhost:3000/facilities",newFacilitie).then(function () {
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '增加成功',
                        type: 'success'
                    });
                    e.preventDefault();
                }
                e.preventDefault();
                this.addFormVisible = false;
                this.fetchFacilities();
            },

            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/facilities/"+id).then(function (response) {
                    this.facilitie = response.body;
                });
            },
            updateFacilitie(id){
                if(!this.facilitie.name ||!this.facilitie.area ||!this.facilitie.broke){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateFacilitie = {
                        name: this.facilitie.name,
                        area: this.facilitie.area,
                        broke: this.facilitie.broke,
                    }
                    this.$http.patch("http://localhost:3000/facilities/"+this.id,updateFacilitie).then(function () {
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                    this.fetchFacilities();
                }
            },
            //删除操作函数
            deleteFacilities(id){
                this.$http.delete("http://localhost:3000/facilities/"+id).then(function () {
                    this.fetchFacilities();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            }
        },
        created(){
            this.fetchFacilities();
        }
    }
</script>


<style scoped>

</style>
