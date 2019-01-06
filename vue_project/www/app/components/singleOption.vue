<template>
    <div>
        <div class="qTitle">
            <em v-show="item.required">*</em> {{index + 1}}、 {{item.title}}
        </div>
        <div class="qOption">
            <label v-for="option in item.option">
                <input type="radio" :name="'q'+(index + 1)">{{option.v}}
            </label>
        </div>
    </div>
</template>
<script>
    export default {
        props:["item","index"]
    }
</script>
<style>

</style>