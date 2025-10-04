<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
      Metodika výpočtu osobní míry inflace
    </h1>
    
    <div class="prose prose-blue dark:prose-invert max-w-none">
      <p>
        Oficiální míra inflace je vypočítávána Českým statistickým úřadem na základě tzv. spotřebního koše. Ten obsahuje přes 700 reprezentativních položek rozdělených do 12 hlavních kategorií, od potravin přes bydlení až po vzdělávání. Každé položce je přiřazena váha podle toho, jak velkou část výdajů "průměrná" česká domácnost na danou kategorii vynakládá.
      </p>
      <p>
        Tento přístup, ačkoliv metodologicky správný pro měření celkové cenové hladiny v ekonomice, nemusí přesně odrážet osobní zkušenost každého jednotlivce s růstem cen. Například mladý nezadaný člověk žijící v nájmu v Praze bude kupovat výrazně jiné zboží než čtyřčlenná rodina žijící ve vlastním domě na venkově. Proto jsme vyvinuli kalkulačku, která vám umožní vypočítat vaši "osobní míru inflace" na základě vašich skutečných výdajů.
      </p>
      <h2>Jak kalkulačka funguje?</h2>
      <p>Náš výpočet probíhá ve třech hlavních krocích:</p>
      <h3>1. Sběr a zpracování cenových dat</h3>
      <p>
        Využíváme oficiální data o cenách jednotlivých položek spotřebního koše, která sbírá Český statistický úřad. Tato data jsou velmi detailní a pokrývají stovky různých produktů a služeb napříč celou ekonomikou. ČSÚ sbírá tyto ceny pravidelně v různých lokalitách po celé České republice, čímž zajišťuje reprezentativní vzorek.
      </p>
      <h3>2. Reorganizace kategorií</h3>
      <p>
        Původní kategorie, založené na klasifikaci vytvořené OSN, jsme přeorganizovali do uživatelsky přívětivějších skupin, které lépe odpovídají tomu, jak běžní lidé přemýšlejí o svých výdajích. V případech, kdy jedna naše kategorie obsahuje více podkategorií z původního košíku ČSÚ, používáme pro jejich agregaci váhy z oficiálního spotřebního koše. To zajišťuje, že poměry mezi jednotlivými položkami zůstávají zachovány v souladu s jejich významem v české ekonomice.
      </p>
      <h3>3. Výpočet personalizované míry inflace</h3>
      <p>
        Na základě vámi zadaného rozpočtu přepočítáme váhy jednotlivých kategorií tak, aby odpovídaly vašemu skutečnému spotřebnímu chování. Pro samotný výpočet míry inflace používáme stejnou metodiku jako ČSÚ - porovnáváme průměrné ceny v aktuálním roce s průměrnými cenami v roce předchozím. Tento přístup pomáhá vyhlazovat krátkodobé cenové výkyvy a poskytuje stabilnější obraz o cenovém vývoji.
      </p>
      <p>
        Výsledkem je míra inflace, která lépe odpovídá vašemu spotřebnímu chování a tedy i vaší skutečné zkušenosti s růstem cen. Je důležité si uvědomit, že tato osobní míra inflace může být jak vyšší, tak nižší než oficiální míra inflace - záleží čistě na vašich spotřebních vzorcích.
      </p>
    </div>
  </div>
</template>
