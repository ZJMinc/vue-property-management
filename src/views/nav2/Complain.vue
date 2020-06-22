<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入户主名称查询" v-model="filterInput"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(complains,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="户主" width="120" sortable>
            </el-table-column>
            <el-table-column prop="address" label="住址" width="120" sortable>
            </el-table-column>
            <el-table-column prop="fault" label="投诉内容" width="120" sortable>
            </el-table-column>
            <el-table-column prop="status" label="处理状态" min-width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑界面-->
        <el-dialog title="修改投诉壮体啊：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateComplain">
                <el-form-item label="投诉状态" :label-width="formLabelWidth">
                    <el-select v-model="complain.status" placeholder="请选择装修情况">
                        <el-option label="未处理" value="未处理"></el-option>
                        <el-option label="处理中" value="处理中"></el-option>
                        <el-option label="已处理" value="已处理"></el-option>
                    </el-select>                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateComplain">修 改</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                //编辑界面数据
                complain:{
                    status:''
                },
                filterInput:"",
                complains:[],
                formLabelWidth: '120px',
                editFormVisible: false,//修改界面是否显示

            }
        },
        methods: {
            filterBy(complains,value){
                return complains.filter(function (complain) {
                    return complain.name.match(value);
                })
            },
            fetchComplains() {
                this.$http.get("http://localhost:3000/complains").then(function (response) {
                    console.log(response);
                    this.complains = response.body;
                })
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/complains/"+id).then(function (response) {
                    this.complain = response.body;
                });
            },
            updateComplain(id){
                if(!this.complain.status){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateComplain = {
                        status: this.complain.status,
                    }
                    this.$http.patch("http://localhost:3000/complains/"+this.id,updateComplain).then(function () {
                    });
                    this.$notify({
                        title: '消息提示',
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editFormVisible = false;
                    this.fetchComplains();
                }
            }
        },
        created(){
            this.fetchComplains();
        }
    }
</script>

<style scoped>

</style>
