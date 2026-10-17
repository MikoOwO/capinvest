# Capinvest Partners — site vitrine

Page d'accueil de Capinvest Partners, en français (`/`) et en anglais (`/en`). Elle reproduit la maquette validée
« Capinvest Partners — Site / Page d'accueil » : mêmes couleurs, typographies, espacements, animations et
comportements responsive. Quatre écarts volontaires par rapport à la maquette :

- les chiffres clés restent alignés (« +1 Md€ » passait sur deux lignes et décalait la rangée) : leur taille suit la
  largeur de leur colonne et ils ne reviennent plus à la ligne ;
- le texte grisé de la colonne « négociant de titres » est légèrement assombri (`#6B7686` → `#657080`) pour
  atteindre le contraste AA (4,6:1 au lieu de 4,3:1) ;
- le menu burger prend le relais jusqu'à 1 260 px (au lieu de 1 180) : en français, la navigation débordait de la page
  entre 1 181 et 1 240 px ;
- le lien « M-Solutions » du pied de page est souligné pour qu'on le repère.

Site statique, **sans dépendance** (Node ≥ 20 suffit), plus une fonction serveur pour le formulaire de contact.

## Commandes

```bash
npm run build   # génère dist/ (index.html, en.html, assets)
npm run dev     # build puis aperçu sur http://localhost:3000 (/ et /en)
npm test        # parité FR/EN, rendu, fonction de contact
```

## Structure

```text
src/template.html        balisage de la page (styles en ligne repris de la maquette), commun aux deux langues
src/content/fr.mjs       tous les textes et données en français (langue source)
src/content/en.mjs       traduction anglaise — mêmes clés, même structure
src/render.mjs           blocs répétés (chiffres clés, filtres, opérations, parcours…)
src/styles.css           polices, survols, animations, états des composants
src/site.js              menu mobile, onglets, expertise, filtres, formulaire
build.mjs                src/ + public/ → dist/ ; génère aussi robots.txt et sitemap.xml
public/                  logo, photo (WebP + PNG), image de partage, polices auto-hébergées (+ licence OFL), favicon
api/contact.js           fonction Vercel : envoi du formulaire par e-mail (Resend)
vercel.json              build, URLs propres (/en), en-têtes de sécurité et de cache
```

### Modifier un texte

Éditer `src/content/fr.mjs` **et** `src/content/en.mjs`, puis `npm run build`. `npm test` échoue si une clé, un
élément de liste ou une opération (catégorie, année) manque dans l'une des deux langues.

## Déploiement sur Vercel

1. Vercel → **Add New… → Project** → importer `MikoOwO/capinvest`, branche `main`.
2. Aucun réglage à changer : `vercel.json` fournit la commande de build (`node build.mjs`) et le dossier de
   sortie (`dist`). Framework : *Other*.
3. **Variables d'environnement** (Settings → Environment Variables) :

   | Variable | Rôle |
   |---|---|
   | `RESEND_API_KEY` | clé API d'un compte [Resend](https://resend.com) — **sans elle, le formulaire répond « échec »** |
   | `CONTACT_TO_EMAIL` | boîte qui reçoit les demandes (plusieurs adresses séparées par des virgules) |
   | `CONTACT_FROM_EMAIL` | expéditeur, ex. `Capinvest Partners <site@votre-domaine>` (domaine vérifié chez Resend). Par défaut : l'expéditeur de test de Resend, qui n'écrit qu'au titulaire du compte |
   | `SITE_URL` | **à définir dès que le domaine définitif est branché**, ex. `https://capinvest.com` (sans elle, l'URL `*.vercel.app` du projet sert de référence au SEO) |

4. Domaine : Settings → Domains.

Le formulaire n'affiche « Demande envoyée » que si l'envoi a réussi ; en cas d'échec (service non configuré,
Resend indisponible), le visiteur voit un message d'erreur. Un champ piège invisible écarte les robots.

## SEO

Appliqué d'après le skill [`seo` de web-quality-skills](https://github.com/addyosmani/web-quality-skills). Mesuré avec
Lighthouse sur les deux pages : **SEO 100, accessibilité 100, bonnes pratiques 100, performance 99**.

- `<title>` et `meta description` propres à chaque langue (≤ 160 caractères), `lang`, viewport, `robots`
  (`max-image-preview:large`).
- `canonical`, `hreflang` fr / en / x-default et `og:url` en URL absolue, Open Graph et Twitter Card avec une image de
  partage 1200×630 (`public/og-image.png`).
- Données structurées JSON-LD `Organization` (fondateur, année de création, zones et domaines d'expertise) : uniquement
  des faits présents sur la page, aucun contact ni réseau social inventé.
- `robots.txt` (autorise tout, sauf `/api/`) et `sitemap.xml` avec les deux langues et leurs alternates, générés au
  build. Les balises à URL absolue, le sitemap et le JSON-LD apparaissent dès que `SITE_URL` (ou le domaine Vercel)
  est connu : un build local ne les produit pas.
- Hiérarchie de titres propre (un `h1`, puis `h2` / `h3`), `alt` descriptifs, photo servie en WebP (14 Ko au lieu de
  151 Ko), logo d'en-tête chargé en priorité (c'est l'élément LCP), contenu des 28 opérations présent dans le HTML.
- Non fait volontairement : `llms.txt` (expérimental, à ajouter seulement sur demande).

**Après la mise en ligne** : ajouter le domaine dans Google Search Console, y soumettre `/sitemap.xml`, et valider le
JSON-LD avec le [Rich Results Test](https://search.google.com/test/rich-results). Le résultat d'indexation et de
positionnement dépend du moteur de recherche et ne peut pas être garanti.

## Reste à renseigner

- **Mentions légales** et **Politique de confidentialité** : les liens du pied de page pointent encore vers
  le haut de page, comme dans la maquette. Les pages et leur contenu juridique restent à fournir.
- **LinkedIn** : l'icône du pied de page pointe vers le haut de page (maquette) ; l'URL du profil reste à fournir.

## Crédits

Réalisé par [M-Solutions](https://melik.zaanouni.com). Polices Montserrat et IBM Plex Sans, licence SIL OFL 1.1
(`public/fonts/LICENSE.txt`).
