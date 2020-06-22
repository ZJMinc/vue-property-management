<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入楼盘名称查询" v-model="filterInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddForm">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="filterBy(communitys,filterInput)" style="width: 100%;">
            <el-table-column prop="name" label="楼盘名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="decoration" label="装修情况" width="120" sortable>
            </el-table-column>
            <el-table-column prop="style" label="建筑类型" width="120" sortable>
            </el-table-column>
            <el-table-column prop="num" label="楼栋数" width="180" sortable>
            </el-table-column>
            <el-table-column prop="time" label="开盘时间" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template slot-scope="props">
                    <el-button size="small"  icon="el-icon-edit" @click="showEditForm(props.row.id)">编辑楼盘资料</el-button>
                    <el-button type="danger" size="small" @click="deleteCommunity(props.row.id)">删除楼盘资料</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增楼盘" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="addCommunity">
                <el-form-item label="楼盘名称" :label-width="formLabelWidth">
                    <el-input v-model="addcommunity.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="装修情况" :label-width="formLabelWidth">
                    <el-select v-model="addcommunity.decoration" placeholder="请选择装修情况">
                        <el-option label="毛坯" value="毛坯"></el-option>
                        <el-option label="简装" value="简装"></el-option>
                        <el-option label="精装" value="精装"></el-option>
                        <el-option label="公共部分精装" value="公共部分精装"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="建筑类型" :label-width="formLabelWidth">
                    <el-select v-model="addcommunity.style" placeholder="请选择建筑类型">
                        <el-option label="板楼" value="板楼"></el-option>
                        <el-option label="塔楼" value="塔楼"></el-option>
                        <el-option label="板塔结合" value="板塔结合"></el-option>
                        <el-option label="独栋别墅" value="独栋别墅"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="楼栋数量" :label-width="formLabelWidth">
                    <el-input v-model="addcommunity.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开盘时间" :label-width="formLabelWidth">
                    <el-input v-model="addcommunity.time" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCommunity">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑界面-->
        <el-dialog title="修改楼盘信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form v-on:submit="updateCommunity">
                <el-form-item label="楼盘名称" :label-width="formLabelWidth">
                    <el-input v-model="community.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="装修情况" :label-width="formLabelWidth">
                    <el-select v-model="community.decoration" placeholder="请选择装修情况">
                        <el-option label="毛坯" value="毛坯"></el-option>
                        <el-option label="简装" value="简装"></el-option>
                        <el-option label="精装" value="精装"></el-option>
                        <el-option label="公共部分精装" value="公共部分精装"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="建筑类型" :label-width="formLabelWidth">
                    <el-select v-model="community.style" placeholder="请选择建筑类型">
                        <el-option label="板楼" value="板楼"></el-option>
                        <el-option label="塔楼" value="塔楼"></el-option>
                        <el-option label="板塔结合" value="板塔结合"></el-option>
                        <el-option label="独栋别墅" value="独栋别墅"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="楼栋数量" :label-width="formLabelWidth">
                    <el-input v-model="community.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开盘时间" :label-width="formLabelWidth">
                    <el-input v-model="community.time" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateCommunity">修 改</el-button>
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
                addcommunity:{
                    addname: '',
                    adddecoration: '',
                    addstyle: '',
                    addnum:'',
                    addtime: ''
                },
                //编辑界面数据
                community:{
                    name: '',
                    decoration: '',
                    style: '',
                    num:'',
                    time: ''
                },
                communitys:[],
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//修改界面是否显示
                formLabelWidth: '120px'
            }
        },
        methods: {
            filterBy(communitys,value){
                return communitys.filter(function (community) {
                    return community.name.match(value);
                })
            },
            fetchCommunitys() {
                this.$http.get("http://localhost:3000/communitys").then(function (response) {
                    console.log(response);
                    this.communitys = response.body;
                })
            },
            //添加操作函数
            showAddForm() {
                this.addFormVisible = true
            },
            addCommunity(e){
                if(!this.addcommunity.name ||!this.addcommunity.decoration ||!this.addcommunity.style ||!this.addcommunity.num  ||!this.addcommunity.time){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let newCommunity = {
                        name: this.addcommunity.name,
                        decoration: this.addcommunity.decoration,
                        style: this.addcommunity.style,
                        num: this.addcommunity.num,
                        time: this.addcommunity.time
                    }
                    this.$http.post("http://localhost:3000/communitys",newCommunity).then(function (response) {
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
                this.fetchCommunitys();
            },
            //编辑操作函数
            showEditForm(id) {
                this.id = id;
                this.editFormVisible = true;
                this.$http.get("http://localhost:3000/communitys/"+id).then(function (response) {
                    this.community = response.body;
                });
            },
            updateCommunity(id){
                if(!this.community.name ||!this.community.decoration ||!this.community.style ||!this.community.num ||!this.community.time){
                    this.$notify({
                        title: '消息提示',
                        message: '请填写完整信息',
                        type: 'error'
                    });
                }else{
                    let updateCommunity = {
                        name: this.community.name,
                        decoration: this.community.decoration,
                        style: this.community.style,
                        num: this.community.num,
                        time: this.community.time
                    }
                    this.$http.patch("http://localhost:3000/communitys/"+this.id,updateCommunity).then(function () {
                        this.fetchCommunitys();
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
            deleteCommunity(id){
                this.$http.delete("http://localhost:3000/communitys/"+id).then(function () {
                    this.fetchCommunitys();
                });
                this.$notify({
                    title: '消息提示',
                    message: '删除成功',
                    type: 'success'
                });
            }
        },
        created(){
            this.fetchCommunitys();
        }
    }
</script>
