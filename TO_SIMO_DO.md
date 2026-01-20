
# TO_SIMO_DO

## 🚀 Azioni Prioritarie (Google Search Console & SEO)

> [!IMPORTANT]
> **Risposta alla tua domanda su GSC:**
> Anche se hai già la proprietà per `simo-hue.github.io`, è **fortemente consigliato** aggiungere una nuova proprietà specifica per `simo-hue.github.io/mattioli.OS` come **Prefisso URL**.
> Questo permette a Google di indicizzare correttamente il sottocartella come un "sito" distinto e ti da dati molto più precisi.

### 1. Configurazione Google Search Console
1.  Vai su [Google Search Console](https://search.google.com/search-console).
2.  Clicca su "Aggiungi proprietà" (in alto a sinistra).
3.  Scegli il tipo **Prefisso URL** (a destra).
4.  Inserisci l'URL completo: `https://simo-hue.github.io/mattioli.OS/`
5.  Clicca "Continua". Probabilmente verrà verificata automaticamente dato che possiedi già il dominio principale.

### 2. Invio Sitemap
1.  Nella dashboard della nuova proprietà `mattioli.OS`.
2.  Nel menu a sinistra, clicca su **Sitemap**.
3.  In "Aggiungi una nuova sitemap", scrivi: `sitemap.xml`
4.  Clicca **Invia**.
5.  Dovresti vedere lo stato "Riuscito" (potrebbe volerci qualche minuto o giorno per l'elaborazione completa).

### 3. Deploy Aggiornamenti
Ho aggiornato `robots.txt`, `sitemap.xml` e i meta tag in `index.html`. Devi caricare queste modifiche.

```bash
git add .
git commit -m "feat: seo optimization, sitemap and robots.txt"
git push
```

Dopo il push, attendi che la Action di GitHub Pages finisca il deploy.

---

## 📝 Storico Task Manuali

- [ ] Verificare che la favicon si veda correttamente in produzione (ho aggiornato il path).
- [ ] Controllare che il link Canonico in `index.html` sia corretto ispezionando la pagina live.