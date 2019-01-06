<template>
    <div class="login_page">
        <div class="login_box">
            {{formData}}
            <Form :model="formData">
                <FormItem prop="user">
                    <Input type="text" placeholder="Username" v-model="formData.username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" placeholder="Password" v-model="formData.password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" 
                        :disabled="!(formData.username && formData.password)"
                        @click="submitForm()"
                    >
                        登陆
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        data(){
            return {
                formData:{ }
            }
        },
        methods:{
            async submitForm(){
                // const data = await fetch("/api/login", {
                //     method:"POST",
                //     body:JSON.stringify(),
                //     headers:{"Content-type":"application/json"}
                // }).then(data=>data.json());

                const {result} = await axios.post('/api/login', this.formData).then((res)=>res.data)
                
                console.log(this.$Message)
                if(result == -1){
                    alert("登陆失败！")
                }else{
                    this.$router.push("/")
                }
                
            }
        }
    }
</script>
<style scoped>
    .login_page{
        position: fixed;
        top:0;left:0;
        width: 100%;height: 100%;
        z-index: 999999;
        background: #333;
    }
    .login_box{
        width: 500px;height: 300px;
        background: #fff;
        position:absolute;
        top:0;left:0;bottom: 0;right:0;
        margin:auto;
        border-radius: 10px;
        padding: 50px;
        box-sizing: border-box;
        box-shadow: 0 0 3px 10px;
    }
</style>