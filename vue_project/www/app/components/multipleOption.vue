<template>
    <div>
        <div class="qTitle">
            <em v-show="item.required">*</em> {{index + 1}}、 {{item.title}}
        </div>
        <div class="qOption">
            <label v-for="option in item.option">
                <input type="checkbox">{{option.v}}
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