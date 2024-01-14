# Školní systém jídelny - Frontend Only

Tato webová aplikace je navrhnuta v prostředí Node.js a slouží pro správu jídelníčku ve školní jídelně. Umožňuje studentům prohlížet si nabídku pokrmů, dobíjet kredit a objednávat jídla. Aplikace používá IndexedDB/MongoDB pro ukládání dat klienta.

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
Controller/routes řídí uživatelovy akce a reakce aplikace.
Ostatní třídy jsou podkategoriemi modelu (db).

Díky použití tohoto přístupu jsem mohl pohodlně pracovat na různých částech aplikace zároveň. Celkově to přispělo k rychlejšímu vývoji nových funkcí a zlepšení aplikace.

## Použité technologie

- **Frontend:** HTML, CSS, JavaScript
- **IndexedDB:** Pro ukládání dat klienta (nebo MongoDB)

## Instalace a spuštění

1. **Stažení kódu:**
   ```bash
   git clone hornekm@kraken.pedf.cuni.cz:/home/hornekm/public_html/Jidelna.git
   ```

2. **Otevření aplikace:**
   - Testuji NodeJS
   ```bash
   npm run devStart
   ```
   - musím si zažádat o otevřrní portu na Krakenu

## Struktura adresáře

- **models:** Datové modely pro aplikaci
- **node_modules:** Instalované balíčky npm
- **public:**  Viditelné položky
  - **img:** Obrázky
    - **meals:** Obrázky jídel
    - **menu-icons:** Ikony pro menu.
  - **javascripts:** JavaScriptové soubory pro frontend
  - **stylesheets:** Stylovací soubory pro frontend
- **routes:** Routy pro aplikaci
- **views:** 
  - **layouts:** Layouty pro pohledy
  - **meals:** Pohledy specifické pro jídla
  - **partials:** Pohledy používané v různých částech aplikace
  - **users:** Pohledy specifické pro uživatele
  - **userTypes:** Pohledy specifické pro typ uživatele
- **_Materialy:** Prvopočátek webu
- **_Specifikace:** Dokumentace
  - **ucs:** Specifikace případů užití.
  - **uc_specifikace:** Specifikace konkrétních případů užití.


## Příspěvky a vývoj

Jsem otevřen různým příspěvkům a inovacím! Pokud chcete přispět k vývoji, popište změny, které navrhujete a pošlete na e-mail hornemir@gmail.com.

## Autor

- Miroslav Hornek

## Licence

Vytvořeno v rámci studia na PedF UK (2023/2024)
