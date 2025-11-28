import { Strategy, EducationalContent, Milestone, PricingPlan } from './types';

export const APP_NAME = 'Clear Mind';
export const APP_TAGLINE = 'Saia da Pornografia Agora';

export const MILESTONES: Milestone[] = [
  {
    days: 1,
    title: 'Primeiro Dia',
    description: 'Você deu o primeiro passo. A jornada começa aqui.',
    badge: '🌱'
  },
  {
    days: 7,
    title: 'Uma Semana',
    description: 'Sete dias de força e determinação. Continue firme!',
    badge: '💪'
  },
  {
    days: 30,
    title: 'Um Mês',
    description: 'Trinta dias de liberdade. Você está construindo novos hábitos.',
    badge: '🏆'
  },
  {
    days: 90,
    title: 'Três Meses',
    description: 'Noventa dias de transformação. Seu cérebro está se renovando.',
    badge: '⭐'
  },
  {
    days: 180,
    title: 'Seis Meses',
    description: 'Meio ano de vitórias. Você é mais forte do que imagina.',
    badge: '👑'
  },
  {
    days: 365,
    title: 'Um Ano',
    description: 'Um ano completo. Você reconquistou sua vida.',
    badge: '🔥'
  }
];

export const ADDICTION_TYPES = [
  {
    id: 'porn',
    name: 'Pornografia',
    icon: '🔞',
    description: 'Supere o vício em conteúdo adulto e reconquiste sua sexualidade saudável'
  },
  {
    id: 'social',
    name: 'Redes Sociais',
    icon: '📱',
    description: 'Liberte-se do scroll infinito e recupere seu tempo e atenção'
  },
  {
    id: 'gaming',
    name: 'Jogos',
    icon: '🎮',
    description: 'Equilibre o entretenimento digital com uma vida produtiva'
  },
  {
    id: 'gambling',
    name: 'Apostas',
    icon: '🎰',
    description: 'Pare de perseguir perdas e reconstrua sua estabilidade financeira'
  },
  {
    id: 'alcohol',
    name: 'Álcool',
    icon: '🍺',
    description: 'Recupere o controle e construa uma vida sem dependência química'
  },
  {
    id: 'smoking',
    name: 'Cigarro/Vape',
    icon: '🚬',
    description: 'Respire livre e recupere sua saúde pulmonar'
  },
  {
    id: 'shopping',
    name: 'Compras Compulsivas',
    icon: '🛍️',
    description: 'Controle impulsos de consumo e recupere sua saúde financeira'
  },
  {
    id: 'food',
    name: 'Comida',
    icon: '🍔',
    description: 'Desenvolva uma relação saudável com alimentação'
  }
];

export const STRATEGIES: Strategy[] = [
  {
    id: '1',
    title: 'Identifique Seus Gatilhos',
    description: 'Reconheça situações, emoções ou ambientes que desencadeiam o comportamento. Mantenha um diário para mapear padrões.',
    category: 'Autoconhecimento',
    icon: 'Brain'
  },
  {
    id: '2',
    title: 'Bloqueie o Acesso',
    description: 'Use filtros de conteúdo, apps de bloqueio e accountability software. Dificulte o acesso ao que te prejudica.',
    category: 'Prevenção',
    icon: 'Shield'
  },
  {
    id: '3',
    title: 'Exercícios Físicos Diários',
    description: 'Atividade física libera endorfinas naturais e reduz o estresse. 30 minutos por dia fazem diferença.',
    category: 'Físico',
    icon: 'Dumbbell'
  },
  {
    id: '4',
    title: 'Meditação e Mindfulness',
    description: 'Pratique 10-15 minutos de meditação diária. Aprenda a observar impulsos sem agir sobre eles.',
    category: 'Mental',
    icon: 'Brain'
  },
  {
    id: '5',
    title: 'Construa Conexões Reais',
    description: 'Invista em relacionamentos genuínos. Solidão e isolamento são gatilhos comuns para qualquer vício.',
    category: 'Social',
    icon: 'Users'
  },
  {
    id: '6',
    title: 'Substitua o Hábito',
    description: 'Quando sentir o impulso, faça algo produtivo: leia, caminhe, ligue para um amigo, pratique um hobby.',
    category: 'Comportamental',
    icon: 'RefreshCw'
  },
  {
    id: '7',
    title: 'Durma Bem',
    description: 'Sono inadequado enfraquece o autocontrole. Estabeleça uma rotina de sono consistente.',
    category: 'Físico',
    icon: 'Moon'
  },
  {
    id: '8',
    title: 'Busque Apoio Profissional',
    description: 'Considere terapia com psicólogo especializado em vícios comportamentais. Não há vergonha em pedir ajuda.',
    category: 'Suporte',
    icon: 'Heart'
  },
  {
    id: '9',
    title: 'Evite Ambientes de Risco',
    description: 'Momentos de vulnerabilidade são comuns. Identifique e evite situações que aumentam o risco de recaída.',
    category: 'Prevenção',
    icon: 'Smartphone'
  },
  {
    id: '10',
    title: 'Celebre Pequenas Vitórias',
    description: 'Cada dia limpo é uma conquista. Reconheça seu progresso e seja gentil consigo mesmo.',
    category: 'Motivação',
    icon: 'Trophy'
  },
  {
    id: '11',
    title: 'Técnica dos 5 Minutos',
    description: 'Quando sentir o impulso, espere 5 minutos fazendo outra atividade. O desejo geralmente passa.',
    category: 'Comportamental',
    icon: 'Clock'
  },
  {
    id: '12',
    title: 'Accountability Partner',
    description: 'Tenha alguém de confiança para prestar contas. Compartilhar a jornada aumenta as chances de sucesso.',
    category: 'Suporte',
    icon: 'Users'
  }
];

export const EDUCATIONAL_CONTENT: EducationalContent[] = [
  {
    id: '1',
    title: 'Como Qualquer Vício Funciona no Cérebro',
    content: `Vícios não são questão de "falta de força de vontade". São condições neurobiológicas reais que afetam o sistema de recompensa do cérebro.

**O Ciclo da Dopamina:**
Quando você se engaja no comportamento viciante, seu cérebro libera dopamina - o neurotransmissor do prazer. Com o tempo, o cérebro se adapta a esses picos artificiais, exigindo estímulos cada vez mais intensos.

**Neuroplasticidade:**
A boa notícia é que o cérebro pode se recuperar. Através da neuroplasticidade, novos caminhos neurais podem ser formados. Estudos mostram que após 90 dias de abstinência, mudanças significativas começam a ocorrer.

**Sintomas de Abstinência:**
É normal experimentar irritabilidade, ansiedade, insônia e forte desejo nos primeiros dias. Isso é seu cérebro se reajustando. Esses sintomas diminuem com o tempo.

**Todos os Vícios São Similares:**
Seja pornografia, redes sociais, jogos, álcool ou qualquer outro - o mecanismo cerebral é o mesmo. Entender isso te empodera para vencer.`,
    category: 'science'
  },
  {
    id: '2',
    title: 'Os Impactos Reais na Sua Vida',
    content: `Vícios afetam múltiplas áreas da vida:

**Relacionamentos:**
- Dificuldade em formar conexões emocionais genuínas
- Isolamento social e perda de intimidade
- Conflitos familiares e perda de confiança

**Saúde Mental:**
- Aumento de ansiedade e depressão
- Baixa autoestima e vergonha
- Perda de identidade e propósito

**Desempenho:**
- Dificuldade de concentração
- Procrastinação e perda de produtividade
- Falta de motivação para objetivos reais

**Saúde Física:**
- Fadiga crônica e baixa energia
- Distúrbios do sono
- Problemas de saúde relacionados ao vício específico

**Finanças:**
- Gastos excessivos com o vício
- Perda de oportunidades profissionais
- Endividamento

Reconhecer esses impactos é o primeiro passo para a mudança.`,
    category: 'understanding'
  },
  {
    id: '3',
    title: 'O Processo de Recuperação',
    content: `A recuperação não é linear. Haverá altos e baixos, e isso é completamente normal.

**Fases da Recuperação:**

**Semana 1-2: Desintoxicação**
Sintomas intensos de abstinência. Foco em sobreviver um dia de cada vez.

**Semana 3-4: Estabilização**
Os sintomas começam a diminuir. Você começa a sentir mais clareza mental.

**Mês 2-3: Reconstrução**
Novos hábitos começam a se formar. Você redescobre interesses e paixões.

**Mês 4-6: Transformação**
Mudanças profundas na forma como você se relaciona consigo mesmo e com os outros.

**Mês 6+: Nova Identidade**
Você não é mais alguém "lutando contra o vício", mas alguém que escolheu uma vida diferente.

**Recaídas:**
Se acontecer uma recaída, não desista. Analise o que aconteceu, aprenda com isso e recomece imediatamente. Uma recaída não apaga todo seu progresso.`,
    category: 'recovery'
  },
  {
    id: '4',
    title: 'Construindo uma Vida Significativa',
    content: `A recuperação não é apenas sobre parar um comportamento - é sobre construir uma vida tão boa que você não queira escapar dela.

**Encontre Seu Propósito:**
- O que te faz sentir vivo?
- Que contribuição você quer dar ao mundo?
- Quem você quer se tornar?

**Desenvolva Disciplina:**
A disciplina é um músculo. Comece pequeno:
- Faça sua cama todos os dias
- Exercite-se regularmente
- Mantenha compromissos consigo mesmo

**Cultive Relacionamentos:**
Humanos precisam de conexão. Invista tempo em:
- Família
- Amizades verdadeiras
- Comunidades com valores compartilhados

**Busque Crescimento:**
- Leia livros que expandem sua mente
- Aprenda novas habilidades
- Desafie-se constantemente

**Pratique Gratidão:**
Todos os dias, reconheça três coisas pelas quais você é grato. Isso rewire seu cérebro para focar no positivo.

Lembre-se: você não está apenas deixando algo para trás. Você está caminhando em direção a algo muito maior.`,
    category: 'recovery'
  },
  {
    id: '5',
    title: 'Lidando com Gatilhos Específicos',
    content: `Cada vício tem seus gatilhos únicos, mas as estratégias de enfrentamento são universais:

**Gatilhos Emocionais:**
- Estresse, ansiedade, tédio, solidão
- Estratégia: Identifique a emoção, nomeie-a, escolha uma resposta saudável

**Gatilhos Ambientais:**
- Locais, horários, dispositivos específicos
- Estratégia: Modifique seu ambiente, crie barreiras físicas

**Gatilhos Sociais:**
- Pessoas, situações sociais, pressão de grupo
- Estratégia: Comunique seus limites, busque novos círculos sociais

**Gatilhos Cognitivos:**
- Pensamentos automáticos, racionalizações, "só dessa vez"
- Estratégia: Questione seus pensamentos, use técnicas de reestruturação cognitiva

**Plano de Emergência:**
Tenha sempre um plano B, C e D para momentos de crise. Quanto mais preparado, maior sua chance de sucesso.`,
    category: 'recovery'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Essencial',
    price: 0,
    period: 'Gratuito',
    features: [
      'Contador de dias limpos',
      'Metas diárias básicas',
      'Conteúdo educacional limitado',
      'Acesso à comunidade',
      'Rastreamento de progresso básico',
      'Suporte para 1 tipo de vício'
    ]
  },
  {
    name: 'Guerreiro',
    price: 29.90,
    period: '/mês',
    highlighted: true,
    features: [
      'Tudo do plano Essencial',
      'Conteúdo educacional completo',
      'Estratégias personalizadas',
      'Sistema de accountability',
      'Diário privado ilimitado',
      'Alertas de gatilhos personalizados',
      'Suporte para múltiplos vícios',
      'Suporte prioritário',
      'Acesso a workshops mensais'
    ]
  },
  {
    name: 'Transformação',
    price: 297,
    period: '/ano',
    features: [
      'Tudo do plano Guerreiro',
      '2 meses grátis (economia de R$60)',
      'Sessão de coaching 1-on-1',
      'Plano personalizado de 90 dias',
      'Acesso vitalício a cursos',
      'Comunidade VIP exclusiva',
      'Rastreamento avançado de múltiplos vícios',
      'Certificado de conclusão',
      'Garantia de 30 dias'
    ]
  }
];

export const DAILY_GOALS = [
  {
    id: '1',
    title: 'Meditação Matinal',
    description: '10 minutos de mindfulness ao acordar',
    category: 'mental' as const
  },
  {
    id: '2',
    title: 'Exercício Físico',
    description: '30 minutos de atividade física',
    category: 'physical' as const
  },
  {
    id: '3',
    title: 'Conexão Social',
    description: 'Conversa significativa com alguém',
    category: 'social' as const
  },
  {
    id: '4',
    title: 'Leitura de Desenvolvimento',
    description: '20 minutos de leitura construtiva',
    category: 'mental' as const
  },
  {
    id: '5',
    title: 'Diário de Gratidão',
    description: 'Escrever 3 coisas pelas quais é grato',
    category: 'spiritual' as const
  }
];
