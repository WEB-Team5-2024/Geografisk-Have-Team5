<template>
    <div class="julemarkedProgram">
    <div class="julemarkedProgram-titel">
        <p>Program</p>
    </div>
    <div class="julemarkedProgram-beskrivelse">
        <p>Kl. 10-15: Boderne med bæredygtige ting og sager er åbne. <br>Kl. 10-15: Lav julepynt i have- og naturmaterialer (selvkørende workshop). <br>Kl. 10-12: Dus med dyrene. Følg med dyrepasseren rundt til havens søde dyr. <br>Kl. 10-15: Café Lykkefund serverer Gløgg, æbleskiver og andre lækkerier på Væksthustorvet. Pandekager på Hjul serverer vegetariske madpandekager og pandekager med sødt fyld. <br>Kl. 10.30-12.30 (kun søndag): Bind en adventskrans med et mere blomstrende look. <br>Kl. 11-14: Mød Julemanden og få et billede sammen med ham. <br>Kl. 11,12,13 og 14: Julemanden læser juleeventyr i regnvejrshytten (15. minutter). <br>Kl. 11-14.30: Live musik med julemusikanter med harmonika og violin på Væksthustorvet. <br>Kl. 12-14: Bålhygge med snobrød og popcorn ved Café Lykkefund. <br>Kl. 15-16 (kun lørdag): Julebanko for store og små med præmier. 25 kr./plade. I Væksthuset.</p>
    </div>
    </div>
</template>
  
<script setup>

</script>
<style lang="scss" scoped>
@import '../styles/global.scss';
.julemarkedProgram{
    background-color: $secondary-color;
    box-shadow: $drop-shadow;
    border-radius: 10px;

    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20%;
    height: auto;
    width: 320px;
    
}
.julemarkedProgram-beskrivelse{
    font: $primary-font;
    font-size: $extra-small-font-size;
    font-weight: $regular-weight;
    color: $background-color;
    text-align: center;
}
.julemarkedProgram-titel{
    font: $primary-font;
    font-size: $large-font-size;
    font-weight: $bold-weight;
    color: $background-color;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>