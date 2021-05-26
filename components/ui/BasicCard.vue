<template> 
    <article class="card">
        <slot></slot>
    </article>
</template>

<script lang="ts">
import { Component, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicCard extends Vue{}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.card{
    display:flex;
    flex-direction: column;
    width:80vw;
    max-width:500px;
}


</style>