# Manual Actions Required

## Post-Implementation Steps

### 1. **CRITICAL: Fix Macro Goals Logic in Database**
This is required to fix the "Future Goals Failed" bug.

1.  Go to **Supabase Dashboard** -> **SQL Editor**.
2.  Open the file I created for you: `migrations/20260129_fix_macro_goals_logic.sql`.
3.  Copy the ENTIRE content of that file.
4.  Paste it into the Supabase SQL Editor and click **RUN**.
5.  **Verify**: The function `check_and_fail_expired_goals` should be updated successfully.

### 2. **Optional: Fix Existing Broken Data**
If you have future goals that were incorrectly marked as 'failed':
1.  In Supabase SQL Editor, you can reset them to 'active' manually:
    ```sql
    UPDATE long_term_goals SET status = 'active' WHERE status = 'failed' AND year >= 2026;
    ```
    (Adjust year/logic as needed for your specific case).

### 3. Testing dello Switch AI (IMPORTANTE)
Dopo il deploy, verifica che il fix funzioni correttamente:

1. Apri l'applicazione e vai alla dashboard (`/sw/dashboard`)
2. Verifica che lo switch AI sia presente nel box "Protocollo" 
3. **Test con AI ATTIVO**:
   - Attiva lo switch AI
   - Verifica che nella barra di navigazione appaia il link "AI Coach"
4. **Test con AI DISATTIVATO**:
   - Disattiva lo switch AI
   - Verifica che il link "AI Coach" scompaia dalla barra di navigazione
5. Ripeti il test più volte per verificare che il comportamento sia consistente

### 4. Deploy to GitHub Pages
After the automatic build process completes, you need to deploy the updated version to GitHub Pages:

```bash
npm run deploy
```

### 4. PWA Update (Critical Step)
**IMPORTANT for iOS Users**:
We have applied YOUR custom uploaded icon (`pwa-icon-v5.png`).
**YOU MUST RUN `npm run deploy` FIRST!**

1.  **Delete** the existing "Mattioli.OS" app from your Home Screen.
2.  Open Safari and visit `https://simo-hue.github.io/mattioli.OS/`.
3.  Tap "Share" -> "Add to Home Screen".
4.  **Verify**: You should see your custom icon.
5.  Launch the app.

### 5. Verify in Google Search Console
Test the URL: `https://simo-hue.github.io/mattioli.OS/features`

### 6. Test All Routes
Verify that all public and app routes are working correctly.

Verify App Routes (Authentication Required):
- https://simo-hue.github.io/mattioli.OS/sw/dashboard
- https://simo-hue.github.io/mattioli.OS/sw/stats
- https://simo-hue.github.io/mattioli.OS/sw/macro-goals
- https://simo-hue.github.io/mattioli.OS/sw/ai-coach

---

## Notes
- The build script now automatically generates static HTML files for all public routes
- No additional manual steps are needed during the build process
