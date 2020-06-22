<template>
    <section>
        <div style="margin-top: 20px">
            绿化覆盖率
            <el-progress :text-inside="true" :stroke-width="24" :percentage="35" status="success"></el-progress>
        </div>
        <ul>
            <li v-for="m in green" style="margin-top: 10px">
                <el-card>
                    {{m}}
                </el-card>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: "Greening",
        data(){
            return{
                green:['小区大门 植被覆盖率20%','小区花园植被覆盖率40%']
            }
        }
    }
</script>

<style scoped>

</style>
