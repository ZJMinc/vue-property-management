<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入单元名称查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(apartmentdecors,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="单元号" width="120" sortable>
            </el-table-column>
            <el-table-column prop="content" label="装修内容" width="120" sortable>
            </el-table-column>
            <el-table-column prop="date" label="时间" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑单元装修资料</el-button>
                    <el-button type="danger" size="small" @click="deleteApartmentdecor(props.row.id)">删除单元装修资料</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增装修" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addApartmentdecor">
                <el-form-item label="单元号" :label-width="formLabelWidth">
                    <el-input v-model="addapartmentdecor.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="装修内容" :label-width="formLabelWidth">
                    <el-input v-model="addapartmentdecor.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" :label-width="formLabelWidth">
                    <el-input v-model="addapartmentdecor.date" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addApartmentdecor">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="修改装修信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateApartmentdecor">
                <el-form-item label="单元号" :label-width="formLabelWidth">
                    <el-input v-model="apartmentdecor.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="装修内容" :label-width="formLabelWidth">
                    <el-input v-model="apartmentdecor.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" :label-width="formLabelWidth">
                    <el-input v-model="apartmentdecor.date" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateApartmentdecor">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "ApartmentMaintain",
        data(){
            return{
                filterInput:"",
                //新增界面数据
                addapartmentdecor:{
                    addname: '',
                    addcontent: '',
                    adddate: '',
                },
                //编辑界面数据
                apartmentdecor:{
                    name: '',
                    content: '',
                    date: ''
                },
                apartmentdecors:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(apartmentdecors,value){
                return apartmentdecors.filter(function (apartmentdecor) {
                    return apartmentdecor.name.match(value);
                })
            },
            fetchApartmentdecors() {
                this.$http.get("http://localhost:3000/apartmentdecors").then(function (response) {
                    console.log(response);
                    this.apartmentdecors = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addApartmentdecor(e){
                if(!this.addapartmentdecor.name ||!this.addapartmentdecor.content |!this.addapartmentdecor.date){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newApartmentdecor = {
                        name: this.addapartmentdecor.name,
                        content: this.addapartmentdecor.content,
                        date: this.addapartmentdecor.date
                    }
                    this.$http.post("http://localhost:3000/apartmentdecors",newApartmentdecor).then(function (response) {
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
                this.fetchApartmentdecors();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/apartmentdecors/"+id).then(function (response) {
                    this.apartmentdecor = response.body;
                });
            },
            updateApartmentdecor(id){
                if(!this.apartmentdecor.name ||!this.apartmentdecor.content ||!this.apartmentdecor.date){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateApartmentdecor = {
                        name: this.apartmentdecor.name,
                        content: this.apartmentdecor.content,
                        date: this.apartmentdecor.date
                    }
                    this.$http.patch("http://localhost:3000/apartmentdecors/"+this.id,updateApartmentdecor).then(function () {
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
            deleteApartmentdecor(id){
                this.$http.delete("http://localhost:3000/apartmentdecors/"+id).then(function () {
                    this.fetchApartmentdecors();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            }
        },
        created(){
            this.fetchApartmentdecors();
        }
    }
</script>

<style scoped>

</style>
