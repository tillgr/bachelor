<template> 
    <div class="basic_overlay">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicOverlay extends Vue{

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.basic_overlay{
    top:0;
    overflow-y:scroll;
    position:fixed;
    width:100%;
    height: 100%;
    background-color:rgba(255,255,255,0.85);
    display:flex;
    flex-direction: column;
    justify-content: normal;
    padding-top: $edgePadding;
    align-items:center;
    z-index:10;
    left:0px;
}
</style>