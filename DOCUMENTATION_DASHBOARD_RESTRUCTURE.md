# DOCUMENTATION - Ristrutturazione Dashboard "All Time"

## Panoramica
Completata la ristrutturazione della visualizzazione delle statistiche per la modalità "Dal 2022" (All Time). L'obiettivo era migliorare la leggibilità dei dati aggregati su più anni, che risultavano confusi nella vista precedente.

## Nuova Architettura Dashboard
La componente `MacroGoalsStats` ora distingue nettamente due modalità di visualizzazione:

### 1. Modalità "All Time" (Dal 2022)
Attivata quando si seleziona "Dal 2022" nel selettore dell'anno. Offre una panoramica di alto livello sull'intero percorso.

*   **KPI Cards Premium**:
    *   **Totale Storico**: Numero complessivo di obiettivi.
    *   **Successo Globale**: Tasso di completamento medio su tutti gli anni.
    *   **Anno Migliore**: L'anno con il tasso di successo (%) più alto.
    *   **Anno Più Produttivo**: L'anno con il maggior numero di obiettivi completati in valore assoluto.
*   **Grafico "Progressione Annuale"**:
    *   Un grafico combinato (ComposedChart) che mostra sull'asse X gli anni.
    *   **Barre**: Totale Obiettivi vs Obiettivi Completati (confronto volumi).
    *   **Linea**: Tasso di Successo % (confronto efficienza).
*   **Analisi Categorie**: Radar Chart aggregato (già ottimizzato in precedenza).
*   **Distribuzione Tipologie**: Grafico a barre orizzontali per vedere quali tipi di obiettivi (Annuali, Mensili, Settimanali) hanno avuto più successo nel tempo.

### 2. Modalità "Anno Singolo" (es. 2024)
Mantenuta la visualizzazione dettagliata precedente, focalizzata sulla granularità mensile:
*   Timeline mensile (Gen-Dic).
*   KPI specifici dell'anno (Mese migliore, trend mensile).

## Dettagli Tecnici
*   **Logica Condizionale**: Separazione netta nel render: `if (isAllTime) { ... } else { ... }`.
*   **Calcoli Aggregati**: I dati per la vista "All Time" sono raggruppati per `year` anziché per `month`.
*   **Gestione Volumi Illimitata**: Implementata logica di **paginazione ricorsiva** (chunk da 1000) per aggirare qualsiasi limite API di Supabase e caricare l'intero storico, indipendentemente dal numero (100k+).
*   **Range Dinamico**: La data di inizio ("Dal YYYY") non è più fissa al 2022 ma calcolata dinamicamente in base al primo obiettivo inserito nel database.
*   **Range Dinamico**: La data di inizio ("Dal YYYY") non è più fissa al 2022 ma calcolata dinamicamente in base al primo obiettivo inserito nel database.

## Verifica
*   Selezionare un singolo anno -> Vista classica dettagliata mensile.
*   Selezionare "Dal 2022" -> Nuova Dashboard riassuntiva annuale.
