# Školní systém jídelny - Frontend Only

Tento projekt je frontendová webová aplikace navržená pro správu jídelníčku ve školní jídelně. Umožňuje studentům prohlížet nabídku jídel, dobíjet kredit a objednávat jídla. Aplikace používá IndexedDB (MongoDB) pro ukládání dat klienta.

## Funkce

- Zobrazení aktuálního jídelníčku
- Registrace a přihlášení uživatelů
- Dobíjení kreditu
- Objednávání jídel z nabídky
- Správa uživatelských účtů pro administrátory
- Nastavení jídelníčku pro jednotlivé dny

## Grafický návrh

![Layout](/_Specifikace/layout.gif)

## UseCase Diagram

![UseCase Diagram](/_Specifikace/usecase.svg)

## Textová specifikace

![UseCase Diagram](/_Specifikace/ucs/USc-1.png)

![UseCase Diagram](/_Specifikace/ucs/USc-2.png)

![UseCase Diagram](/_Specifikace/ucs/USc-3.png)

![UseCase Diagram](/_Specifikace/ucs/USc-4.png)

![UseCase Diagram](/_Specifikace/ucs/USc-5.png)

![UseCase Diagram](/_Specifikace/ucs/USc-6.png)

![UseCase Diagram](/_Specifikace/ucs/USc-7.png)

![UseCase Diagram](/_Specifikace/ucs/USc-8.png)

![UseCase Diagram](/_Specifikace/ucs/USc-9.png)

![UseCase Diagram](/_Specifikace/ucs/USc-10.png)

## Class Diagram

![Class Diagram](/_Specifikace/class.svg)

## Architektura

Pro vývoj mé aplikace jsem zvolil architekturu známou jako Model-View-Controller (MVC). Je to velice jednoduchý a snadno pochopitelný model. Kód se dá lehce upravovat díky přehledné struktuře. Jednoduše se dají přidávat i vedlejší potřebné třídy.

Model je úložiště pro data a pravidla aplikace.
View zobrazuje uživateli data z Modelu.
Controller řídí uživatelovy akce a reakce aplikace.
Ostatní třídou jsou podkategoriemi modelu (db).

Díky použití tohoto přístupu jsem mohl pohodlně pracovat na různých částech aplikace zároveň. Celkově to přispělo k rychlejšímu vývoji nových funkcí a zlepšení aplikace.

## Použité technologie

- **Frontend:** HTML, CSS, JavaScript
- **IndexedDB:** Pro ukládání dat klienta (nebo MongoDB) - otestuji

## Instalace a spuštění

1. **Stažení kódu:**
   ```bash
   git clone hornekm@kraken.pedf.cuni.cz:/home/hornekm/public_html/Jidelna.git
   ```

2. **Otevření aplikace:**
   - Otevřete soubor `index.html` ve vašem prohlížeči.
      - Testuji NodeJS
      ```bash
      npm run devStart
      ```

## Struktura adresářů

- `/css`: Obsahuje styly pro aplikaci.
- `/js`: Obsahuje JavaScriptové soubory.
    - `/js/models`: Modely pro aplikaci (např. `user.js`, `meal.js`)
    - `/js/views`: Zobrazovací logika (např. `userView.js`, `mealView.js`)
    - `/js/controllers`: Kontroléry pro řízení logiky aplikace (např. `userController.js`, `mealController.js`)
    - `/js/models/db.js`: Obsahuje logiku pro práci s IndexedDB.
    - `/js/app.js`: Spouštěcí soubor pro aplikaci, propojuje modely, views a controllery.


## Příspěvky a vývoj

Jsem otevřen různým příspěvkům a inovacím! Pokud chcete přispět k vývoji, popište změny, které navrhujete a pošlete komentář.

## Autor

- Miroslav Hornek

## Licence

Vytvořeno v rámci studia na PedF UK (2023/2024)
