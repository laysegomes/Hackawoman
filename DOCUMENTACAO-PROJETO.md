# CuidaDelas · GuardIA — Documento Descritivo do Projeto

> Documento-base para materiais de comunicação e para o roteiro do pitch comercial (até 3 min).
> Repositório: `Hackawoman` · Natureza: protótipo de hackathon (funcional, navegável).

---

## 1. Resumo executivo

**CuidaDelas** é, à primeira vista, um aplicativo comum de saúde da mulher: acompanhamento de ciclo, lembretes, medicamentos, conteúdo educativo e análises de bem-estar. Mas dentro dele existe uma **camada invisível chamada GuardIA** — um espaço protegido, acessível apenas por um **gesto secreto + PIN**, criado para apoiar mulheres em situação de **violência patrimonial** (uma das cinco formas de violência previstas na Lei Maria da Penha).

A grande ideia é o **disfarce como proteção**: uma mulher que convive com o agressor não pode ter no celular um app óbvio de "denúncia" ou "violência doméstica" — isso a colocaria em risco. O CuidaDelas resolve isso escondendo o apoio dentro de algo cotidiano e inofensivo. Se o agressor exigir ver o aplicativo, um **PIN de disfarce** abre apenas a tela neutra de saúde, garantindo **negação plausível**.

Em uma frase: **um app de saúde da mulher por fora, uma rede de proteção e autonomia financeira por dentro.**

---

## 2. O problema

A violência doméstica no Brasil é massiva e persistente, e a **dependência financeira é uma das principais correntes** que prendem a mulher ao ciclo de violência.

- **1.492 feminicídios em 2024** — o maior número da série histórica; 8 em cada 10 mortas por (ex-)companheiro e 64% dentro de casa. *(19º Anuário Brasileiro de Segurança Pública — FBSP, 2025)*
- **3,7 milhões de brasileiras** sofreram violência doméstica/familiar nos últimos 12 meses. *(DataSenado, 11ª Pesquisa Nacional, 2025)*
- **3 em cada 10 mulheres (≈25,4 milhões)** já sofreram violência doméstica ao longo da vida. *(DataSenado, 2023)*
- **61% das brasileiras dizem que a dependência financeira impede a denúncia**; 17,1% já foram impedidas de trabalhar ou estudar; 10% não têm acesso ao próprio dinheiro. *(DataSenado, 2023)*
- **A maioria não denuncia**: 62% nunca solicitaram medida protetiva. *(DataSenado, 2025)*
- **Apenas 19%** das mulheres afirmam conhecer bem a Lei Maria da Penha. *(DataSenado, 2025)*

### A violência que quase ninguém nomeia
A **violência patrimonial** — Lei 11.340/2006, **art. 7º, inciso IV** — é definida como "reter, subtrair, destruir parcial ou totalmente objetos, instrumentos de trabalho, documentos pessoais, bens, valores, direitos ou recursos econômicos" da mulher. Na prática: **controlar o dinheiro dela, esconder seus documentos, fazer dívidas em seu nome, destruir seus bens**. Foi citada por **34% das mulheres que já sofreram violência** *(DataSenado, 2023)* e, mesmo assim, é a forma menos reconhecida e menos denunciada — muitas vítimas sequer sabem que aquilo é crime.

**O nó do problema:** sem dinheiro, sem documentos e sem informação, a mulher não consegue sair. E não pode buscar ajuda abertamente porque o agressor vigia seu celular.

---

## 3. A solução

O CuidaDelas ataca exatamente esse nó com três decisões de design:

1. **Disfarce (o app existe à vista de todos)** — a fachada é um app de saúde legítimo e completo, sem nada que denuncie sua função real.
2. **Acesso oculto com negação plausível** — a área de proteção só aparece por gesto secreto + PIN principal; um **PIN de disfarce** abre a tela neutra, protegendo a mulher sob coação.
3. **Foco em autonomia, não só em denúncia** — além de informar direitos e organizar provas, o app **orienta a mulher a reconstruir independência financeira** (como montar uma reserva de emergência, checklist de autonomia, rede de apoio) — atacando a causa que mais prende a mulher ao ciclo. *(É orientação e acompanhamento — o app não é banco nem movimenta dinheiro.)*

---

## 4. Como funciona (jornadas do usuário)

### 4.1 A fachada — CuidaDelas (camada pública)
Tema claro, rosa/lilás, linguagem de autocuidado. Telas implementadas:
- **Início**: saudação, "agenda de cuidados", avisos de saúde pública e dicas do dia.
- **Agenda/Calendário**: calendário de ciclo e lembretes, com fases e classificação de dias.
- **Saúde da mulher**: conteúdo educativo (saúde hormonal, física, mental, prevenção), sinais de atenção e dicas.
- **Análises**: painéis de bem-estar (check-ins, sono, constância, humor, energia).
- **Mais**: perfil, minha saúde, lembretes, medicamentos, objetivos, conteúdos educativos, configurações, **privacidade**, ajuda, sobre.

A seção **Privacidade** é a ponte: é onde a usuária configura, de forma discreta, o PIN principal, o **PIN de disfarce** e o **gesto secreto** que abrem a GuardIA.

### 4.2 A passagem secreta
- **Gesto secreto**: por exemplo, **tocar 3× no ícone da flor** na barra inferior (opções alternativas: segurar o "+" por 3s, tocar 5× no título).
- **Tela de PIN** (tema escuro, marca "GuardIA"):
  - **PIN principal** → abre a GuardIA real.
  - **PIN de disfarce** → abre a home neutra do CuidaDelas (negação plausível).
  - PIN errado → erro e limpeza do campo.
- No protótipo: gesto = 3 toques na flor; PIN principal `1234`; disfarce `0000`.

### 4.3 A GuardIA (camada protegida)
Tema escuro, linguagem de acolhimento ("Você está segura aqui"). Seis pilares:

| Módulo | O que faz |
|---|---|
| **Converse com a IA** | Chat de acolhimento e triagem; começa perguntando se ela está em local seguro e encaminha para os recursos certos. |
| **Entenda seus direitos** | Explica, em linguagem simples, o que é violência patrimonial (controle financeiro, retenção de documentos, dívidas no nome dela, destruição de bens). |
| **Organize suas provas** | Cofre de evidências criptografado: documentos, prints, áudios, fotos e anotações, organizados por tipo — sem deixar rastros na galeria do celular. |
| **Plano de segurança** | Questionário curto que **gera um plano personalizado e dinâmico** (ex.: usar o PIN de disfarce perto do agressor, ligar 180, procurar a Defensoria, iniciar reserva). |
| **Apoio jurídico** | Encontra atendimento próximo (Defensoria Pública, ONGs, advogada voluntária), com detalhes de documentos, horários e como funciona. |
| **Reserva de segurança** | Ferramenta **educativa e de acompanhamento** (não é conta bancária e não movimenta dinheiro): orienta como construir uma reserva de emergência, ajuda a definir uma meta possível (a partir de R$ 5/semana) e permite que ela **registre manualmente** quanto conseguiu guardar, para acompanhar o próprio progresso. Inclui um checklist de autonomia (ex.: abrir conta digital própria, guardar contatos importantes). |

Recursos de segurança previstos (área "Mais"): **bloqueio automático, ocultar notificações, apagar após 5 tentativas erradas, modo pânico, backup criptografado, recuperação por frase secreta**. Central de ajuda com **Ligue 180** (Central de Atendimento à Mulher — gratuito, sigiloso, 24h) e **190** (emergência policial). Em qualquer tela, um botão **"Voltar ao CuidaDelas"** permite saída rápida.

---

## 5. Diferenciais e inovação

- **Disfarce dentro de um app de saúde, com foco em violência patrimonial.** Já existem no Brasil apps de segurança com "modo disfarce"/decoy (ex.: *Todas por Uma*, que simula uma loja; apps com "modo camuflado"), mas eles miram **acionamento de emergência e rota de fuga**. Nenhum combina **disfarce + violência patrimonial + reconstrução de autonomia financeira** dentro de um app de saúde feminina — um espaço de diferenciação claro. *(a validar com análise competitiva aprofundada)*
- **Negação plausível de verdade** (PIN de disfarce) — pensado para o cenário real de vigilância pelo agressor.
- **Da denúncia para a autonomia** — trata a causa (dependência financeira), não só o sintoma.
- **Plano de segurança personalizado e acionável**, não um folheto genérico.
- **Linguagem de cuidado, não de burocracia** — reduz a barreira de "apenas 19% conhecem a lei".

---

## 6. Arquitetura técnica (estado atual)

- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS; ícones `lucide-react`. Gerenciado com `pnpm`.
- **Estrutura**: SPA mobile-first (moldura de ~430px, formato de celular). Toda a experiência vive na feature `src/features/meu-ciclo/`:
  - `MeuCicloApp.tsx` — orquestra o roteamento por estado (`Screen`) e todas as telas das duas camadas.
  - `components/HealthModule.tsx` — layout e navegação inferior da camada pública (inclui o botão-flor do gesto secreto).
  - `components/GuardIAModule.tsx` — layout e navegação inferior da camada protegida.
  - `types.ts` — união de tipos de todas as telas (`Screen`).
- **Navegação**: máquina de estados simples (sem router externo); a transição de tema (claro↔escuro) reforça a mudança de contexto entre as camadas.
- **Persistência**: apenas `localStorage` para marcar se a privacidade já foi configurada.
- **Importante — é um protótipo de UX**: dados são simulados (mock); ciclo, provas, chat e criptografia são **encenados para demonstração**. Não há backend, IA real, criptografia real ou autenticação de produção ainda. Isso é esperado para um hackathon e deve ser tratado como **prova de conceito navegável**.

---

## 7. Público-alvo

- **Usuária primária**: mulheres em situação de violência patrimonial/doméstica, muitas vezes coabitando com o agressor e sob vigilância do celular — de qualquer classe, com destaque para as de maior vulnerabilidade financeira.
- **Usuária "de cobertura"**: qualquer mulher interessada em saúde e autocuidado (a fachada precisa ter valor real e base de uso legítima — o que também protege quem usa a camada oculta).
- **Ecossistema de apoio**: Defensorias, ONGs, advogadas voluntárias, redes de proteção e órgãos públicos (180, CRAS).

---

## 8. Contexto de mercado

- **Femtech (saúde da mulher)** é um mercado em forte expansão — estimativas de imprensa apontam mercado global na casa das dezenas de bilhões de dólares e crescimento de dois dígitos ao ano. *(diversas fontes de imprensa/consultoria — ⚠️ números variam; validar fonte primária antes de citar em pitch)*
- **Apps de proteção com disfarce** já são uma categoria reconhecida no Brasil, o que valida a demanda — e ao mesmo tempo deixa aberto o nicho de **autonomia patrimonial disfarçada**.
- A fachada de saúde dá ao produto um **canal de distribuição e aquisição legítimo** (lojas de apps, saúde pública, campanhas femininas) sem expor a função sensível.

---

## 9. Segurança, privacidade e ética

**Princípios de design já presentes ou previstos:**
- Disfarce + PIN de disfarce (negação plausível).
- Cofre de provas separado da galeria; backup criptografado; recuperação por frase secreta.
- Bloqueio automático, ocultação de notificações, apagar após tentativas erradas, modo pânico.
- Saída rápida para a fachada em qualquer tela.
- Canais oficiais integrados (180 sigiloso 24h; 190; Defensoria).

**Considerações éticas para evolução (a endereçar antes de produção):**
- Criptografia e segurança **reais** (o protótipo apenas encena).
- Cuidado para que a organização de provas tenha **validade jurídica** e não gere risco adicional.
- IA de acolhimento com protocolos de crise e limites claros (não substitui profissional).
- Testes com especialistas em violência de gênero e com sobreviventes, com segurança da usuária como prioridade absoluta.

---

## 10. Estado atual e evolução sugerida

**Hoje (protótipo):** fluxo completo e navegável das duas camadas, com dados simulados — pronto para demonstração e pitch.

**Próximos passos sugeridos:**
1. Backend seguro + criptografia ponta-a-ponta real do cofre e dos dados.
2. IA de acolhimento/triagem real, com curadoria e protocolos de segurança.
3. Base geográfica de serviços de apoio (Defensorias, ONGs) por município.
4. Parcerias institucionais (Ministério das Mulheres, Defensorias, ONGs) e validação com sobreviventes.
5. Fachada de saúde robusta o suficiente para sustentar uma base de uso real.

---

## 11. Matéria-prima para o pitch (mensagens-chave)

**Gancho / dor:** "3,7 milhões de brasileiras sofreram violência doméstica no último ano. E 61% dizem que o dinheiro — não a falta de coragem — é o que as impede de denunciar."

**Vilão invisível:** a violência patrimonial — controlar o dinheiro, esconder documentos, fazer dívidas no nome dela. Crime pela Lei Maria da Penha, mas quase ninguém a reconhece.

**A tensão do celular:** ela não pode ter um app de "denúncia" no telefone — o agressor vigia.

**A virada (solução):** CuidaDelas parece um app de saúde. Por dentro, com um gesto secreto, vira a GuardIA — direitos, provas, plano de segurança, apoio jurídico e orientação para montar uma reserva de emergência. E se ele pedir para ver? Um PIN de disfarce abre só a tela de saúde.

**Diferencial:** não é só um botão de pânico. É o caminho da **autonomia** — a única saída sustentável do ciclo.

**Fechamento / visão:** dar a milhões de mulheres uma porta de saída que cabe no bolso, escondida à vista de todos.

> **Números prontos para citar (com fonte):** 1.492 feminicídios em 2024 (FBSP, 2025) · 3,7 mi de vítimas em 12 meses (DataSenado, 2025) · 61% travadas pela dependência financeira (DataSenado, 2023) · violência patrimonial citada por 34% (DataSenado, 2023) · só 19% conhecem bem a Lei Maria da Penha (DataSenado, 2025).

---

## 12. Fontes

- Lei 11.340/2006 (Lei Maria da Penha), art. 7º, IV, e arts. 18/24 — Planalto.
- 19º Anuário Brasileiro de Segurança Pública — FBSP, 2025.
- DataSenado — Pesquisa Nacional de Violência contra a Mulher (10ª ed., 2023; 11ª ed., 2025).
- gov.br/mulheres — Ligue 180.
- IPEA; UnB/Andifes (2025) — dependência financeira e ciclo de violência.
- TJDFT (Direito Fácil) — violência patrimonial.
- Reportagens (Agência Brasil, TechTudo) — apps de proteção com modo disfarce (*Todas por Uma*, "modo camuflado").

> ⚠️ Dados marcados no texto e os de mercado femtech devem ter a fonte primária confirmada antes de uso público. Detalhamento na pesquisa de contexto que embasou este documento.
