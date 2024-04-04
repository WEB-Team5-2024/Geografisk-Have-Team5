<template>
    <div class="julemarkedcard">
    <div class="julemarkedcard-titel">
        <p>Bæredygtigt julemarked</p>
    </div>
    <div class="julemarkedcard-beskrivelse">
        <p>Kom til det hyggeligste julemarked i Geografisk Have, hvor du kan finde bæredygtige julegaver uden brug af plastik, varme dig på julegløgg og æbleskiver og ikke mindst deltage i de mange hyggelige aktiviteter som julebanko, bålhygge eller dus med dyrene.</p>
    </div>
    </div>
</template>
  
<script setup>

</script>
<style lang="scss">
@import '../styles/global.scss';
.julemarkedcard{
    background-color: $secondary-color;
    box-shadow: $drop-shadow;
    border-radius: 10px;

    margin-left: auto;
    margin-right: auto;
    height: 200px;
    width: 320px;
}
.julemarkedcard-beskrivelse{
    font: $primary-font;
    font-size: $extra-small-font-size;
    font-weight: $regular-weight;
    color: $background-color;
    text-align: center;
}
.julemarkedcard-titel{
    font: $primary-font;
    font-size: $large-font-size;
    font-weight: $bold-weight;
    color: $background-color;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>