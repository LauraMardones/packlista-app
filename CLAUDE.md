# Packlista PWA

> En interaktiv packliste-app som Progressive Web App, med offline-stöd och kombinerbara resemallar.

## Projektet

**Syfte**: Skapa en packlista-app för resor med barbershop-kvartett/kör, golf, strand, träning, etc.

**Tech Stack**:
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Zustand (state management)
- IndexedDB (offline storage)
- PWA (Service Worker, manifest)

**Unik Feature**: Kombinerbara kategorier - välj flera aktiviteter (ex: Barbershop + Strand + Stad) och få en sammanslagen packlista.

## ⚡ Token Optimization Workflow

**VIKTIGT**: Detta projekt använder hybrid-workflow för att spara Claude tokens.

### Terminals
\\\
Terminal 1 (Claude Code): Architecture + Review
Terminal 2 (Codex CLI):    Implementation + Tests
\\\

### När ska jag använda vilket?

**Claude Code:**
- 🧠 Arkitektur & design
- 🧠 Problem analysis
- 🧠 Code review
- 🧠 PWA best practices
- 🧠 State management design

**OpenAI Codex CLI:**
- ✅ ALL komponenter (React)
- ✅ TypeScript types/interfaces
- ✅ Zustand store implementation
- ✅ TailwindCSS styling
- ✅ Service Worker setup
- ✅ PWA manifest
- ✅ IndexedDB wrapper

**Tumregel**: Kodning → Codex CLI | Reasoning → Claude Code

## Data Model

### Categories (9 total)
1. **bad** - Bad/Strand (8 items)
2. **elektronik** - Elektronik (18 items)
3. **traning** - Träning (6 items)
4. **golf** - Golf (4 items)
5. **hygien** - Hygien (18 items)
6. **ovrigt** - Övrigt (32 items)
7. **forberedelser** - Förberedelser före resa (8 items)
8. **klader** - Kläder (28 items)
9. **barbershop** - Barbershop uppträdande (22 items)

**Total**: 144 items

## Nästa Steg

1. **Codex CLI**: Se CODEX-SPECS.md för detaljerade implementation-specs
2. **Codex CLI**: Skapa projekt setup (Vite + React + TypeScript)
3. **Codex CLI**: Implementera TypeScript types & masterlist data
4. **Codex CLI**: Skapa komponenter & Zustand store
5. **Claude**: Review implementation
6. **Codex CLI**: PWA setup (Service Worker, manifest)

**Token Strategy**: 80% Codex CLI (kodning) + 20% Claude (reasoning) = 70-80% färre tokens! 🎉
