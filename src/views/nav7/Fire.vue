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
                record:['2020.01 李三 正常','2020.02 小王 3单元杂物堆砌阻塞安全通道']
            }
        }
    }
</script>

<style scoped>

</style>
