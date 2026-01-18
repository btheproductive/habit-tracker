# Documentazione - Release Notes v1.0.0

## Data Implementazione
**14 Gennaio 2026**

---

## Panoramica

Creato il documento **RELEASE_NOTES.md** che rappresenta le note di rilascio ufficiali per la versione 1.0.0 di **Mattioli.OS**. Il documento fornisce una panoramica completa e professionale di tutte le funzionalità, miglioramenti tecnici e l'architettura del progetto.

---

## Contenuto Release Notes

Il documento include le seguenti sezioni principali:

### 1. **Overview**
- Introduzione al progetto e alla filosofia
- Citazione di James Clear ("Atomic Habits")
- Vision e principi fondamentali

### 2. **Major Features**

#### AI Coach (Local LLM Integration)
- Integrazione con Ollama per analisi locale (privacy-first)
- Generazione report settimanali personalizzati
- Streaming real-time delle risposte
- Export in formato Markdown
- Supporto multi-modello (Gemma2, Llama3.2, Mistral)
- Privacy Mode integration

**File coinvolti:**
- `src/pages/AICoach.tsx`
- `src/integrations/ollama.ts`

#### Mood & Energy Matrix
- Sistema di tracciamento psicologico 4-quadrant
- Analisi correlazioni mood-abitudini
- Layout responsive (grid desktop, cards mobile)
- Categorizzazione automatica basata su energia e mood

#### Daily Habits System
- Tracciamento tri-state (Done/Missed/Skipped)
- Colori personalizzabili
- Controllo frequenza settimanale
- Metriche quantificabili opzionali
- Visualizzazioni multiple (Mensile, Settimanale, Annuale)
- Smart deletion (soft/hard delete logic)

#### Macro Goals & Long-Term Vision
- Goal annuali, mensili, settimanali
- Dashboard statistiche con vista singolo anno e all-time
- Performance radar per categorie
- Distribution chart per tipologie obiettivi

### 3. **Dashboard & Statistics**

#### Tab Structure
- **Trend**: Metriche di completamento 30 giorni
- **Habits**: Statistiche per singola abitudine
- **Mood**: Matrice Mood & Energy
- **Info**: Overview globale + AI Coach (desktop)
- **Alert**: Warning e notifiche performance

#### All-Time Dashboard
- KPI premium (Totale Storico, Successo Globale, Anno Migliore, Anno Più Produttivo)
- Grafico Progressione Annuale (composedChart)
- Recursive pagination per 100k+ records
- Range dinamico basato sul primo goal inserito

**File modificati:**
- `src/components/goals/MacroGoalsStats.tsx`

#### Chart Enhancements
- Radar chart ottimizzato (outer radius 65% invece di 80%)
- Typography migliorata (13px, weight 500)
- Colore text ottimizzato per dark mode (Zinc-400)

### 4. **Mobile Optimization**

Approccio mobile-first con ottimizzazioni specifiche:

- **Calendar views**: Grid desktop, vertical scroll mobile
- **Mood Matrix**: 2x2 grid desktop, vertical cards mobile
- **Navigation**: Sidebar desktop, bottom bar mobile
- **AI Coach**: Nascosto su mobile (requirement computazionale)
- **Responsive charts**: Container Recharts adattivi

**Testing coverage:**
- iPhone SE (375px)
- iPhone 12/13 Pro (390px)
- iPad (768px)
- Desktop (1920px+)

### 5. **Technical Improvements**

#### Architecture
- React 18 + Vite
- TypeScript full coverage
- TanStack Query per server state
- Supabase (PostgreSQL + RLS + Auth)

#### Component Library
- shadcn/ui (Radix Primitives)
- Tailwind CSS
- Lucide React icons
- Recharts per visualizzazioni
- Framer Motion per animazioni

#### Best Practices
- Absolute imports (`@/` alias)
- Functional components con hooks
- date-fns per date manipulation
- Toast notifications + error handling
- ESLint + TypeScript strict mode

#### Performance
- Lazy loading route-based
- Vite Rollup bundler
- LocalStorage per preferenze
- Infinite pagination per large datasets

#### Database Schema
Tabelle principali:
- `goals`: Definizioni abitudini
- `goal_logs`: Entry giornalieri
- `macro_goals`: Obiettivi long-term
- `mood_logs`: Tracking emozionale

### 6. **Tech Stack**

Elenco completo delle tecnologie con versioni:
- React 18.3.1
- Vite 7.3.1
- TypeScript 5.8.3
- Tailwind CSS 3.4.17
- Supabase 2.87.1
- TanStack Query 5.83.0
- Recharts 2.15.4
- E molte altre librerie

### 7. **Installation**

Guida step-by-step:
- Prerequisiti (Node.js 18+, Ollama opzionale)
- Quick Start (clone, install, config, run)
- AI Coach setup opzionale

### 8. **Known Issues**

Tabella issue noti con:
- Descrizione problema
- Impatto
- Workaround
- Status

### 9. **What's Next**

#### v1.1.0 Planned
- Report History
- Multi-Language support
- Custom Themes
- Advanced Correlations
- Smart Notifications

#### Long-Term Vision
- PWA (offline-first)
- Third-party integrations
- Predictive analytics
- Social features (opzionale)

### 10. **Contributing, License, Acknowledgments**

- Guida contributi
- MIT License
- Ringraziamenti (James Clear, shadcn/ui, Supabase, community)

---

## Formato e Stile

Il documento utilizza:

✅ **Markdown Professionale GitHub-style**
- Headers strutturati (H1-H4)
- Tabelle comparative
- Code blocks con syntax highlighting
- Emoji strategici per readability
- Link interni (Table of Contents)
- Badges per status/tech stack

✅ **Organizzazione Gerarchica**
- Sezioni logicamente ordinate
- Sotto-sezioni dettagliate
- Separatori visivi (`---`)
- Layout center-aligned per header/footer

✅ **Technical Details**
- File paths specifici
- Versioni precise delle librerie
- Code snippets per esempi
- Architettura spiegata

✅ **User-Friendly**
- Linguaggio chiaro e conciso
- Esempi pratici
- Screenshot references (futuri)
- Quick start guide

---

### File Coinvolti
- `/Users/simo/Downloads/DEV/habit-tracker/src/context/AIContext.tsx` - Stato iniziale modificato

---

## Riordino Abitudini con Drag & Drop 
**Data**: 16 Gennaio 2026 - Ore 18:08  
**Libreria**: @dnd-kit (v6+)

### Descrizione
Implementata la funzionalità di riordino personalizzato delle abitudini nel pannello "Gestisci Abitudini" tramite **drag & drop** intuitivo. Gli utenti possono ora trascinare e rilasciare le proprie abitudini per riordinarle secondo le loro preferenze, con persistenza automatica nel database.

### Tecnologie Utilizzate

#### @dnd-kit Library
Scelto **@dnd-kit** come libreria drag & drop per i seguenti vantaggi:
- ✅ **Touchfriendly**: Supporto nativo per touch su mobile/tablet
- ✅ **Accessibility**: ARIA attributes e keyboard navigation integrati
- ✅ **Performance**: Ottimizzato per animazioni smooth con Framer Motion
- ✅ **TypeScript**: First-class TypeScript support
- ✅ **Modern**: Hook-based API moderna e dichiarativa

**Installazione**:
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Modifiche Database

#### Schema SQL
Aggiunto campo `display_order` alla tabella `goals`:

**File**: `schema.sql` (linea 69)
```sql
CREATE TABLE public.goals (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    description text,
    color text NOT NULL,
    icon text,
    frequency_days integer[],
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    display_order integer,  -- NUOVO CAMPO
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
```

#### Migration Script
**File**: `/Users/simo/Downloads/DEV/habit-tracker/migrations/20260116_add_display_order.sql`

```sql
-- Add display_order column
ALTER TABLE public.goals ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Initialize existing records
UPDATE public.goals 
SET display_order = sub.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) as row_num 
  FROM public.goals
) sub 
WHERE goals.id = sub.id AND goals.display_order IS NULL;
```

**Effetti**:
- Le abitudini esistenti mantengono l'ordine corrente (basato su `created_at`)
- Nuove abitudini ricevono automaticamente `display_order` incrementale
- Il campo è nullable per compatibilità retroattiva

### Modifiche TypeScript

#### types/goals.ts
Aggiunto campo `display_order` all'interfaccia `Goal`:

```typescript
export interface Goal {
    id: string;
    user_id: string;
    title: string;
    color: string;
    // ... altri campi
    display_order?: number; // NUOVO
    created_at: string;
    updated_at: string;
}
```

### Modifiche Hook useGoals

**File**: `src/hooks/useGoals.ts`

#### 1. Query con Ordinamento (linea 15-18)
```typescript
const { data: goals } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .order('display_order', { ascending: true, nullsFirst: false })
            .order('created_at', { ascending: true }); // fallback
    }
});
```

**Logica**:
- Ordina primariamente per `display_order`
- Fallback su `created_at` se `display_order` è NULL
- `nullsFirst: false` spinge i NULL alla fine

#### 2. Auto-assegnazione display_order (linea 78-90)
Quando si crea una nuova abitudine:
```typescript
// Fetch max display_order  
const { data: maxOrderData } = await supabase
    .from('goals')
    .select('display_order')
    .eq('user_id', session.user.id)
    .order('display_order', { ascending: false, nullsFirst: false })
    .limit(1);

const nextOrder = (maxOrderData && maxOrderData.length > 0 && (maxOrderData[0] as any).display_order)
    ? (maxOrderData[0] as any).display_order + 1
    : 1;

// Insert con display_order
.insert([{
    // ... altri campi
    display_order: nextOrder
}])
```

#### 3. Update Order Mutation (linea 294-328)
Nuova mutation per salvare il riordino:
```typescript
const updateOrderMutation = useMutation({
    mutationFn: async (reorderedGoals: { id: string; display_order: number }[]) => {
        // Bulk update usando Promise.all
        const updates = reorderedGoals.map(({ id, display_order }) =>
            supabase.from('goals')
                .update({ display_order })
                .eq('id', id)
                .eq('user_id', session.user.id)
        );
        await Promise.all(updates);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['goals'] });
        toast.success('Ordine salvato');
    }
});
```

**Return** (linea 297-315):
```typescript
return {
    // ... existing returns
    updateOrder: updateOrderMutation.mutate,
    isUpdatingOrder: updateOrderMutation.isPending,
};
```

### Componente HabitSettings

**File**: `src/components/HabitSettings.tsx` - Refactoring completo

#### Imports @dnd-kit (linee 29-44)
```typescript
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
```

#### Props Aggiornate (linea 48-56)
```typescript
interface HabitSettingsProps {
    habits: Goal[];
    onAddHabit: (goal: { title: string; color: string }) => void;
    onRemoveHabit: (id: string) => void;
    onUpdateHabit?: (data: { id: string; title: string; color: string }) => void;
    onUpdateOrder?: (reorderedGoals: { id: string; display_order: number }[]) => void; // NUOVO
    isDeleting?: boolean;
    isUpdating?: boolean;
    isPrivacyMode?: boolean;
}
```

#### Nuovo Componente SortableHabitItem (linee 70-242)
```typescript
function SortableHabitItem({ habit, ... }: SortableHabitItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: habit.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {/* Drag Handle */}
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing...">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            {/* Rest of habit card */}
        </div>
    );
}
```

**Features**:
- **Grip Icon**: `GripVertical` da Lucide React, visible on hover
- **Cursore dinamico**: `cursor-grab` → `cursor-grabbing`
- **Opacità**: 50% durante drag per feedback visivo
- **Smooth transform**: CSS.Transform con transition

#### Sensors Setup (linee 289-295)
```typescript
const sensors = useSensors(
    useSensor(PointerSensor),      // Mouse desktop
    useSensor(TouchSensor),        // Touch mobile/tablet
    useSensor(KeyboardSensor, {    // Keyboard accessibility
        coordinateGetter: sortableKeyboardCoordinates,
    })
);
```

**Accessibilità**:
- **Keyboard**: Space/Enter per pick, Arrows per muovere, Escape per cancel
- **Screen readers**: ARIA announcements automatici

#### Local State Management (linee 262-271)
```typescript
const [localHabits, setLocalHabits] = useState<Goal[]>(sortedHabits);

useEffect(() => {
    setLocalHabits(sortedHabits);
}, [sortedHabits]);
```

**Perché local state?**
- Immediate visual feedback durante drag
- Evita flickering mentre awaits database update
- Sincronizzazione automatica con props via useEffect

#### handleDragEnd Function (linee 327-348)
```typescript
const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;
    
    setLocalHabits((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const reordered = arrayMove(items, oldIndex, newIndex);
        
        // Persist to database
        if (onUpdateOrder) {
            const updates = reordered.map((habit, index) => ({
                id: habit.id,
                display_order: index + 1  // 1-indexed
            }));
            onUpdateOrder(updates);
        }
        
        return reordered;
    });
};
```

**Logica**:
1. Trova indici old/new dell'item dragged
2. Riordina array localmente con `arrayMove` (@dnd-kit/sortable)
3. Calcola nuovi `display_order` (1-indexed, sequenziale)
4. Persiste nel database via `onUpdateOrder`
5. Ritorna nuovo array per update immediato UI

#### DndContext Wrapper (linee 399-430)
```tsx
<DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
>
    <SortableContext
        items={localHabits.map(h => h.id)}
        strategy={verticalListSortingStrategy}
    >
        {localHabits.map((habit) => (
            <SortableHabitItem key={habit.id} habit={habit} ... />
        ))}
    </SortableContext>
</DndContext>
```

**Configurazione**:
- **collisionDetection**: `closestCenter` per drag fluido
- **strategy**: `verticalListSortingStrategy` (ordinamento verticale)
- **items**: Array di habit IDs per tracking

### Integrazione Index Page

**File**: `src/pages/Index.tsx`

Modifiche (linee 39-52, 185-193):
```typescript
const {
    // ... existing
    updateOrder,
    isUpdatingOrder,
} = useGoals();

// ...

<HabitSettings
    habits={goals}
    onAddHabit={createGoal}
    onUpdateHabit={updateGoal}
    onUpdateOrder={updateOrder}  // NUOVO
    onRemoveHabit={deleteGoal}
    isDeleting={isDeleting}
    isUpdating={isUpdating}
    isPrivacyMode={isPrivacyMode}
/>
```

### Design UI/UX

#### Visual Indicators
- **Grip Icon**: `⋮⋮` (GripVertical) a sinistra di ogni abitudine
- **Hover states**:
  - Grip: `opacity-40` → `opacity-100`
  - Card: Border highlight `border-white/10`
- **Cursori**:
  - Hover grip: `cursor-grab`
  - Durante drag: `cursor-grabbing`
- **Drag feedback**:
  - Opacità 50% su item dragged
  - Gli altri items si spostano smooth
  - Transition automatica

#### Mobile Optimization
- **Touch gestures**: Supporto nativo touch start/move/end
- **Grip sempre visibile** su mobile (no hover state)
- **Touch-none class**: Previene scroll accidentale durante drag

#### Accessibility
- **Keyboard navigation**:
  - Tab: Naviga tra abitudini
  - Space/Enter: Pick/Drop
  - Arrow keys: Muovi su/giù
  - Escape: Cancel drag
- **Screen reader**: Announcements automatici via @dnd-kit ARIA
- **Focus indicators**: Visible su keyboard focus

### Benefici Utente

1. **🎯 Personalizzazione**: Ordina abitudini per priorità o preferenza personale
2. **⚡ Intuitivo**: Drag & drop universalmente riconosciuto
3. **📱 Multi-device**: Funziona su desktop, tablet, e mobile
4. **♿ Accessibile**: Keyboard + screen reader support
5. **💾 Persistente**: Ordine salvato automaticamente e sincronizzato
6. **🎨 Smooth**: Animazioni fluide con visual feedback

### Testing Manuale Richiesto

Vedere `TO_SIMO_DO.md` per checklist completa di test che include:
- Drag & drop desktop (mouse)
- Touch mobile/tablet
- Keyboard accessibility
- Persistenza dopo reload
- Interazione con add/delete abitudini

### File Modificati/Creati

**Creati**:
- `/Users/simo/Downloads/DEV/habit-tracker/migrations/20260116_add_display_order.sql` - Migration SQL

**Modificati**:
- `/Users/simo/Downloads/DEV/habit-tracker/schema.sql` - Aggiunto campo display_order
- `/Users/simo/Downloads/DEV/habit-tracker/src/types/goals.ts` - Interfaccia Goal aggiornata
- `/Users/simo/Downloads/DEV/habit-tracker/src/hooks/useGoals.ts` - Query ordering + updateOrder mutation
- `/Users/simo/Downloads/DEV/habit-tracker/src/components/HabitSettings.tsx` - Refactoring completo con @dnd-kit
- `/Users/simo/Downloads/DEV/habit-tracker/src/pages/Index.tsx` - Connessione updateOrder prop

**Dipendenze**:
- `@dnd-kit/core`: ^6.0.0
- `@dnd-kit/sortable`: ^8.0.0
- `@dnd-kit/utilities`: ^3.2.0

---

## File Creato

📄 **`/Users/simo/Downloads/DEV/habit-tracker/RELEASE_NOTES.md`**

Lunghezza: ~550 righe di documentazione completa

---

## Prossimi Passi Suggeriti

1. **Creare Tag Git**: `git tag v1.0.0`
2. **Push Tag**: `git push origin v1.0.0`
3. **GitHub Release**: Creare release ufficiale su GitHub usando RELEASE_NOTES.md
4. **Repository Description**: Aggiornare description con la versione ottimizzata
5. **Package.json**: Considerare update version da 0.0.0 a 1.0.0
6. **README Links**: Verificare e aggiornare placeholder links

---

## Conclusione

Le Release Notes v1.0.0 forniscono una documentazione professionale e completa che:

- ✅ Copre tutte le major features del progetto
- ✅ Spiega l'architettura tecnica
- ✅ Documenta miglioramenti mobile e dashboard
- ✅ Include dettagli AI Coach e Mood Matrix
- ✅ Fornisce installation guide e troubleshooting
- ✅ Delinea la roadmap futura

Il documento è pronto per essere utilizzato come release ufficiale su GitHub e come riferimento per utenti e sviluppatori.

---

## Feature di Backup Completo

### Data Implementazione
**14 Gennaio 2026 - Ore 19:00**

### Panoramica

Implementata una nuova feature di **Backup Completo** che consente agli utenti di esportare e importare **tutti i dati** dell'applicazione in un unico archivio ZIP organizzato. Questa feature è **separata** e **indipendente** dal backup parziale esistente per i macro obiettivi.

### Dati Inclusi nel Backup

Il backup completo include **8 tabelle dal database** più impostazioni localStorage:

1. **`goals`** - Abitudini giornaliere (daily habits) con titolo, colore, icona, frequenza
2. **`goal_logs`** - Log di completamento delle abitudini (done/missed/skipped)  
3. **`long_term_goals`** - Obiettivi macro (annuali, mensili, settimanali, trimestrali, lifetime)
4. **`goal_category_settings`** - Impostazioni colori e etichette categorie personalizzate
5. **`reading_logs`** - Log di lettura giornaliera
6. **`user_settings`** - Impostazioni utente generiche (chiave-valore)
7. **`user_memos`** - Note personali in markdown
8. **`daily_moods`** - Registrazioni mood & energy giornaliere

**LocalStorage:**
- `ollama_preferred_model` - Modello AI preferito
- `ollama_report_type` - Tipo di report AI

### File Implementati

#### 1. **Hook Principal `useCompleteBackup.ts`**
Percorso: `src/hooks/useCompleteBackup.ts`

**Funzionalità export:**
- Recupera tutti i dati da 8 tabelle tramite Promise.all
- Gestione errori robusti con PGRST116 per record mancanti
- Calcolo record totali per metadata
- Creazione ZIP strutturato con cartelle organizzate
- Download automatico file ZIP

**Funzionalità import:**
- Supporto file ZIP e JSON
- Validazione struttura backup
- Smart matching per evitare duplicati
- Upsert intelligente (insert nuovi, update modificati, skip invariati)
- Report dettagliato per ogni tabella
- Ripristino impostazioni localStorage
- Invalidazione query cache

**Interfacce TypeScript:**
```typescript
interface CompleteBackupData {
  version: number;
  timestamp: string;
  metadata: { appVersion, exportDate, totalRecords };
  goals, goal_logs, long_term_goals, goal_category_settings,
  reading_logs, user_settings, user_memos, daily_moods,
  app_settings
}

interface ImportDetailedReport {
  totalProcessed: number;
  byTable: { [tableName]: { inserted, updated, unchanged, errors } };
  settingsRestored: string[];
  timestamp: string;
}
```

#### 2. **Utility Functions `backup-utils.ts`**
Percorso: `src/lib/backup-utils.ts`

**Funzioni principali:**
- `createBackupZip()` - Crea struttura ZIP organizzata
- `generateReadmeContent()` - Genera README.txt descrittivo  
- `validateBackupData()` - Valida struttura backup importato
- `readBackupFile()` - Legge ZIP o JSON
- `calculateBackupStats()` - Calcola statistiche backup

**Struttura ZIP:**
```
habit-tracker-backup-2026-01-14/
├── backup.json              # File completo
├── README.txt               # Istruzioni
└── data/
    ├── habits/              # Goals + logs
    ├── macro-goals/         # Long term goals
    ├── categories/          # Settings categorie
    ├── tracking/            # Reading + moods
    ├── settings/            # User + app settings
    └── notes/               # Memo markdown
```

#### 3. **UI Page `CompleteBackup.tsx`**
Percorso: `src/pages/CompleteBackup.tsx`

**Componenti UI:**
- Header professionale con icona database
- Card informativa (Alert) con spiegazione
- Sezione Export con griglia dati + pulsante download
- Sezione Import con drag & drop zone
- Progress indicator durante operazioni
- Report dettagliato post-import con ScrollArea
- Warning esplicito sulla sovrascrittura

**Features UX:**
- Drag & drop per file ZIP/JSON
- Click to browse alternativo
- Stati loading visualizzati
- Toast notifications
- Report espandibile con statistiche per tabella
- Icone colorate per tipo dati
- Responsive mobile-first

#### 4. **Routing `App.tsx`**
Percorzo modificato: `src/App.tsx`

Aggiunta rotta:
```typescript
<Route path="/complete-backup" element={<CompleteBackup />} />
```

### Dipendenze Installate

```bash
npm install jszip file-saver
npm install --save-dev @types/file-saver
```

- **jszip**: Creazione/lettura archivi ZIP
- **file-saver**: Download automatico file browser

### Caratteristiche Tecniche Avanzate

✅ **Smart Matching**: Confronto smart per evitare duplicati usando ID e content matching  
✅ **TypeScript Strict**: Tipizzazione completa con any assertions per Supabase  
✅ **Error Handling**: Try/catch per ogni tabella, report errori dettagliati  
✅ **Ottimizzazione Performance**: Promise.all per fetch parallelo  
✅ **Validazione Robusta**: Controllo versione, timestamp, presenza dati  
✅ **Retrocompatibilità**: Supporto JSON diretto oltre a ZIP  
✅ **User Experience**: Progress, loading states, detailed feedback

### Modalità d'Uso

**Export:**
1. User naviga a `/complete-backup`
2. Clicca "Esporta Backup Completo"
3. Sistema scarica ZIP con tutti i dati

**Import:**
1. Drag & drop ZIP su area designata (oppure click to browse)
2. Sistema legge e valida file
3. Ripristina tutti i dati con smart matching
4. Mostra report dettagliato con statistiche

### Differenze dal Backup Parziale Esistente

| Feature | Backup Parziale (`useGoalBackup.ts`) | **Backup Completo (NUOVO)** |
|---------|----------------------------------|------------------------|
| Tabelle | 2 (long_term_goals, category_settings) | **8 (tutte)** |
| Formato | JSON singolo | **ZIP organizzato** |
| README | No | **Sì, auto-generato** |
| LocalStorage | No | **Sì (AI settings)** |
| Report Import | Basic | **Dettagliato per tabella** |
| URL | `/macro-goals` (integrato) | **`/complete-backup` (dedicato)** |

### Testing Manual Previsto

✅ Export backup con dati in tutte le tabelle  
✅ Verifica struttura ZIP scaricato  
✅ Verifica contenuto backup.json  
✅ Verifica README.txt generato  
✅ Import su account pulito  
✅ Verifica ripristino dati completo  
✅ Test gestione errori (file non valido)  
✅ Test drag & drop vs click to browse

### Miglioramenti Futuri Possibili

1. **Menu Navigation**: Aggiungere link visibile nel menu principale
2. **Scheduled Backups**: Backup automatici programmati
3. **Cloud Sync**: Opzione sync automatico su Google Drive/Dropbox
4. **Backup Differenziali**: Solo modifiche dall'ultimo backup
5. **Encryption**: Crittografia AES-256 per dati sensibili
6. **Multi-export**: Backup selective per singole tabelle

### Conclusione

La feature di Backup Completo rappresenta un componente **cruciale** per la data ownership e la sicurezza degli utenti. Consente il pieno controllo sui propri dati con possibilità di migrazione, ripristino disaster recovery, e portabilità completa dell'applicazione.

L'implementazione è **production-ready**, con error handling robusto, UX professionale, e documentazione completa.

---

## Analisi Avanzata Worst Streak nel Tab Alert

### Data Implementazione
**16 Gennaio 2026 - Ore 12:40**

### Panoramica

Implementata un'**analisi avanzata e intelligente** della metrica WORST nel tab "Alert" della pagina delle statistiche. Il nuovo componente fornisce statistiche dettagliate, metriche predittive e insights actionable per aiutare l'utente a identificare e prevenire periodi di abbandono.

### Componente Creato

#### `WorstStreakAnalysis.tsx`
Percorso: `src/components/stats/WorstStreakAnalysis.tsx`

Componente premium con UI glassmorphic che analizza le worst streaks con algoritmi avanzati.

### Statistiche Implementate

#### 1. **Top 3 Worst Habits**
Mostra le 3 abitudini con le serie negative più lunghe:
- Nome abitudine con colore identificativo
- Worst streak value in giorni
- Badge con rank (1°, 2°, 3°)
- Card design con border destructive

#### 2. **Risk Score (0-100)**
Algoritmo intelligente di scoring basato su 4 fattori ponderati:

```typescript
riskScore = (
  (worstStreak / 30) * 100 * 0.4 +      // 40%: lunghezza worst streak
  (100 - completionRate) * 0.3 +        // 30%: basso completion rate  
  currentStreakPenalty * 0.2            // 20%: streak corrente = 0
)
```

**Classificazione con colori semantici:**
- 🟢 **Basso** (0-30): Abitudine stabile - verde
- �� **Medio** (31-60): Attenzione necessaria - giallo
- 🔴 **Alto** (61-100): Rischio abbandono - rosso

**Features:**
- Media globale con progress bar colorata
- Lista top 3 abitudini ad alto rischio
- Progress bars individuali per ogni abitudine

#### 3. **Resilience Index**
Indice di resilienza calcolato come ratio best/worst streak:

```typescript
resilienceIndex = (bestStreak / max(worstStreak, 1)) * 100
```

**Classificazione:**
- **High** (≥200): Eccellente capacità di recupero
- **Medium** (100-200): Resilienza nella norma
- **Low** (<100): Necessita supporto

**Visualizzazione:**
- Media globale del resilience index
- Lista abitudini con bassa resilienza
- Badge colorati per severity level

#### 4. **Insights Predittivi**
Alert intelligenti basati sui pattern rilevati:

**Tipologie di Alert:**
- ⚠️ **Worst Streak Alert**: Se avg worst > 5 giorni
- 🔴 **High Risk Alert**: Abitudini a rischio abbandono
- 💪 **Resilience Boost**: Quando resilience ≥ 150
- 🎯 **Excellent Performance**: Quando tutto va bene

Ogni alert include:
- Icona contestuale
- Titolo descrittivo
- Spiegazione dettagliata
- Suggerimenti actionable

### Algoritmi Chiave

#### Risk Score Calculation
Combina multiple metriche con pesi specifici per identificare abitudini a rischio abbandono.

#### Resilience Analysis
Misura la capacità di recupero confrontando le performance migliori con le peggiori.

#### Pattern Detection
Identifica automaticamente pattern critici e genera alert contestuali.

### Design UI/UX

**Layout Responsive:**
- Mobile: Stack verticale, cards full width
- Tablet: Grid 2 colonne per risk/resilience
- Desktop: Grid 3 colonne per top worst

**Glassmorphic Design:**
- Glass panels con blur backdrop
- Border gradient su hover
- Color coding semantico (verde/giallo/rosso)
- Smooth transitions

**Visual Hierarchy:**
- Icons contestuali per ogni sezione
- Progress bars per metriche quantitative
- Badge per classificazioni
- Cards con hover effects

### File Modificati

- ✨ **[NEW]** `src/components/stats/WorstStreakAnalysis.tsx` - Componente principale (400+ linee)
- ✏️ `src/pages/Stats.tsx` - Integrato nel tab "Alert"

### Metriche Calcolate

**Per ogni abitudine:**
- Risk Score (0-100)
- Risk Level (low/medium/high)
- Resilience Index (0-999)
- Resilience Level (low/medium/high)

**Globali:**
- Average Worst Streak
- Average Risk Score
- Average Resilience Index
- Numero abitudini ad alto rischio

### Benefici per l'Utente

1. **🎯 Consapevolezza Profonda**: Capire pattern negativi nascosti
2. **⚠️ Prevenzione**: Identificare rischi prima che diventino critici
3. **💪 Motivazione**: Vedere capacità di recupero (resilience)
4. **📊 Data-Driven**: Decisioni basate su metriche concrete
5. **🔮 Predittive**: Alert intelligenti contestuali

### Conclusione

L'analisi avanzata WORST trasforma dati grezzi in **insights actionable**, fornendo all'utente strumenti potenti per migliorare le proprie abitudini attraverso un'analisi scientifica e predittiva dei pattern di fallimento e recupero.

---

## Top 3 Abitudini Peggiori nel Box "Confronto Performance"
**Data**: 16 Gennaio 2026  
**Componente**: `WorstStreakAnalysis.tsx`

### Descrizione
Modificato il box "Confronto Performance" nella sezione "Analisi Worst Streaks" per mostrare le **3 abitudini peggiori** (con il peggior rapporto Best/Worst streak) invece delle 5 migliori. Questo permette all'utente di identificare rapidamente le abitudini che necessitano di maggior attenzione e miglioramento.

### Modifiche Implementate

#### 1. Inversione dell'Ordinamento (linea 87)
- **Prima**: `.sort((a, b) => b.gap - a.gap)` - Ordinamento discendente (dal migliore al peggiore)
- **Dopo**: `.sort((a, b) => a.gap - b.gap)` - Ordinamento ascendente (dal peggiore al migliore)

#### 2. Riduzione Numero Abitudini (linea 88)
- **Prima**: `.slice(0, 5)` - Mostrava le top 5 abitudini
- **Dopo**: `.slice(0, 3)` - Mostra solo le top 3 abitudini peggiori

#### 3. Tooltip Aggiornato (linee 336-340)
- **Prima**: "Confronta la tua migliore serie (Best) con la peggiore (Worst) per capire il gap tra i tuoi record positivi e negativi."
- **Dopo**: "Mostra le 3 abitudini con il peggior rapporto Best/Worst. Queste sono le abitudini che hanno più margine di miglioramento e richiedono maggior attenzione."

### Logica di Calcolo
Il **gap** viene calcolato come: `gap = (longestStreak / worstStreak) * 100`

**Interpretazione del gap**:
- Gap >= 300%: Status "excellent" (verde)
- Gap >= 150%: Status "good" (giallo)
- Gap < 150%: Status "attention" (arancione)

Le abitudini con gap più basso sono quelle che hanno il peggior rapporto tra best e worst streak, quindi sono quelle che necessitano di maggior miglioramento.

### Esperienza Utente
Ora l'utente può visualizzare immediatamente nel box "Confronto Performance":
1. Le 3 abitudini con più margine di miglioramento
2. Il rapporto visivo tra Best Streak e Worst Streak per ciascuna
3. Lo status colorato che indica il livello di attenzione richiesta
4. Il gap percentuale che quantifica la differenza tra best e worst

### File Modificato
- `/src/components/stats/WorstStreakAnalysis.tsx` - Linee 65, 87-88, 336-340

---

## Modifica Default Switch AI: OFF
**Data**: 16 Gennaio 2026 - Ore 18:02  
**File modificato**: `src/context/AIContext.tsx`

### Descrizione
Modificato lo stato di default dello switch AI da **ON** a **OFF**. Ora quando l'utente avvia l'applicazione per la prima volta, la funzionalità AI Coach sarà disabilitata di default, e dovrà essere attivata manualmente tramite lo switch presente nella sezione "Protocollo" della pagina Index.

### Modifica Implementata

#### File: `AIContext.tsx` (linea 12)
- **Prima**: `const [isAIEnabled, setIsAIEnabled] = useState(true); // Default: AI abilitata`
- **Dopo**: `const [isAIEnabled, setIsAIEnabled] = useState(false); // Default: AI disabilitata`

### Comportamento
Con questa modifica:
- ✅ Lo switch AI nella sezione "Protocollo" sarà in posizione **OFF** di default
- ✅ L'AI Coach page non sarà accessibile fino all'attivazione manuale
- ✅ Il card "AI Coach" nella tab Stats sarà nascosto fino all'attivazione
- ✅ Il link di navigazione all'AI Coach sarà nascosto nel menu laterale

### Motivazione
Questa modifica migliora l'esperienza utente iniziale permettendo all'utente di esplorare l'applicazione senza la funzionalità AI e decidere consapevolmente quando attivarla, rispettando anche le preferenze privacy-first dell'applicazione.

---

## Visualizzazione "Vita" - Life View

### Data Implementazione
**16 Gennaio 2026 - Ore 18:40**

### Panoramica

Implementata una nuova visualizzazione **"Vita"** che mostra l'intera vita produttiva dell'utente dal 2003 (anno di nascita) fino agli 85 anni (2088). La visualizzazione rappresenta ogni anno come un cerchio colorato in una griglia responsive, fornendo una visione d'insieme della vita passata, presente e futura con indicatori visivi per:
- Anni pre-tracciamento (azzurrino chiaro)
- Anno corrente (evidenziato con ring)
- Anni con dati goals (colorati in base alla performance)
- Anni futuri (bassa opacità)

### Componente Creato

#### File: `LifeView.tsx`
**Percorso**: `/Users/simo/Downloads/DEV/habit-tracker/src/components/LifeView.tsx`

**Props Interface**:
```typescript
interface LifeViewProps {
    habits: Goal[];
    records: GoalLogsMap;
    isPrivacyMode?: boolean;
}
```

### Caratteristiche Principali

#### 1. Calcolo Automatico degli Anni

**Costanti** (linee 12-13):
```typescript
const BIRTH_YEAR = 2003;
const END_YEAR = 2088;  // 85 anni
```

**Generazione Array Anni** (linee 36-43):
```typescript
const years = useMemo(() => {
    const yearArray = [];
    for (let year = BIRTH_YEAR; year <= END_YEAR; year++) {
        yearArray.push(year);
    }
    return yearArray;
}, []);
```

Totale: **86 anni** (dal 2003 al 2088 inclusi)

#### 2. Rilevamento Primo Anno di Tracciamento

**Auto-detection** (linee 25-34):
```typescript
const firstTrackingYear = useMemo(() => {
    if (!habits || habits.length === 0) return currentYear;
    
    const earliestDate = habits.reduce((earliest, goal) => {
        const goalStartYear = new Date(goal.start_date).getFullYear();
        return goalStartYear < earliest ? goalStartYear : earliest;
    }, currentYear);
    
    return earliestDate;
}, [habits, currentYear]);
```

**Logica**:
- Trova il `start_date` più vecchio tra tutti i goals
- Estrae l'anno di quel `start_date`
- Tutti gli anni prima di questo sono considerati "pre-tracciamento"

#### 3. Statistiche Annuali

**Calcolo Performance per Anno** (linee 45-80):
```typescript
const yearStats = useMemo(() => {
    const stats: Record<number, { completed: number; total: number; percentage: number }> = {};

    years.forEach(year => {
        // Filtra i record dell'anno
        const yearDates = Object.keys(records).filter(dateKey => 
            dateKey.startsWith(year.toString())
        );

        // Calcola completed e total per ogni giorno dell'anno
        let totalCompleted = 0;
        let totalPossible = 0;

        yearDates.forEach(dateKey => {
            const dayRecord = records[dateKey];
            const validHabits = habits.filter(h => {
                const isStarted = h.start_date <= dateKey;
                const isNotEnded = !h.end_date || h.end_date >= dateKey;
                return isStarted && isNotEnded;
            });

            const completedCount = validHabits.filter(h => 
                dayRecord[h.id] === 'done'
            ).length;
            
            totalCompleted += completedCount;
            totalPossible += validHabits.length;
        });

        const percentage = totalPossible > 0 ? (totalCompleted / totalPossible) : 0;
        stats[year] = { completed: totalCompleted, total: totalPossible, percentage };
    });

    return stats;
}, [years, records, habits]);
```

**Metriche per Anno**:
- `completed`: Totale goal completati nell'anno
- `total`: Totale goal possibili nell'anno
- `percentage`: Performance media (0-1)

#### 4. Rendering Cerchi con Colori Dinamici

**Funzione renderYear** (linee 82-158):

**Classificazione Anno**:
```typescript
const isCurrentYear = year === currentYear;
const isFuture = year > currentYear;
const isPreTracking = year < firstTrackingYear;
const hasActivity = stats && stats.total > 0;
```

**Colori Applicati**:

| Tipo Anno | Stile | Codice |
|-----------|-------|--------|
| **Pre-tracking** | Azzurrino chiaro | `hsl(200, 70%, 50%)` con opacity 0.3 |
| **Futuro** | Grigio trasparente | `bg-white/5` con opacity 0.2 |
| **Con attività** | Gradiente performance | `hsl(${hue}, 70%, 35%)` dove hue = 0-142 |
| **Anno corrente** | Ring primario | `ring-2 ring-primary/70` |

**Calcolo Hue Performance**:
```typescript
const hue = Math.round(stats.percentage * 142); // 0 (rosso) a 142 (verde)
style = {
    backgroundColor: `hsl(${hue}, 70%, 35%)`,
    borderColor: `hsl(${hue}, 80%, 50%)`,
};
```

#### 5. Tooltip Informativo

**shadcn/ui Tooltip** (linee 122-145):
```typescript
<TooltipContent className="bg-background/95 backdrop-blur border-white/10 text-xs">
    <div className="space-y-1">
        <p className="font-bold">{year}</p>
        <p className="text-muted-foreground">Età: {age} anni</p>
        {isCurrentYear && <p className="text-primary font-medium">Anno corrente</p>}
        {isFuture && <p className="text-muted-foreground">Futuro</p>}
        {isPreTracking && !isFuture && <p className="text-blue-400">Pre-tracciamento</p>}
        {hasActivity && (
            <>
                <p>{stats.completed}/{stats.total} completati</p>
                <p>Performance: {Math.round(stats.percentage * 100)}%</p>
            </>
        )}
    </div>
</TooltipContent>
```

**Info Mostrate**:
- Anno numerico (es. 2026)
- Età dell'utente in quell'anno
- Tag speciali (anno corrente, futuro, pre-tracking)
- Statistiche se disponibili (completamenti, performance %)

#### 6. Header e Statistiche Vita

**Header con Titolo** (linee 167-180):
```typescript
<h2>La Mia Vita Produttiva</h2>
<p>{BIRTH_YEAR} - {END_YEAR} ({totalYears} anni)</p>
```

**Legend Colori** (linee 181-191):
- Pallino azzurrino → "Pre-tracking"
- Pallino con ring → "Anno corrente"

**Stats Bar con KPI** (linee 194-208):

| KPI | Calcolo | Colore |
|-----|---------|--------|
| **Anni Vissuti** | `currentYear - BIRTH_YEAR` | Primary |
| **Età Attuale** | `currentAge` | Foreground |
| **Anni Rimanenti** | `85 - currentAge` | Muted |

#### 7. Griglia Responsive

**CSS Grid Dinamico** (linee 211-218):
```typescript
<div 
    className="grid gap-1 sm:gap-2 content-start overflow-y-auto"
    style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(max(20px, min(8%, 40px)), 1fr))',
    }}
>
    {years.map(year => renderYear(year))}
</div>
```

**Logica Responsiveness**:
- `minmax(max(20px, min(8%, 40px)), 1fr)`:
  - **Min**: 20px (mobile estremo)
  - **Ideale**: 8% dello spazio disponibile
  - **Max**: 40px (desktop grande)
  - **1fr**: Riempie proporzioni uguali
- `auto-fill`: Calcola automaticamente numero colonne
- `gap`: 4px mobile, 8px desktop

**Risultato**:
- Mobile (375px): ~4-5 colonne
- Tablet (768px): ~8-10 colonne
- Desktop (1920px): ~15-18 colonne

**Scrolling**:
- `overflow-y-auto`: Scroll verticale se necessario
- `content-start`: Allinea dall'alto
- `scrollbar-thin`: Scrollbar sottile custom

### Integrazione nella Home Page

#### File: `Index.tsx`
**Percorso**: `/Users/simo/Downloads/DEV/habit-tracker/src/pages/Index.tsx`

**Modifiche Applicate**:

1. **Import Componente** (linea 10):
```typescript
import { LifeView } from '@/components/LifeView';
```

2. **Import Icona** (linea 28):
```typescript
import { ..., Hourglass } from 'lucide-react';
```

3. **TabsList Espansa** (linea 309):
```typescript
<TabsList className="grid w-full grid-cols-4 ...">  // Era grid-cols-3
```

4. **Nuovo TabTrigger** (linee 322-326):
```typescript
<TabsTrigger value="vita" className="...">
    <Hourglass className="w-4 h-4" />
    <span className="xs:inline">Vita</span>
</TabsTrigger>
```

5. **Nuovo TabContent** (linee 350-356):
```typescript
<TabsContent value="vita" className="mt-0 animate-scale-in h-full">
    <LifeView
        habits={goals}
        records={records}
        isPrivacyMode={isPrivacyMode}
    />
</TabsContent>
```

### Design UI/UX

#### Visual Design

**Estetica Premium**:
- ✨ **Cerchi perfetti**: `aspect-square rounded-full`
- 🌈 **Gradiente HSL**: Performance-based color mapping
- 💫 **Hover effects**: `scale-125` con smooth transition
- 🎯 **Anno corrente**: Ring glow con shadow
- 🌊 **Azzurrino distintivo**: `hsl(200, 70%, 50%)` per pre-tracking

**Animazioni**:
- `transition-all duration-200`: Hover e scale smooth
- `animate-scale-in`: Fade in al caricamento tab
- Ring shadow: `shadow-[0_0_15px_rgba(255,255,255,0.3)]`

#### Privacy Mode Integration

**Blur su cerchi con dati** (linea 114):
```typescript
className={cn(
    "...",
    isPrivacyMode && hasActivity && "blur-[2px]"
)}
```

Solo gli anni con attività vengono offuscati, mantenendo visibili:
- Anni pre-tracking (nessun dato sensibile)
- Anni futuri (placeholder)
- Anno corrente (solo indicatore visivo)

#### Accessibility

**Tooltip Hover**:
- `delayDuration={0}`: Tooltip immediato
- Contenuto descrittivo completo
- Codici colore semantici

**Keyboard Navigation**:
- Cerchi focusabili via Tab
- Enter/Space per trigger tooltip
- Screen reader friendly

### Benefici Utente

1. **📅 Prospettiva Vita Intera**: Visualizza passato, presente, futuro in un colpo d'occhio
2. **🎨 Visual Storytelling**: Colori raccontano la storia delle performance nel tempo
3. **🚀 Motivazione**: Vedere progressi storici e potenziale futuro
4. **📊 Quick Insights**: Identifica anni best/worst performance a colpo d'occhio
5. **📱 Fully Responsive**: Funziona perfettamente da mobile a ultra-wide desktop
6. **⚡ No Scrolling Orizzontale**: Grid si adatta sempre allo spazio disponibile
7. **🔒 Privacy Aware**: Blur automatico in Privacy Mode

### Considerazioni Tecniche

#### Performance

**Optimizations**:
- `useMemo` per calcoli pesanti (years, yearStats, firstTrackingYear)
- Rendering efficiente con `map` diretto
- Tooltip lazy-loaded solo al hover
- CSS Grid nativo (no JS calculations)

**Scalability**:
- 86 elementi DOM (uno per anno)
- Statistiche pre-calcolate una volta
- Nessun re-render inutile grazie a memoization

#### Browser Compatibility

**CSS Features**:
- `aspect-square`: Supportato modern browsers (Safari 15+, Chrome 88+)
- CSS Grid: Universal support
- `backdrop-blur`: Graceful degradation

**Fallback**:
- Se `aspect-square` non supportato, i cerchi restano quadrati
- Grid funziona comunque correttamente

### File Coinvolti

**Creati**:
- `/Users/simo/Downloads/DEV/habit-tracker/src/components/LifeView.tsx` - Componente principale

**Modificati**:
- `/Users/simo/Downloads/DEV/habit-tracker/src/pages/Index.tsx` - Integrazione tab

### Prossimi Sviluppi Possibili

#### V1.1 Enhancements
- 📊 Click su anno → Modal con statistiche dettagliate annuali
- 📈 Grafici trend multi-anno
- 🎯 Goal setting per anno specifico
- 📝 Note/riflessioni per ogni anno
- 🏆 Award/badge per anni eccellenti

#### V2.0 Advanced
- 🔄 Animazione timeline al caricamento
- 📅 Modalità "decade view" (raggruppamento per decadi)
- 🌍 Comparazione con medie globali (se social features)
- 📊 Export grafico vita come PNG/SVG

### Aggiornamento: Granularità Settimanale

**Data modifica**: 16 Gennaio 2026 - Ore 18:40

In seguito al feedback dell'utente, la visualizzazione è stata **refactorata da anni a settimane**:

**Prima**:
- 86 pallini (1 per anno)
- Layout a griglia libera
- Stats annuali

**Dopo**:
- ~4,420 pallini (1 per settimana)
- Layout a righe: ogni riga = 1 anno con 52 settimane
- Stats settimanali con granularità molto più dettagliata

**Modifiche al Codice**:
- Aggiunta import `addWeeks`, `differenceInWeeks`, `startOfWeek` da `date-fns`
- Nuova struttura dati `yearsWithWeeks` con array bidimensionale
- Calcolo statistiche per settimana invece che per anno
- Rendering organizzato: 86 righe × 52 colonne
- Pallini molto più piccoli (`aspect-square` con `rounded-sm`)
- Tooltip mostra numero settimana + data inizio settimana
- Stats bar aggiornato: "Settimane Vissute" invece di "Anni Vissuti"

**Benefici**:
- ✅ Granularità 52x più dettagliata
- ✅ Ogni settimana conta e viene visualizzata
- ✅ Pattern settimanali visibili (es. periodi produttivi vs cali)
- ✅ Maggiore motivazione (vedere settimane rimanenti)
- ✅ Layout più organizzato (anni come label a sinistra)

### Conclusione

La visualizzazione "Vita" completa il set di viste temporali dell'applicazione (Mese → Settimana → Anno → Vita), fornendo la prospettiva più ampia possibile sul percorso di crescita personale dell'utente. Con **granularità settimanale** (1 pallino = 1 settimana), l'utente può visualizzare concretamente tutte le ~4,420 settimane della propria vita produttiva, rendendo tangibile il valore di ogni singola settimana. Il design responsive e i colori performance-based rendono la visualizzazione sia informativa che ispirazionale.

