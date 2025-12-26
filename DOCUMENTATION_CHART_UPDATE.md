# DOCUMENTATION - Miglioramento Grafico Radar

## Panoramica
Ottimizzata la visualizzazione del grafico "Performance Categorie" (Radar Chart) nella pagina delle statistiche Macro Obiettivi per risolvere problemi di leggibilità delle etichette (label tagliati).

## Modifiche Apportate

### `src/components/goals/MacroGoalsStats.tsx`
*   **Ridimensionamento Grafico**: Ridotto il raggio esterno (`outerRadius`) del `RadarChart` dall'**80%** al **65%**. Questo crea più spazio "respiro" tra il grafico e i bordi del contenitore, prevenendo il troncamento delle etichette delle categorie lunghe.
*   **Stile Etichette**:
    *   Aumentata la dimensione del font da 12px a **13px** per migliore leggibilità.
    *   Aumentato il peso del font da normal a **500 (medium)** per far risaltare meglio il testo sullo sfondo scuro.
    *   Aggiornato il colore del testo a `#a1a1aa` (Zinc-400) per un migliore contrasto nel tema dark, mantenendo coerenza con il design system.
*   **Refactoring Minore**: Aggiunto tipizzazione esplicita `(value: number)` nel formatter del Tooltip per pulizia del codice.

## Verifica
Il grafico ora dovrebbe mostrare tutte le etichette delle categorie interamente visibili all'interno della card, anche per nomi di media lunghezza.
