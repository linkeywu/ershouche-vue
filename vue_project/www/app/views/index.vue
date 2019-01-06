<template>
    <div>
        <h1>部分作品功能显示</h1>
        <div>
            <ul>
                <li>
                    <router-link to="/carlist">汽车中心</router-link>
                    <p>express + mockjs + vue2 + vuex + vue-router + webpack + ES6/7 + fetch + less </p>
                </li>
                <li>
                    <router-link to="/users">用户中心</router-link>
                    <p>express + mockjs + vue2 + vuex + element-ui + vue-router + webpack + ES6/7 + fetch + less</p>
                </li>
                <li>
                    <router-link to="/coolfrom">酷表单</router-link>
                    <p>jquery-ui+ vue2 + vuex + webpack + ES6/7 + less</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    p{font-size:18px;}
    ul li{font-size:22px;line-height: 40px;}
</style>