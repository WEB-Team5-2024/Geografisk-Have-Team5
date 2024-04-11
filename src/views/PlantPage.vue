<template>
    <div class="page-container">
    <header class="header">
      <img src="@/assets/images/Cryptomeria.png" alt="Cryptomeria" class="plant-banner">
      <div class="plant-name">
        <h2>Cryptomeria</h2>
      </div>
    </header>
    <main class="content">
  
        <!-- Plant details -->
        <section class="plant-details">
          <!-- Plant detail sections -->
          <article>
            <h3>Pyntegrønt</h3>
            <p>Julen er så småt ved at være ovre. Den sidste måned er der blevet pyntet op med gran og guirlander rundt omkring. Selvom det virker pæredansk, så kan der være meget af det, vi pynter op med, som faktisk stammer fra fjerne egne. Én af de typer pyntegrønt, der bliver brugt meget i denne tid, er sugi eller Cryptomeria, som er det botaniske navn.</p>
          </article>
          <article>
            <h3>Heksekost</h3>
            <p>Cryptomeria kommer fra Japan, og der findes kun denne ene art i slægten. Normalt bliver Cryptomeria et stort træ, der kan blive op mod 70 meter højt. Men slægten er meget variabel og har også nemt ved at lave de såkaldte heksekoste, hvor der opstår genetisk dværgvækst. Derfor kan man også få ganske små sorter, som fint kan bruges i den lille have. Et eksempel på en sådan heksekost kan ses i Geografisk Have i den ene Cryptomeria overfor Rosenhaven ca. 10 meter oppe i kronen.
</p>
          </article>
          <article>
            <h3>I tilbagegang</h3>
            <p>I Danmark bruges Cryptomeria primært som prydplante og til pyntegrønt ved juletid. Den har været forsøgt brugt i skovbruget til tømmer – og flere steder rundt omkring i skovene kan man finde arealer tilplantet med Cryptomeria. I Japan er det et skattet skovtræ, der dyrkes til diverse formål. Dog er de fleste vilde bestande i dag fredet, da træet anses for at være i tilbagegang.

</p>
          </article>
          <article>
            <h3>Kuldefølsom de første år</h3>
            <p>Når først en Cryptomeria er etableret, klarer den sig fint i Danmark. Men små nye planter kan have brug for beskyttelse til at komme igennem de første vintre. I Geografisk Have ser vi i efteråret tit nye selvsåede frøplanter rundt omkring, men de klarer sig sjældent igennem en almindelig dansk vinter, medmindre de står meget beskyttet.
</p>
          </article>
          <article>
            <h3>Cryptomeria i Geografisk Have</h3>
            <p>Har du lyst til at se Geografisk Haves forskellige Cryptomeria-sorter her i juledagene, kan du samtidig donere dit juletræ, som vi – og især vores geder – hjertens gerne modtager. De kan nemlig godt lide at gnave i barken og bagefter kan træerne bruges til at lave knager og andre kreativiteter af.</p>
          </article>
          <article>
            <p>I Geografisk Have står alle vores Cryptomeria i Japan-området – med én undtagelse. Der findes nemlig også et eksemplar i Kina-området, selvom man i dag mener, at træet kun er naturligt hjemmehørende i Japan.</p>
          </article>
        </section>
      </main>
    </div>
  </template>

  <style scoped lang="scss">
  @import "@/styles/global.scss";

  .page-container {
    .header {
      position: relative;
      text-align: center;
      .plant-banner {
        width: 100%;
        height: auto;
      }
      .plant-name {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: $extra-large-font-size;
        font-weight: $bold-weight;
        padding: 0.5rem 1rem; 
      }
    }

  .content {
    .plant-details {
        margin-top: 50px;
        margin-left: 1rem;
      

      article {
        h3 {
          color: black;
          font-size: $large-font-size;
          font-weight: $bold-weight;
          margin-bottom: 1rem;
        }

        p {
          color: black; 
          font-size: $medium-font-size;
          margin-bottom: 4rem;
        }
      }
    }
  }
}
  </style>