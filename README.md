# Bokamoso Elisha Noma: website

A static website for **Bokamoso Elisha Noma Development Skills and Other Projects**. It's plain HTML, CSS and JavaScript, so there's no build step: open `index.html` in a browser to view it, or upload the folder to any web host.

## Pages

| Page | File | Main audience |
|---|---|---|
| Home | `index.html` | Everyone: routes interns, funders and community to the right page |
| About | `about.html` | Community, funders: story, name, approach, other projects, team, governance |
| Internship | `internship.html` | Prospective interns: what you learn, who qualifies, journey, FAQs |
| Apply | `apply.html` | Prospective interns: application form |
| Partner with us | `partner.html` | Investors and funders: model, impact, ways to give, accountability |
| Contact | `contact.html` | Everyone: details, enquiry form, map |

```
assets/css/styles.css   all styling (colours and fonts are tokens at the top)
assets/js/main.js       menu, scroll animations, forms, draft mode (settings at the top)
assets/img/             logo-mark.svg (traced logo), logo.svg (logo + name), favicon.svg, boko.jpg (original logo)
```

## Draft mode

The site is in **draft mode** while we wait for information from Bokamoso:

- A yellow banner at the top tells reviewers what the highlighting means.
- Every missing fact is wrapped in `<span class="tbc">…</span>` and highlighted in yellow.

To find everything still missing, search the HTML files for `class="tbc"`.

## Before going live

1. **Fill in every `tbc` item** (see the checklist below), then remove the `tbc` spans.
2. **Turn off draft mode.** In `assets/js/main.js`, set `draft: false`.
3. **Connect the forms.** Create a free form at [formspree.io](https://formspree.io) (or similar), then paste its URL into `formEndpoint` in `assets/js/main.js`. Until you do, the forms show a thank-you message but **nothing is sent**: the message says "Preview mode", and the browser console logs a warning.
4. **Swap the stock photos for real ones.** The site uses free Unsplash photos (see [Photos](#photos)) that load from the web. Once Bokamoso sends real photos, put them in `assets/img/` and change the `src` and `alt` of the `<img>` inside each photo frame. Each frame's `data-label` says what photo belongs there. Frames without an image (the team portraits) show a green placeholder until you add one:
   ```html
   <div class="photo photo--portrait" data-label="Photo: founder">
     <img src="assets/img/founder.jpg" alt="Jane Doe, founder of Bokamoso">
   </div>
   ```
5. **Logo.** The mark in the header and footer is a vector trace of Bokamoso's logo (`assets/img/boko.jpg`), saved as `assets/img/logo-mark.svg`. It's inlined in every page so the footer can show lighter colours on the dark background (`.brand__grey` and `.brand__green` in `styles.css`). If Bokamoso has the original vector file (AI, EPS, SVG or PDF), use it instead. `assets/img/favicon.svg` (the browser-tab icon) is the same mark in a round white badge.
6. **Match the exact brand greens.** These are the `--green-*` tokens at the top of `styles.css`.
7. **Partner logos** (`partner.html`): replace the dashed "Partner logo" boxes with real logos, but only with each partner's permission.

## Content checklist

These map to the discovery questionnaire. ✅ = already used on the site.

| # | Item | Where it appears |
|---|---|---|
| P1 | One-line description. **Draft for approval:** *"We give TVET students and graduates real, hands-on office experience in administration, bookkeeping, compliance and auditing, so they can step into the workplace with confidence."* | Home hero |
| P2 | ✅ Vundla St, Moroka, Soweto. Still need the **street number** | Contact, footer |
| P3 | ✅ Founded 2018. Still need **founder name and story** | About |
| P4 | **NPO number**, **PBO number**, **Section 18A** status | Footer, About, Partner |
| P5 | Story behind **"Elisha Noma"**; confirm **Bokamoso = "the future"** in Setswana/Sesotho | About |
| P6 | Internship **length**, **full-time or part-time** | Internship (at a glance, FAQ) |
| P7 | **Stipend**: yes/no, amount, who pays | Internship (at a glance, FAQ) |
| P8 | **Certificate / reference / accreditation** | Internship (at a glance, FAQ) |
| P9 | ✅ TVET students. Still need **age, area, year-of-graduation rules** and **documents required** | Internship, Apply |
| P10 | **Selection process and timing** after applying | Internship (journey), Apply sidebar |
| P11 | **Interns trained to date**, **interns per year** | Home and Partner stats |
| P12 | **% now working, studying or self-employed** | Home and Partner stats |
| P13 | ✅ Practical work at the office | Internship |
| P14 | **Team names, roles, bios, photos**; **board members** | About |
| P15 | **Current funders** and **funding needs**, **cost per intern**, **how funds are spent** | Partner |
| P16 | Confirm the **partnership options** shown: sponsor an intern, fund the programme, hire graduates, share skills. Also **banking details** and the **partner contact person** | Partner, Home CTA |
| P17 | **Other projects**: names, descriptions, which are active | About |
| P18 | Real **photos** (stock photos stand in for now, see [Photos](#photos)) and an **intern testimonial** (with permission) | Whole site, Home quote |
| P19 | ✅ Logo traced from `boko.jpg`. Its colours are green `#3E6530`, grey `#5A5A5C` and orange `#DE873A`. Still need the **original vector logo**, and confirmation of whether the site palette should switch to these shades | Design |
| P20 | **Phone, email, WhatsApp, office hours, social links** | Contact, footer |

### Copy I wrote that Bokamoso should check

These aren't flagged in yellow because they follow from what we know, but they're my wording, not theirs:

- Descriptions of the six skill areas (Home and Internship).
- The intern checklist ("You're ready to show up, learn and take on real tasks") and the FAQ answers that aren't highlighted.
- Values on the About page: learning by doing, close to home, work-ready.
- "South Africa has one of the highest youth unemployment rates in the world" (Partner page). This is a widely reported fact. Add a current Stats SA figure if they want a number.

## Photos

The site loads these free photos from Unsplash under the [Unsplash License](https://unsplash.com/license): free for commercial use, no attribution required. They are stand-ins for Bokamoso's own photos. They show models, not Bokamoso's interns or staff, so replace them before launch where a visitor could take them as real (especially the home hero and the About story).

| Where | Shows | Unsplash page |
|---|---|---|
| Home hero | Young woman at an office desk | [View on Unsplash](https://unsplash.com/photos/young-woman-working-at-a-desk-in-an-office--ZRtrH-RubE) |
| Home impact background | Orlando Towers, Soweto | [View on Unsplash](https://unsplash.com/photos/a-couple-of-tall-towers-sitting-in-the-middle-of-a-field-KocFuwHUlIE) |
| About: our story | Team working around a table | [View on Unsplash](https://unsplash.com/photos/woman-using-macbook-KAULAzQwxzE) |
| About: Proudly Soweto | Orlando Towers murals | [View on Unsplash](https://unsplash.com/photos/3-women-standing-on-green-grass-field-during-daytime-IhuzPxyBunQ) |
| Internship hero | Two people working at a laptop | [View on Unsplash](https://unsplash.com/photos/man-using-black-laptop-computer-kwzWjTnDPLk) |
| Partner: why it matters | Group meeting around a long table | [View on Unsplash](https://unsplash.com/photos/group-of-people-sitting-beside-rectangular-wooden-table-with-laptops-faEfWCdOKIg) |

The team portraits and the intern testimonial avatar have no stock photos on purpose. A stranger's face above a named founder or quoted intern would misrepresent real people.

To serve the photos from your own host instead of Unsplash, download each one, save it in `assets/img/`, and point the `src` at the local file.

## Hosting

Any static host works. For example: Netlify or Cloudflare Pages (drag and drop the folder), GitHub Pages, or the NGO's existing cPanel hosting (upload the files to `public_html`).
