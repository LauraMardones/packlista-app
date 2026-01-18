\# OpenAI Codex CLI - Implementation Specs



> Detaljerade specs för att implementera Packlista PWA med OpenAI Codex CLI.

> 

> \*\*Workflow\*\*: Kör varje spec i Codex CLI terminal, kom tillbaka till Claude för review mellan phases.



---



\## 🎯 Phase 1: Project Setup



\### Spec 1.1: Create Vite + React + TypeScript Project



Kör i Codex CLI:



```bash

codex "Create a new React + TypeScript PWA project in C:\\Users\\LauraMardones\\Dev\\packlista-app



Requirements:

1\. Use npm create vite@latest . -- --template react-ts

2\. Install dependencies: npm install

3\. Add TailwindCSS:

&nbsp;  - npm install -D tailwindcss postcss autoprefixer

&nbsp;  - npx tailwindcss init -p

&nbsp;  - Configure tailwind.config.js content: \['./index.html', './src/\*\*/\*.{js,ts,jsx,tsx}']

&nbsp;  - Add @tailwind directives to src/index.css



4\. Add Zustand: npm install zustand

5\. Add UUID: npm install uuid \&\& npm install -D @types/uuid



6\. Clean up:

&nbsp;  - Remove App.css, logo.svg

&nbsp;  - Clear App.tsx to simple component

&nbsp;  - Keep index.css with Tailwind



7\. Test: npm run dev (should work)



Project structure:

\- src/App.tsx (clean)

\- src/main.tsx

\- src/index.css (with Tailwind)

\- package.json

\- vite.config.ts

\- tailwind.config.js"

Expected: Working Vite + React + TypeScript + TailwindCSS + Zustand



---



\## 🎯 Phase 2: Data \& Types

\### Spec 2.1: Create TypeScript Types

codex "Create src/types/packlist.ts with these TypeScript types:



```typescript

export type Category = 'bad' | 'elektronik' | 'traning' | 'golf' | 'hygien' | 'ovrigt' | 'forberedelser' | 'klader' | 'barbershop';



export const CATEGORY\_LABELS: Record<Category, { emoji: string; name: string }> = {

&nbsp; bad: { emoji: '🏖️', name: 'Bad/Strand' },

&nbsp; elektronik: { emoji: '💻', name: 'Elektronik' },

&nbsp; traning: { emoji: '💪', name: 'Träning' },

&nbsp; golf: { emoji: '⛳', name: 'Golf' },

&nbsp; hygien: { emoji: '🧴', name: 'Hygien' },

&nbsp; ovrigt: { emoji: '🎒', name: 'Övrigt' },

&nbsp; forberedelser: { emoji: '🏠', name: 'Förberedelser' },

&nbsp; klader: { emoji: '👗', name: 'Kläder' },

&nbsp; barbershop: { emoji: '🎵', name: 'Barbershop' },

};



export interface PacklistItem {

&nbsp; id: string;

&nbsp; name: string;

&nbsp; category: Category;

&nbsp; checked: boolean;

&nbsp; quantity?: number;

&nbsp; notes?: string;

}



export interface Packlist {

&nbsp; id: string;

&nbsp; name: string;

&nbsp; selectedCategories: Category\[];

&nbsp; items: PacklistItem\[];

&nbsp; createdAt: Date;

&nbsp; updatedAt: Date;

}



export interface MasterlistItem {

&nbsp; name: string;

&nbsp; category: Category;

}



Add JSDoc comments for all types."





---



\### Spec 2.2: Create Masterlist Data (ALL 144 ITEMS!)



```bash

codex "Create src/data/masterlist.ts with ALL 144 items from user's packlista:



Import MasterlistItem and Category from types.



Export const MASTERLIST: MasterlistItem\[] with ALL these items:



Bad/Strand (8): Badkläder, Simglasögon, Luftmadrass, Solkräm, Stand-Up Paddle (SUP), Sarong/Pareo, Badskor/Vattenskor, Dykdräkt/Våtdräkt



Elektronik (18): Extern hårddisk, Grenuttag/Förlängningskabel, Telefon + hörlurar + laddare, Surfplatta/Tablet + kablar + tangentbord, Chromecast + laddare, Hörlurar, Kamera + laddare + batteri, Dator + kablar, Värmefilt, iPod + laddare + hörlurar, Bankkort + fodral, Billaddare, Poddar/e-tidningar/Netflix, Selfie stick, USB-hubb för laddning, Mobil-stativ, Extern högtalare



Träning (6): Träningskläder (underkläder, strumpor), Träningsskor, Sportklocka + armband + laddare, Träningsbyxor, Träningströjor, Träningshandskar



Golf (4): Regnskydd, Golfklubbor \& golfbag, Golfbollar + tee + handske, Golfskor



Hygien (18): Schampo \& balsam, Duschsandaler, Hårtork, Tandborste + tandkräm, Deodorant, Sandaler/Tofflor, Babyolja, Bomullstoppar och rondeller, Ansiktskräm \& ansiktsrengöring, Borste kam, Parfym, Handsprit, Fast tvål, Rakapparat/Epilator



Övrigt (32): Solglasögon, Stödstrumpor, Handarbete (broderi/stickning/virkning), Böcker, Flygkit, Dokument, Kort, Medicin/antihistamin, Handdukar, Myggmedel, Plånbok, Smink, Sportutrustning, Spel, Kikare, Lakan, Sötningsmedel, Liten kudde, Smycken, Nycklar, Mat/Snacks, Sykit, Termos, Glasögon + kontaktlinser, Hatt



Förberedelser (8): Rulla ihop terrassmatta, Slänga sopor, Diska, Koppla ur kontakter, Stänga av vatten, Vattna växter / lämna hos mamma, Ladda batterier/apparater, Kolla vädret



Kläder (28): Festskor, Strumpbyxor, Kjolar, Underställ/Linnen, Västar/Koftor, Festtopp, Klänningar, Pyjamas, Shorts, Bälten, Stövlar, Kappa / jacka, Byxor, Skor, Mössa, Vantar/Handskar, Leggings / tights, Tröjor, Strumpor, Arbetsskor, T-shirts, Vardagstopp, Trosor / underkläder



Barbershop (22): Svensk flagga / Svergetröja, Sminkborttagning, Smycken, Handväska (backstage), Scenklänning/Scenkläder, Bling, Scensmink, Säkerhetsnålar, Vattenflaska, Visualiseringsövningar, Torrschampo, Locktång, Hårnålar (svarta), Hårnät, Lockrullar (varma), Ögonfranslim, Specialkam, Lösfransar, Spray/Nebulisator, Sprayflaska (vatten), Hårspray



Use exact Swedish names, correct categories. Add comment with item count per category."



---



\## 🎯 Phase 3: Zustand Store \& Logic

\### Spec 3.1: Create Zustand Store

codex "Create Zustand store in src/store/packlistStore.ts:



State:

\- currentList: Packlist | null

\- selectedCategories: Category\[]



Actions:

\- createList(name, categories) - Generate items from MASTERLIST, remove duplicates by name, add IDs

\- addItem(item) - Add custom item

\- removeItem(id) - Remove item

\- toggleItem(id) - Toggle checked

\- clearChecked() - Remove all checked items

\- resetList() - Clear everything

\- updateListName(name) - Update name

\- selectCategories(categories) - Update categories, regenerate items



Persistence:

\- Save to LocalStorage on every change

\- Load from LocalStorage on init

\- Key: 'packlista-current-list'



Helper (internal):

\- generateItemsFromCategories(categories) - Filter MASTERLIST, remove duplicates, add id (uuid) and checked: false



Use Zustand v4 patterns. Import MASTERLIST. Add TypeScript types."



---



\## 🎯 Phase 4: React Components

\### Spec 4.1: Category Selector

codex "Create src/components/CategorySelector.tsx:



Props: selected: Category\[], onChange: (categories: Category\[]) => void



UI:

\- Grid of checkboxes (2 cols mobile, 3 tablet, 4 desktop)

\- Each shows emoji + name from CATEGORY\_LABELS

\- Show item count from MASTERLIST

\- Select All / Deselect All buttons

\- Highlight selected categories

\- TailwindCSS styling, mobile-friendly



Make it beautiful and interactive!"



\### Spec 4.2: Packlist Item Component

codex "Create src/components/PacklistItem.tsx:



Props: item: PacklistItem, onToggle: (id) => void, onDelete: (id) => void



UI:

\- Checkbox (left)

\- Item name (center, strikethrough when checked)

\- Delete button (right, red trash icon)

\- Smooth animations

\- TailwindCSS

\- Large touch targets for mobile"



\### Spec 4.3: Category Section Component

codex "Create src/components/PacklistCategory.tsx:



Props: category: Category, items: PacklistItem\[], onToggleItem, onDeleteItem



UI:

\- Header: emoji + name (from CATEGORY\_LABELS)

\- Item count (X checked / Y total)

\- Progress bar

\- List of PacklistItem components

\- Collapsible (click header to expand/collapse)

\- Smooth animations

\- TailwindCSS"



\### Spec 4.4: List Creator

codex "Create src/components/ListCreator.tsx:



No props (uses store directly)



UI:

\- Input for list name

\- CategorySelector component

\- Preview: 'X items will be added'

\- Create button (disabled if no name or categories)

\- Centered, responsive layout

\- TailwindCSS



On create: call store.createList(name, categories)"



\### Spec 4.5: Packlist View

codex "Create src/components/PacklistView.tsx:



Props: packlist: Packlist



UI:

\- Header with list name

\- Stats (X / Y checked, progress %)

\- Action buttons (Clear checked, Edit name, Reset)

\- Category sections (using PacklistCategory)

\- FAB to add custom item

\- Empty state



Use store actions for all interactions.

Group items by category (groupByCategory util).

TailwindCSS, mobile-friendly."



\### Spec 4.6: Main App

codex "Update src/App.tsx:



Logic:

\- Get currentList from usePacklistStore()

\- If no list: show ListCreator

\- If list exists: show PacklistView



UI:

\- App header/title

\- Conditional rendering

\- Responsive layout

\- TailwindCSS



Keep it minimal and clean."



---



\## 🎯 Phase 5: PWA Setup (Optional)

\### Spec 5.1: PWA Manifest

codex "Create public/manifest.json:



{

&nbsp; \\"name\\": \\"Packlista\\",

&nbsp; \\"short\_name\\": \\"Packlista\\",

&nbsp; \\"description\\": \\"Interaktiv packlista\\",

&nbsp; \\"start\_url\\": \\"/\\",

&nbsp; \\"display\\": \\"standalone\\",

&nbsp; \\"background\_color\\": \\"#ffffff\\",

&nbsp; \\"theme\_color\\": \\"#3b82f6\\",

&nbsp; \\"icons\\": \[

&nbsp;   { \\"src\\": \\"/icon-192.png\\", \\"sizes\\": \\"192x192\\", \\"type\\": \\"image/png\\" },

&nbsp;   { \\"src\\": \\"/icon-512.png\\", \\"sizes\\": \\"512x512\\", \\"type\\": \\"image/png\\" }

&nbsp; ]

}



Create placeholder icons (blue squares with 📦).

Link in index.html."



\### Spec 5.2: Service Worker

codex "Create public/service-worker.js:



Cache-first strategy for static assets.

Cache static files on install.

Clean old caches on activate.

Register in src/main.tsx.



Standard PWA service worker pattern."



✅ Verification

After each phase:



npm run dev

npx tsc --noEmit

npm run build



📊 Token Savings

With Codex CLI: ~10,000 Claude tokens (reviews only)

Without Codex: ~60,000+ tokens

Savings: 83%! 🎉



🚀 Ready to Start!

Open Codex CLI terminal

Start with Phase 1, Spec 1.1

Come back to Claude for review after each phase

Enjoy your token savings!



