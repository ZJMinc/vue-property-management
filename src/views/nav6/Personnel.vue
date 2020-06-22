<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入员工姓名查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
                <el-form-item>
                    当前员工数量为:{{personnelNum}}
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(personnels,filterInput)" style="width: 100%;">
            <el-table-column prop="id" label="员工号" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable>
            </el-table-column>
            <el-table-column prop="address" label="住址" width="180" sortable>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="120" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="130" sortable>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deletePersonnel(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增人员" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addPersonnel">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="addpersonnel.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="addpersonnel.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="addpersonnel.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="addpersonnel.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="addpersonnel.phone" autocomplete="off"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPersonnel">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改人员信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updatePersonnel">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="personnel.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="personnel.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="personnel.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="personnel.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="personnel.phone" autocomplete="off"></el-input>
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
        data(){
            return{
                personnelNum:'',
                filterInput:"",
                //新增界面数据
                addpersonnel:{
                    addname: '',
                    addage: '',
                    addaddress: '',
                    addsex: '',
                    addphone: '',
                    id:'',
                    work:'',
                    area:''
                },
                //编辑界面数据
                personnel:{
                    name: '',
                    age: '',
                    address: '',
                    time: '',
                    phone: '',
                    id: '',
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
                    return personnel.name.match(value);
                })
            },
            fetchPersonnels() {
                this.$http.get("http://localhost:3000/personnels").then(function (response) {
                    console.log(response);
                    this.personnels = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addPersonnel(e){
                if(!this.addpersonnel.name ||!this.addpersonnel.age ||!this.addpersonnel.address  ||!this.addpersonnel.sex ||!this.addpersonnel.phone ){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newPersonnel = {
                        name: this.addpersonnel.name,
                        age: this.addpersonnel.age,
                        address: this.addpersonnel.address,
                        sex: this.addpersonnel.sex,
                        phone: this.addpersonnel.phone,
                        work: this.addpersonnel.work,
                        area: this.addpersonnel.area
                    }
                    this.$http.post("http://localhost:3000/personnels",newPersonnel).then(function (response) {
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
                this.fetchPersonnels();
                this.getPersonnelNum();
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
                if(!this.personnel.name ||!this.personnel.age ||!this.personnel.address  ||!this.personnel.sex  ||!this.personnel.phone ){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updatePersonnel = {
                        name: this.personnel.name,
                        age: this.personnel.age,
                        address: this.personnel.address,
                        sex: this.personnel.sex,
                        phone: this.personnel.phone,
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
            //删除操作函数
            deletePersonnel(id){
                this.$http.delete("http://localhost:3000/personnels/"+id).then(function () {
                    this.fetchPersonnels();
                    this.getPersonnelNum();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            },
            getPersonnelNum(){
                this.$http.get("http://localhost:3000/personnels").then(function (response) {
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
