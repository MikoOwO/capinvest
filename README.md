# Capinvest Partners — site vitrine

Page d'accueil de Capinvest Partners, en français (`/`) et en anglais (`/en`). Elle reproduit à l'identique la
maquette validée « Capinvest Partners — Site / Page d'accueil » : mêmes couleurs, typographies, espacements,
animations et comportements responsive. Rendu comparé à la maquette dans Chromium à 1 440 px et à 390 px :
identique au pixel près, hormis le soulignement du lien M-Solutions du pied de page (ajouté pour qu'il se voie).

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
build.mjs                src/ + public/ → dist/
public/                  logo, photo, polices auto-hébergées (+ licence OFL), favicon, robots.txt
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
   | `SITE_URL` | facultatif, ex. `https://capinvest.com` : ajoute `canonical`, `hreflang` et `og:url` |

4. Domaine : Settings → Domains.

Le formulaire n'affiche « Demande envoyée » que si l'envoi a réussi ; en cas d'échec (service non configuré,
Resend indisponible), le visiteur voit un message d'erreur. Un champ piège invisible écarte les robots.

## Reste à renseigner

- **Mentions légales** et **Politique de confidentialité** : les liens du pied de page pointent encore vers
  le haut de page, comme dans la maquette. Les pages et leur contenu juridique restent à fournir.
- **LinkedIn** : l'icône du pied de page pointe vers le haut de page (maquette) ; l'URL du profil reste à fournir.
- **Image de partage** (Open Graph) : aucune dans la maquette, donc aucune sur les réseaux sociaux.

## Crédits

Réalisé par [M-Solutions](https://melik.zaanouni.com). Polices Montserrat et IBM Plex Sans, licence SIL OFL 1.1
(`public/fonts/LICENSE.txt`).
