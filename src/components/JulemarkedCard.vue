<template>
    <div class="julemarkedcard">
    <div class="julemarkedcard-titel">
        <p>Bæredygtigt julemarked</p>
    </div>
    <div class="julemarkedcard-beskrivelse">
        <p>Kom til det hyggeligste julemarked i Geografisk Have, hvor du kan finde bæredygtige julegaver uden brug af plastik, varme dig på julegløgg og æbleskiver og ikke mindst deltage i de mange hyggelige aktiviteter som julebanko, bålhygge eller dus med dyrene.</p>
    </div>
        <div class="slideknap-container">
            <div class="slideknap">
                <div class="køb-billet"> <p>Køb Billet</p></div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

</script>
<style lang="scss" scoped>
@import '../styles/global.scss';
.slideknap-container{
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;

    width: 90%;
    height: 20%;
}
.slideknap{
    height: 100%;
    width: 100%;
    background-color: #4A4C63;
    border-radius: 50px;
    display: flex;
    justify-content: center;
}
.køb-billet{
    display: flex;
    align-items: center;
    height: 100%;
    color: $background-color;
}


.julemarkedcard{
    background-color: $secondary-color;
    box-shadow: $drop-shadow;
    border-radius: 10px;

    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
    margin-top: 2%;
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