<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入租客姓名查询" v-model="filterInput"></el-input>
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
            <el-table-column prop="yjfee" label="押金" min-width="180" sortable>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                leaserNum:'',
                filterInput:"",
                //编辑界面数据
                leasers:[],
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
