<template>
    <div>
        <div class="qTitle">
            <em v-show="item.required">*</em> {{index + 1}}、 {{item.title}}
        </div>
        <div class="qOption">
            <select>
                <option v-for="option in item.option" :value="option.v">
                    {{option.v}}
                </option>
            </select>
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