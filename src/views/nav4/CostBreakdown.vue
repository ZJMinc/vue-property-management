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
        data(){
            return{
                record:['2020.01 小王缴纳物业费800元','2020.02 小王缴纳物业费780']
            }
        }
    }
</script>

<style scoped>

</style>
