<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入租客姓名查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
                <el-form-item>
                    当前租户数量为:{{leaserNum}}
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(leasers,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="姓名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="date" label="租期" width="180" sortable>
            </el-table-column>
            <el-table-column prop="fee" label="租金" width="180" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" min-width="130" sortable>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteLeaser(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增租客" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addLeaser">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="addleaser.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="租期" :label-width="formLabelWidth">
                    <el-input v-model="addleaser.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="租金" :label-width="formLabelWidth">
                    <el-input v-model="addleaser.fee" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="addleaser.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addLeaser">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改租客信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateLeaser">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="leaser.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="租期" :label-width="formLabelWidth">
                    <el-input v-model="leaser.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="租金" :label-width="formLabelWidth">
                    <el-input v-model="leaser.fee" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="leaser.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateLeaser">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                leaserNum:'',
                filterInput:"",
                //新增界面数据
                addleaser:{
                    addyjfee:'',
                    addfeedate:'',
                    addname: '',
                    adddate: '',
                    addphone: '',
                    addfee: ''
                },
                //编辑界面数据
                leaser:{
                    name: '',
                    date: '',
                    phone: '',
                    fee: '',
                },
                leasers:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(leasers,value){
                return leasers.filter(function (leaser) {
                    return leaser.name.match(value);
                })
            },
            fetchLeasers() {
                this.$http.get("http://localhost:3000/leasers").then(function (response) {
                    console.log(response);
                    this.leasers = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addLeaser(e){
                if(!this.addleaser.name ||!this.addleaser.date ||!this.addleaser.fee  ||!this.addleaser.phone ){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newLeaser = {
                        addyjfee: this.addleaser.addyjfee,
                        addfeedate: this.addleaser.addfeedate,
                        name: this.addleaser.name,
                        date: this.addleaser.date,
                        fee: this.addleaser.fee,
                        phone: this.addleaser.phone,
                    }
                    this.$http.post("http://localhost:3000/leasers",newLeaser).then(function (response) {
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
                this.fetchLeasers();
                this.getLeaserNum();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/leasers/"+id).then(function (response) {
                    this.leaser = response.body;
                });
            },
            updateLeaser(id){
                if(!this.leaser.name ||!this.leaser.date ||!this.leaser.fee  ||!this.leaser.phone ){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateLeaser = {
                        name: this.leaser.name,
                        date: this.leaser.date,
                        fee: this.leaser.fee,
                        phone: this.leaser.phone,

                    }
                    this.$http.patch("http://localhost:3000/leasers/"+this.id,updateLeaser).then(function () {
                        this.fetchLeasers();
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
            deleteLeaser(id){
                this.$http.delete("http://localhost:3000/leasers/"+id).then(function () {
                    this.fetchLeasers();
                    this.getLeaserNum();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            },
            getLeaserNum(){
                this.$http.get("http://localhost:3000/leasers").then(function (response) {
                    this.leaserNum = response.body.length;
                })
            }
        },
        created(){
            this.fetchLeasers();
            this.getLeaserNum();
        }
    }
</script>
