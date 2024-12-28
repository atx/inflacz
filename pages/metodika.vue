<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      Metodika výpočtu
    </h1>
    
    <div class="prose prose-blue max-w-none">
      <p>
        Inflacka používá oficiální data o vývoji cen jednotlivých složek spotřebního koše,
        publikovaná Českým statistickým úřadem. Na rozdíl od celkové míry inflace ale
        umožňuje přizpůsobit váhy jednotlivých položek podle skutečné struktury výdajů
        konkrétní domácnosti.
      </p>

      <h2>Jak počítáme inflaci?</h2>
      <p>
        Výpočet personalizované míry inflace probíhá v následujících krocích:
      </p>
      <ol>
        <li>Uživatel zadá své měsíční výdaje a jejich rozdělení do hlavních kategorií</li>
        <li>Systém vypočítá váhy jednotlivých kategorií</li>
        <li>Podle zadaných vah a meziročních změn cen jednotlivých kategorií je vypočtena
            personalizovaná míra inflace</li>
      </ol>

      <h2>Zdroje dat</h2>
      <p>
        Používáme oficiální data o vývoji spotřebitelských cen publikovaná ČSÚ.
        Data jsou aktualizována měsíčně.
      </p>
    </div>
  </div>
</template>