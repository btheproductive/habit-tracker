# DOCUMENTATION

## Logica delle Metriche (Reading Tracker)

### Gestione dei giorni non segnati (Empty States)

Nel sistema di tracciamento, la logica per i giorni non segnati è stata aggiornata per supportare il concetto di "giorni di riposo" o flessibilità:

1.  **Statistiche Generali (Percentuale):**
    -   I giorni non segnati continuano ad essere **IGNORATI** nel calcolo della percentuale di successo.
    -   Formula: `Giorni Fatti / (Giorni Fatti + Giorni Mancati)`.

2.  **Streak (Serie Consecutiva):**
    -   **Nuova Logica**: Un giorno non segnato (vuoto) **NON INTERROMPE** la serie. Viene considerato come un giorno di "riposo" o un giorno in cui l'attività non era prevista.
    -   La serie si mantiene "congelata" attraverso i giorni vuoti.
    -   **Interruzione**: La serie si azzera **SOLO** se viene registrato esplicitamente uno stato "Mancato" (rosso).

---

## Nuove Implementazioni (Statistiche Avanzate)

### Confronto Temporale (Period Comparison)
È stato aggiunto un modulo che permette di confrontare la percentuale di completamento attuale con quella del periodo precedente.
-   **Periodi supportati**: Settimana, Mese, Anno.
-   **Visualizzazione**: Mostra la variazione percentuale (es. +15%, -5%) con indicatori colorati (Verde per miglioramenti, Rosso per peggioramenti).

### Analisi Critica (Critical Analysis)
Un algoritmo analizza lo storico degli ultimi 90 giorni per identificare pattern di fallimento.
-   **Giorno Nero**: Per ogni abitudine, viene calcolato qual è il giorno della settimana con il tasso di completamento più basso.
-   **Focus**: Il sistema evidenzia automaticamente le abitudini sotto l'85% di completamento, suggerendo il giorno specifico su cui porre attenzione.

---

## Navigazione

- La pagina dedicata "Mappa" è stata rimossa.
- La visualizzazione a mappa di calore (Heatmap) è disponibile all'interno della pagina **Statistiche**.

## Bug Fixes

### Statistics Page Crash
Risolto un errore critico che causava il crash dell'applicazione all'apertura della pagina Statistiche.
- **Problema**: Il componente `StatsOverview` tentava di accedere a `globalSuccessRate` su un oggetto non definito. Questo era causato da una discrepanza tra la struttura dati "piatta" restituita dall'hook `useHabitStats` e l'oggetto annidato `globalStats` che il componente si aspettava.
- **Soluzione**: Aggiornato `src/pages/Stats.tsx` per costruire correttamente l'oggetto `globalStats` utilizzando le proprietà (`totalActiveDays`, `globalSuccessRate`, `bestStreak`, `worstDay`) prima di passarle al componente.

---

## Gestione Macro Obiettivi (Long Term Goals)

È stata implementata una sezione completa per la gestione degli obiettivi a lungo termine, ispirata alla struttura di Notion ma integrata nel database dell'applicazione.

### Struttura Dati
- **Tabella Database**: `long_term_goals`
- **Tipi supportati**: Annuali, Mensili, Settimanali.
- **Campi principali**: `user_id`, `title`, `is_completed`, `type`, `year`, `month`, `week_number`, `color`.

### Funzionalità Implementate

#### 1. Importazione ed Esportazione (Backup)
- **Esportazione**: È presente un pulsante di download che genera un file `.csv` contenente TUTTI gli obiettivi (inclusi quelli completati) per scopi di backup o analisi esterna. Include una modale di conferma.
- **Importazione**: Permette di caricare un file `.csv` per ripristinare o aggiornare i dati. Utilizza l'ID per aggiornare record esistenti (upsert) o crearne di nuovi.
- **Migrazione Dati Storici**: Sono stati importati tramite script SQL dedicati tutti gli obiettivi storici provenienti da Notion per gli anni:
    - **2022**
    - **2023**
    - **2024**
    - **2025**

#### 2. Miglioramenti UI/UX e Visualizzazione
- **Selettore Temporale Dinamico**:
    - Gli anni selezionabili partono dal **2022** fino a **5 anni nel futuro** rispetto a quello corrente (es. 2030).
    - I periodi "passati" (anni, mesi o settimane precedenti a quella attuale) sono visualizzati in **corsivo** e con colore attenuato (`text-muted-foreground`) per distinguerli chiaramente da quelli attuali o futuri.
- **Ordinamento Intelligente**:
    - Gli obiettivi **completati** vengono spostati automaticamente in fondo alla lista.
    - È stato inserito un **separatore visivo** ("COMPLETATI") con spaziatura dedicata (`my-6`) per dividere nettamente gli obiettivi attivi da quelli conclusi.

#### 3. Categorie e Colori
È stato introdotto un sistema di categorizzazione basato sui colori per raggruppare visivamente gli obiettivi affini.
- **Palette Personalizzata**: 
    - **Rosso** (Rose), **Arancione**, **Giallo** (Amber), **Blu**, **Viola**, **Rosa** (Fuchsia), **Ciano**.
    - Il colore **Verde** è stato volutamente rimosso dalle categorie selezionabili ed è **riservato esclusivamente** allo stato "Completato" (la card diventa verde pallido e opaca quando la checkbox è spuntata).
- **Dot Picker**: Ogni card ha un indicatore colorato (visibile all'hover) che permette di assegnare o cambiare rapidamente la categoria.
- **Raggruppamento**: Gli obiettivi con lo stesso colore vengono raggruppati vicini nell'ordinamento.
