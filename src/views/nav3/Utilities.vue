<template>
    <section>
            <ul>
                <li v-for="m in record" style="margin-top: 10px">
                    <el-card>
                        {{m}}
                    </el-card>
                </li>
            </ul>
    </section>
</template>

<script>
    export default {
        name: "Utilities",
        data(){
            return{
                record:['2020.01 小区总用电10000度 小区总用水3000吨 总用煤气量 800立方米','2020.02 小区总用电10000度 小区总用水3000吨 总用煤气量 800立方米','2020.03 小区总用电10000度 小区总用水3000吨 总用煤气量 800立方米','2020.04 小区总用电10000度 小区总用水3000吨 总用煤气量 800立方米']
            }
        }
    }
</script>

<style scoped>

</style>
