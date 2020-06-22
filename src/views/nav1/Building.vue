<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入楼栋名称查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(buildings,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="楼栋名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="num" label="房间数量" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑楼栋资料</el-button>
                    <el-button type="danger" size="small" @click="deleteBuilding(props.row.id)">删除楼栋资料</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增楼栋" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addBuilding">
                <el-form-item label="楼盘名称" :label-width="formLabelWidth">
                    <el-input v-model="addbuilding.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间数量" :label-width="formLabelWidth">
                    <el-input v-model="addbuilding.num" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBuilding">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改楼栋信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateBuilding">
                <el-form-item label="楼栋名称" :label-width="formLabelWidth">
                    <el-input v-model="building.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间数量" :label-width="formLabelWidth">
                    <el-input v-model="building.num" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBuilding">修 改</el-button>
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
                addbuilding:{
                    addname: '',
                    addnum: '',
                },
                //编辑界面数据
                building:{
                    name: '',
                    num:''
                },
                buildings:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(buildings,value){
                return buildings.filter(function (building) {
                    return building.name.match(value);
                })
            },
            fetchBuildings() {
                this.$http.get("http://localhost:3000/buildings").then(function (response) {
                    console.log(response);
                    this.buildings = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addBuilding(e){
                if(!this.addbuilding.name ||!this.addbuilding.num){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newBuilding = {
                        name: this.addbuilding.name,
                        num: this.addbuilding.num
                    }
                    this.$http.post("http://localhost:3000/buildings",newBuilding).then(function (response) {
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
                this.fetchBuildings();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/buildings/"+id).then(function (response) {
                    this.building = response.body;
                });
            },
            updateBuilding(id){
                if(!this.building.name ||!this.building.num){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateBuilding = {
                        name: this.building.name,
                        num: this.building.num
                    }
                    this.$http.patch("http://localhost:3000/buildings/"+this.id,updateBuilding).then(function () {
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                    this.fetchBuildings();
                }
            },
            //删除操作函数
            deleteBuilding(id){
                this.$http.delete("http://localhost:3000/buildings/"+id).then(function () {
                    this.fetchBuildings();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            }
        },
        created(){
            this.fetchBuildings();
        }
    }
</script>


<style scoped>

</style>
