<template>
  <div>
    <div v-if="buttonStyle == 'primary'" class="button-common button-primary">
        <button v-if="size == 'L'" class="large" :style="fullWidth? 'width:100%' : ''">{{content}}</button>
        <button v-else-if="size == 'M'" class="middle" :style="fullWidth? 'width:100%' : ''">{{content}}</button>
        <button v-else-if="size == 'S'" class="small" :style="fullWidth? 'width:100%' : ''">{{content}}</button>
    </div>
    <div v-else class="button-common button-secondary">
        <button v-if="size == 'L'" class="large" :style="fullWidth? 'width:100%' : ''">{{content}}</button>
        <button v-else-if="size == 'M'" class="middle" :style="fullWidth? 'width:100%' : ''">{{content}}</button>
        <button v-else-if="size == 'S'" class="small" :style="fullWidth? 'width:100%' : ''">{{content}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: String, default: "button" },
    size: { type: String, default: "M" },
    fullWidth: { type: Boolean, default: false },
    buttonStyle: { type: String, default: '' },
  }
};
</script>

<style lang="scss" scoped>

.button-common{
    button{
        padding: 0 10px;
        transition: 0.5s;
        border:0;

        &.large{
            height:52px;
            padding:0 52px;
            @include fontStyle(14px, 600, 14px);
        }
        &.middle{
            height:48px;
            padding:0 30px;
            @include fontStyle(14px, 500, 14px);
            
        }
        &.small{
            height:40px;
            padding:0 25px;
            @include fontStyle(12px, 600, 14px);
        }
    }
}

.button-primary {
    button{    
        color:#fff;
        background-color: var(--primary-deep);

        &:hover{
            background-color: var(--primary);
        }
    }
}
.button-secondary {
    button{
        border: 1px solid $dark;
        background-color: #fff;
        
        &:hover {
            background-color: var(--primary-deep);
            color: #fff;
            border: 1px solid transparent;
        }
        
    }

}
</style>
