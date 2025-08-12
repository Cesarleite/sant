
  import React, { useState } from 'react';
  import { MapPin, Clock, Package, AlertCircle, Plus, Trash2, Check, Navigation, Calendar, Heart, BookOpen, Mountain, Compass } from 'lucide-react';
  import { Button } from '@/components/ui/button.jsx';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
  import { Badge } from '@/components/ui/badge.jsx';
  import { Input } from '@/components/ui/input.jsx';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
  import { Progress } from '@/components/ui/progress.jsx';
  import './App.css';
  import './index.css';

  const SantiagoAssistant = () => {
    const [currentTab, setCurrentTab] = useState('roteiro');
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentDay, setCurrentDay] = useState(1);
    const [walkingSpeed, setWalkingSpeed] = useState(5); // km/h

    // Roteiro oficial Caminho Português Central
    const caminhoPortugues = [
      { cidade: 'Porto', hospedagem: 'The Passenger Hostel', destino: 'Vairão / Fajozes', destinoHospedagem: 'A casa da estrela', distancia: 28, dia: 1, data: '14/09/2025' },
      { cidade: 'Vairão / Fajozes', hospedagem: 'A casa da estrela', destino: 'Barcelos', destinoHospedagem: 'Bagoeira Hotel Restaurante', distancia: 19, dia: 2, data: '15/09/2025' },
      { cidade: 'Barcelos', hospedagem: 'Bagoeira Hotel Restaurante', destino: 'Vitorino', destinoHospedagem: 'Casa dos Barros', distancia: 23, dia: 3, data: '16/09/2025' },
      { cidade: 'Vitorino', hospedagem: 'Casa dos Barros', destino: 'Ponte de Lima', destinoHospedagem: 'Pousada De Juventude', distancia: 20, dia: 4, data: '17/09/2025' },
      { cidade: 'Ponte de Lima', hospedagem: 'Pousada De Juventude', destino: 'Rubiães', destinoHospedagem: 'Repouso do Peregrino', distancia: 19, dia: 5, data: '18/09/2025' },
      { cidade: 'Rubiães', hospedagem: 'Repouso do Peregrino', destino: 'O Porriño', destinoHospedagem: 'Casucho da Peregrina', distancia: 21, dia: 6, data: '19/09/2025' },
      { cidade: 'O Porriño', hospedagem: 'Casucho da Peregrina', destino: 'Arcade / Pontevedra', destinoHospedagem: 'Acolá Sport Albergue', distancia: 24, dia: 7, data: '20/09/2025' },
      { cidade: 'Arcade / Pontevedra', hospedagem: 'Acolá Sport Albergue', destino: 'Briallos / Pontevedra', destinoHospedagem: 'Pensión As Burgas', distancia: 22, dia: 8, data: '21/09/2025' },
      { cidade: 'Briallos / Pontevedra', hospedagem: 'Pensión As Burgas', destino: 'Padrón', destinoHospedagem: 'Ecorooms Bed & Breakfast', distancia: 28, dia: 9, data: '22/09/2025' },
      { cidade: 'Padrón', hospedagem: 'Ecorooms Bed & Breakfast', destino: 'Santiago', destinoHospedagem: 'Casa Diocesana VIA LUCIS', distancia: 25, dia: 10, data: '23/09/2025' }
    ];

    // Reflexões espirituais diárias completas
    const reflexoesEspirituais = [
      {
        dia: 1,
        titulo: "Início e Propósito: A Semente da Jornada",
        biblico: "Salmo 121:1-2 – \"Elevo os meus olhos para os montes; de onde me virá o socorro? O meu socorro vem do Senhor, que fez o céu e a terra.\"",
        temaBiblico: "Confiança inabalável na providência divina para a jornada que se inicia. Assim como o salmista busca auxílio nas alturas, nós nos voltamos para a fonte de toda a criação, reconhecendo que não estamos sozinhos neste caminho.",
        druidico: "Os antigos druidas viam cada jornada como um ritual sagrado, um microcosmo da própria vida. A árvore do carvalho, símbolo de força e longevidade, nos ensina que grandes jornadas, assim como árvores majestosas, começam com raízes profundas e uma intenção clara. Honre o solo sob seus pés, pois ele sustenta cada passo.",
        conexaoDruidica: "A jornada física é um espelho da jornada interior. A força para seguir em frente vem da conexão com a terra e com o propósito maior.",
        cursoMilagres: "Exercício 1 – \"Nada do que vejo neste quarto [nesta rua, desta janela, neste lugar] significa coisa alguma.\"",
        aplicacaoCursoMilagres: "Ao iniciar o Caminho, deixe suas expectativas, preconceitos e medos de lado. Este é um convite para ver o mundo com novos olhos, sem as lentes do passado. Cada passo é um novo começo, uma oportunidade de desapego e de abertura para o desconhecido. A jornada é um convite para a mente se esvaziar e se preencher com a verdade do momento presente.",
        diarioMago: {
          ensinamento: "A Espada - O Poder da Decisão",
          simbolo: "A Espada",
          pratica: "Ao iniciar o dia, tome uma decisão clara sobre o que você quer alcançar e se comprometa com ela. Sinta o poder da sua escolha."
        },
        reflexao: "Confie no processo. Cada passo é guiado pela sabedoria superior. Sua decisão inicial é a semente de sua jornada.",
        praticaDiaria: "Ao dar os primeiros passos, faça uma breve pausa. Respire profundamente, sinta a terra sob seus pés e visualize uma semente de intenção sendo plantada em seu coração. Ofereça uma oração de gratidão e entregue seus medos e preocupações ao Divino, confiando que cada passo será guiado. Observe o ambiente ao seu redor sem julgamento, apenas com curiosidade e abertura."
      },
      {
        dia: 2,
        titulo: "Compromisso com a Fé: O Fluxo da Ação",
        biblico: "Tiago 1:22 – \"Sejam praticantes da palavra, e não apenas ouvintes, enganando-se a si mesmos.\"",
        temaBiblico: "A fé não é passiva, mas ativa. Ela se manifesta na prática diária, na coerência entre o que cremos e o que fazemos. No Caminho, cada passo é uma afirmação dessa fé em movimento.",
        druidico: "O elemento água, com sua fluidez e adaptabilidade, nos ensina sobre a natureza da fé em ação. Assim como o rio que encontra seu caminho, contornando obstáculos e fluindo incessantemente em direção ao mar, nossa fé se manifesta no movimento contínuo, na capacidade de se adaptar e de persistir. A água purifica e nutre, e assim também a fé nos sustenta e nos renova.",
        conexaoDruidica: "A fé se aprofunda e se fortalece através da experiência e da ação. A jornada é um rio que nos leva adiante.",
        cursoMilagres: "Exercício 2 – \"Eu dei a tudo que vejo todo o significado que tem para mim.\"",
        aplicacaoCursoMilagres: "Hoje, observe como seus pensamentos e crenças moldam sua percepção da jornada. Se você encontra um desafio, reconheça que o significado atribuído a ele vem de sua própria mente. Escolha atribuir significados de paz, aprendizado e crescimento a cada experiência. Você é o criador da sua realidade interior no Caminho.",
        diarioMago: {
          ensinamento: "O Vento - Exercício da Velocidade",
          simbolo: "O Vento",
          pratica: "Observe a velocidade com que você se move e com que as coisas acontecem. Acelere ou desacelere conscientemente para encontrar o ritmo certo para sua alma."
        },
        reflexao: "A fé verdadeira se expressa através da ação consciente e amorosa. Permita que o fluxo da vida o guie, mas esteja atento ao seu próprio ritmo.",
        praticaDiaria: "Durante a caminhada, pratique a presença plena. Sinta o ritmo dos seus passos, o ar que respira, as paisagens que se desdobram. Cada passo é um ato de fé e uma oportunidade de manifestar a palavra em ação. Ao encontrar um riacho ou fonte de água, pause e reflita sobre a fluidez e a adaptabilidade, permitindo que essa energia purifique sua mente e seu corpo. Lembre-se de que você está atribuindo significado a cada momento."
      },
      {
        dia: 3,
        titulo: "Superando Dificuldades: A Força da Resiliência",
        biblico: "Romanos 5:3-4 – \"E não somente isto, mas também nos gloriamos nas tribulações, sabendo que a tribulação produz perseverança; e a perseverança, experiência; e a experiência, esperança.\"",
        temaBiblico: "As provações no Caminho não são obstáculos, mas oportunidades de crescimento. Elas forjam o caráter, aprofundam a fé e revelam uma força interior que não sabíamos possuir.",
        druidico: "O carvalho, novamente, serve como um poderoso símbolo. Ele cresce forte e robusto precisamente porque enfrenta as tempestades e os ventos. As dificuldades são como os elementos que esculpem a rocha, revelando sua verdadeira essência. Os druidas ensinavam que a resiliência vem da conexão com a força primordial da terra e da aceitação dos ciclos naturais de desafio e renovação.",
        conexaoDruidica: "Cada desafio é uma oportunidade de crescimento espiritual e fortalecimento interior, revelando a resiliência inata.",
        cursoMilagres: "Exercício 3 – \"Eu não compreendo coisa alguma do que vejo.\"",
        aplicacaoCursoMilagres: "Quando surgirem dificuldades – uma bolha no pé, o cansaço, uma dúvida – liberte-se da necessidade de controlar ou entender tudo. Reconheça que sua compreensão limitada pode estar obscurecendo uma lição maior. Entregue a dificuldade a uma sabedoria superior, permitindo que a solução se revele de uma forma que sua mente racional talvez não consiga conceber. A aceitação do \"não saber\" abre espaço para a verdadeira compreensão.",
        diarioMago: {
          ensinamento: "O Fogo - A Crueldade Sagrada",
          simbolo: "O Fogo",
          pratica: "Enfrente uma dificuldade com a 'crueldade sagrada' - a capacidade de cortar o que não serve mais, de queimar as ilusões e de renascer das cinzas mais forte."
        },
        reflexao: "Cada desafio é uma oportunidade de crescimento espiritual e fortalecimento interior. O fogo purifica e transforma.",
        praticaDiaria: "Quando enfrentar um momento de dificuldade física ou mental, respire fundo e repita a frase: \"Eu não compreendo coisa alguma do que vejo.\" Em vez de resistir, permita que a experiência seja. Visualize-se como um carvalho, firme e enraizado, capaz de suportar a tempestade. Ao superar o desafio, por menor que seja, reconheça a força que você encontrou dentro de si e a lição que foi revelada. Agradeça pela oportunidade de crescimento."
      },
      {
        dia: 4,
        titulo: "Caminho Interior: A Voz da Alma",
        biblico: "Salmo 139:23-24 – \"Sonda-me, ó Deus, e conhece o meu coração; prova-me, e conhece os meus pensamentos; e vê se há em mim algum caminho mau, e guia-me pelo caminho eterno.\"",
        temaBiblico: "A verdadeira jornada acontece dentro de nós. O Caminho de Santiago é um convite à introspecção profunda, a ouvir a voz da alma e a permitir que a presença divina nos guie.",
        druidico: "A tradição druídica honra o 'Awen' – a inspiração divina que flui do interior para iluminar o caminho. É a centelha criativa, a sabedoria intuitiva que reside em cada ser. Os druidas buscavam essa conexão profunda com o eu interior através da meditação na natureza, do silêncio e da escuta atenta aos sussurros do espírito. O caminho externo é apenas o reflexo do caminho que se desdobra dentro de nós.",
        conexaoDruidica: "A introspecção e a escuta interior são essenciais para a orientação divina e o autoconhecimento.",
        cursoMilagres: "Exercício 4 – \"Esses pensamentos não significam nada.\"",
        aplicacaoCursoMilagres: "Durante a caminhada, observe o fluxo constante de pensamentos em sua mente. Reconheça que muitos deles são apenas ruído, ecos do passado ou projeções do futuro. Não se apegue a eles, nem os julgue. Permita que passem, como nuvens no céu. Ao fazer isso, você abre espaço para a voz suave da intuição e da sabedoria interior, a verdadeira orientação que o 'Awen' oferece.",
        diarioMago: {
          ensinamento: "O Olho - O Mensageiro",
          simbolo: "O Olho",
          pratica: "Esteja atento aos sinais e mensageiros que o Caminho lhe envia. Uma conversa, um animal, um objeto - tudo pode ser uma mensagem do universo."
        },
        reflexao: "A verdadeira jornada acontece dentro de nós. O caminho externo é apenas o reflexo. Abra seus olhos para as mensagens ocultas.",
        praticaDiaria: "Reserve momentos de silêncio durante a caminhada. Feche os olhos por alguns instantes, se for seguro, e concentre-se na sua respiração. Ao perceber pensamentos intrusivos, repita mentalmente: \"Esses pensamentos não significam nada.\" Permita que a quietude se instale e ouça a voz suave da sua intuição. Conecte-se com a inspiração divina que reside em você, permitindo que ela o guie em cada passo."
      },
      {
        dia: 5,
        titulo: "União no Sagrado: O Círculo Sagrado",
        biblico: "Filipenses 2:2 – \"Completai a minha alegria, tendo o mesmo modo de pensar, o mesmo amor, sendo unidos de alma e tendo o mesmo sentimento.\"",
        temaBiblico: "A jornada em grupo é uma oportunidade de praticar o amor, a humildade e a unidade. A força do Caminho reside também na comunhão e no apoio mútuo entre os peregrinos.",
        druidico: "O círculo druídico é um símbolo poderoso de unidade e interconexão. Nele, cada indivíduo é único, mas todos estão conectados, contribuindo com sua luz e energia para o bem maior do grupo. Os druidas ensinavam que a força da comunidade reside na aceitação das diferenças e na celebração da individualidade dentro da harmonia coletiva. A jornada é um tecer de laços, onde cada um apoia o outro.",
        conexaoDruidica: "A força da jornada é amplificada pela união e pelo apoio mútuo, refletindo a interconexão de todos os seres.",
        cursoMilagres: "Exercício 5 – \"Nunca estou aborrecido pela razão que penso.\"",
        aplicacaoCursoMilagres: "Em um grupo, podem surgir pequenos atritos ou desentendimentos. Quando isso acontecer, lembre-se de que a causa do seu aborrecimento raramente é o que parece ser na superfície. Olhe além das aparências, para a unidade subjacente que os conecta. Escolha ver o amor e a inocência em seus companheiros, mesmo quando suas ações pareçam desafiadoras. A verdadeira cura e harmonia vêm do perdão e da compreensão mútua.",
        diarioMago: {
          ensinamento: "A Lua - Ritual da Tradição",
          simbolo: "A Lua",
          pratica: "Honre as tradições e os rituais do Caminho. Conecte-se com a energia da Lua, que representa a sabedoria ancestral e a intuição feminina."
        },
        reflexao: "Nossa jornada individual se enriquece através da comunhão com outros peregrinos. A tradição nos une e nos fortalece.",
        praticaDiaria: "Pratique a escuta compassiva com seus companheiros de jornada. Ofereça ajuda quando perceber que alguém precisa, mesmo que não peça. Ao surgir qualquer desentendimento, pause e reflita sobre a lição do Curso: \"Nunca estou aborrecido pela razão que penso.\" Busque a unidade e a harmonia, lembrando-se de que todos estão no mesmo caminho, buscando a mesma meta. Veja o sagrado em cada pessoa ao seu lado."
      },
      {
        dia: 6,
        titulo: "A Beleza do Caminho: A Arte da Contemplação",
        biblico: "Salmo 19:1 – \"Os céus proclamam a glória de Deus e o firmamento anuncia a obra das suas mãos.\"",
        temaBiblico: "A natureza ao nosso redor é um testemunho da grandeza divina. A contemplação da beleza do Caminho é uma forma de oração e de conexão profunda com o Criador.",
        druidico: "Os druidas viam a natureza como o primeiro e mais sagrado livro. Cada folha, pedra, riacho e montanha carregava sabedoria e revelava a presença do Divino. Eles honravam os espíritos da terra, da água, do ar e do fogo, reconhecendo a sacralidade em tudo que existe. A beleza natural não era apenas estética, mas um portal para o sagrado, um convite à reverência e à gratidão.",
        conexaoDruidica: "A contemplação da beleza natural é uma forma de oração e conexão com o Divino, reconhecendo a sacralidade em toda a criação.",
        cursoMilagres: "Exercício 6 – \"Estou aborrecido porque vejo algo que não está lá.\"",
        aplicacaoCursoMilagres: "Se você se sentir entediado, cansado ou desanimado com a paisagem, questione essa percepção. A beleza está sempre presente, mas nossa mente pode estar obscurecida por pensamentos de escassez ou julgamento. A lição nos convida a mudar nossa percepção, a ver a perfeição e a abundância que já existem. A beleza do Caminho não está apenas no que é visível, mas na forma como escolhemos percebê-la.",
        diarioMago: {
          ensinamento: "A Águia - Exercício do Despertar",
          simbolo: "A Águia",
          pratica: "Eleve sua perspectiva como a águia. Veja a jornada de cima, compreendendo o panorama geral e as lições que cada paisagem oferece."
        },
        reflexao: "A contemplação da beleza natural é uma forma de oração e conexão com o Divino. Desperte para a grandiosidade ao seu redor.",
        praticaDiaria: "Pare regularmente para contemplar a natureza ao seu redor. Observe os detalhes: as cores das flores, o canto dos pássaros, a textura das árvores, o fluxo da água. Permita que seus sentidos se abram para a grandiosidade da criação. Veja cada paisagem como uma bênção e uma manifestação da glória divina. Se a mente tentar distraí-lo com pensamentos negativos, lembre-se: \"Estou aborrecido porque vejo algo que não está lá.\" Escolha ver a beleza."
      },
      {
        dia: 7,
        titulo: "Renovação Espiritual: O Ciclo da Transformação",
        biblico: "Isaías 40:28-31 – \"...os que esperam no Senhor renovarão as suas forças, subirão com asas como águias...\"",
        temaBiblico: "A cada semana de caminhada, somos convidados a uma profunda renovação de forças, tanto físicas quanto espirituais. A esperança no Senhor é a fonte inesgotável de energia e vigor.",
        druidico: "O número sete é sagrado em muitas tradições, incluindo a druídica, representando ciclos completos, perfeição e renovação. É o dia de descanso, de introspecção e de reconexão com o sagrado. Os druidas honravam os ciclos da natureza – as fases da lua, as estações do ano – como um lembrete constante da renovação cíclica da vida. Hoje, honramos a renovação que acontece em nós, permitindo que o cansaço se dissipe e a energia divina nos preencha.",
        conexaoDruidica: "A renovação de forças é um processo cíclico, que se manifesta na espera confiante e na conexão com os ritmos naturais.",
        cursoMilagres: "Exercício 7 – \"Eu vejo apenas o passado.\"",
        aplicacaoCursoMilagres: "Ao final de uma semana de Caminho, é natural refletir sobre o que passou – os desafios, as alegrias, o cansaço acumulado. No entanto, a lição nos convida a liberar as limitações do passado. O cansaço físico e mental pode ser uma manifestação de apego a experiências passadas. Escolha ver o presente como um novo momento, livre das amarras do que já foi. Permita que a energia da renovação o preencha, liberando qualquer peso que o passado possa ter deixado.",
        diarioMago: {
          ensinamento: "A Coroa - A Conquista Interior",
          simbolo: "A Coroa",
          pratica: "Reconheça as conquistas internas que você já fez. Cada passo no Caminho é uma vitória sobre si mesmo. Sinta-se coroado por sua própria força."
        },
        reflexao: "A cada semana de caminhada, somos renovados e fortalecidos espiritualmente. Celebre suas vitórias internas.",
        praticaDiaria: "Faça um balanço semanal da sua jornada. O que você aprendeu? Como você cresceu? Celebre sua transformação e as forças que você descobriu. Ao sentir o cansaço, repita: \"Eu vejo apenas o passado.\" Entregue o cansaço e as preocupações ao Divino, permitindo que a energia da renovação o preencha. Visualize-se subindo com asas como águias, renovado e fortalecido para os próximos dias. Descanse e permita que a natureza e a fé o restaurem."
      },
      {
        dia: 8,
        titulo: "Amor Incondicional: A Teia da Conexão",
        biblico: "1 Coríntios 13:4-7 – \"O amor é paciente, é bondoso. O amor não inveja, não se vangloria, não se orgulha...\"",
        temaBiblico: "O amor é a força que sustenta a jornada, transformando cada encontro em uma oportunidade de conexão e serviço. É o alicerce da verdadeira peregrinação.",
        druidico: "Os druidas honravam o 'Grá' – o amor incondicional que conecta todas as criaturas e permeia o universo. Eles viam a vida como uma teia intrincada, onde cada ser é um fio essencial. O amor era a força que mantinha essa teia unida, promovendo a harmonia e o equilíbrio. Praticar o 'Grá' significava estender a compaixão e a bondade a todos os seres, reconhecendo a divindade em cada um. É a energia que transforma nossa jornada em uma peregrinação sagrada.",
        conexaoDruidica: "O amor incondicional é a força que une e sustenta, transformando a jornada em uma experiência sagrada de conexão.",
        cursoMilagres: "Exercício 8 – \"Minha mente está preocupada com pensamentos do passado.\"",
        aplicacaoCursoMilagres: "Em sua interação com outros peregrinos, ou mesmo com os habitantes locais, podem surgir julgamentos ou preconceitos baseados em experiências passadas. A lição nos convida a liberar esses pensamentos. Escolha ver cada pessoa com os olhos do amor, sem as lentes do passado. O amor incondicional, o 'Grá' druídico, só pode florescer quando a mente está livre de julgamentos e apegos ao que já foi. Cada encontro é uma oportunidade de praticar o perdão e a aceitação.",
        diarioMago: {
          ensinamento: "A Rosa - O Amor que Devora",
          simbolo: "A Rosa",
          pratica: "Permita que o amor incondicional o preencha e o transforme. Deixe que ele 'devore' seus medos e inseguranças, abrindo espaço para a compaixão."
        },
        reflexao: "O amor é a energia que transforma nossa jornada em peregrinação sagrada. Deixe-se envolver por essa força.",
        praticaDiaria: "Pratique atos aleatórios de bondade. Ofereça um sorriso, uma palavra de encorajamento, ou ajude um companheiro de jornada. Irradie amor e compaixão para todos que encontrar, independentemente de suas diferenças. Se perceber que sua mente está julgando ou se apegando a pensamentos negativos sobre alguém, repita: \"Minha mente está preocupada com pensamentos do passado.\" Escolha o amor no presente e veja a divindade em cada ser."
      },
      {
        dia: 9,
        titulo: "Sabedoria do Silêncio: A Quietude Interior",
        biblico: "Eclesiastes 3:1-8 – \"...tempo de calar e tempo de falar...\"",
        temaBiblico: "A sabedoria reside em reconhecer o tempo certo para cada coisa, incluindo o silêncio e a escuta interior. A quietude é essencial para aprofundar a conexão espiritual.",
        druidico: "No silêncio profundo da floresta, os druidas encontravam as respostas mais profundas. O silêncio não era ausência, mas plenitude, o útero da sabedoria e da intuição. É no recolhimento que a alma se manifesta e a verdade se revela. A quietude nos permite sintonizar com os ritmos da natureza e com a voz do nosso eu superior.",
        conexaoDruidica: "O silêncio interior é um portal para a sabedoria e a intuição, permitindo a conexão com o eu superior e os ritmos da natureza.",
        cursoMilagres: "Exercício 9 – \"Eu não vejo nada como é agora.\"",
        aplicacaoCursoMilagres: "No silêncio, somos convidados a ver além das ilusões e das aparências. A mente, acostumada ao ruído e à distração, pode resistir à quietude. No entanto, é no silêncio que a verdade se revela. Permita-se estar presente, sem julgamento, e observe como sua percepção se expande para além do que os olhos físicos podem ver. O silêncio é um convite para a clareza e a visão.",
        diarioMago: {
          ensinamento: "A Borboleta - Exercício do Enterro",
          simbolo: "A Borboleta",
          pratica: "Enterre o que não serve mais. Deixe para trás velhos hábitos, medos e crenças limitantes. Permita-se renascer como a borboleta, livre e transformada."
        },
        reflexao: "No silêncio interior encontramos a paz que transcende todo entendimento. A quietude nos permite liberar o passado e abraçar a renovação.",
        praticaDiaria: "Caminhe em silêncio por períodos. Permita que a quietude interior se expanda. Observe seus pensamentos sem se apegar a eles. Ao final do dia, visualize-se deixando para trás tudo o que não precisa mais, como a borboleta que emerge de seu casulo, livre e transformada."
      },
      {
        dia: 10,
        titulo: "A Chegada Sagrada: O Novo Começo",
        biblico: "Apocalipse 21:5 – \"Eis que faço novas todas as coisas.\"",
        temaBiblico: "A chegada a Santiago não é o fim, mas a consagração de uma transformação interior e o início de um novo ciclo. Deus faz novas todas as coisas em nós.",
        druidico: "O final de uma jornada é também um novo início. A roda da vida continua girando, trazendo novas oportunidades e aprendizados. Os druidas celebravam os ciclos da vida, reconhecendo que cada término é um portal para um novo começo. A energia do Caminho permanece em você, impulsionando-o para frente.",
        conexaoDruidica: "O final de uma jornada é um novo início, um ciclo contínuo de transformação e aprendizado, impulsionado pela energia do Caminho.",
        cursoMilagres: "Exercício 10 – \"Meus pensamentos não significam nada.\"",
        aplicacaoCursoMilagres: "Chegue a Santiago com a mente livre e o coração aberto. Libere qualquer apego ao resultado final ou a como você 'deveria' se sentir. A verdadeira recompensa está na transformação que ocorreu dentro de você. Permita que a experiência do Caminho se integre em seu ser, sem a necessidade de definições ou julgamentos. Você é um novo ser, pronto para um novo começo.",
        diarioMago: {
          ensinamento: "O Infinito - A Tradição Final",
          simbolo: "O Infinito",
          pratica: "Reconheça que a jornada é contínua. A chegada a Santiago é apenas um ponto de transição para novas jornadas. Abrace o infinito de possibilidades."
        },
        reflexao: "A chegada a Santiago não é o fim, mas a consagração de uma transformação interior. É o início de um novo ciclo.",
        praticaDiaria: "Ao chegar à Catedral de Santiago, faça uma pausa para oferecer gratidão por toda a jornada, pelos desafios superados e pela pessoa que você se tornou. Sinta a conexão com o infinito e com todos os peregrinos que trilharam este caminho antes de você. Permita que a energia da conclusão o preencha, sabendo que novas jornadas o aguardam."
      }
    ];

    const [checklist, setChecklist] = useState([
      { id: 1, item: 'Minancura', categoria: 'Medicamentos', checked: false, essencial: true },
      { id: 2, item: 'Talco antisséptico', categoria: 'Medicamentos', checked: false, essencial: true },
      { id: 3, item: 'Passaporte', categoria: 'Documentos', checked: false, essencial: true },
      { id: 4, item: 'Credencial do Peregrino', categoria: 'Documentos', checked: false, essencial: true },
      { id: 5, item: 'Cartão de crédito internacional', categoria: 'Documentos', checked: false, essencial: true },
      { id: 6, item: 'Euros em espécie', categoria: 'Documentos', checked: false, essencial: true },
      { id: 7, item: 'Seguro viagem', categoria: 'Documentos', checked: false, essencial: true },
      { id: 8, item: 'Botas de caminhada (já amaciadas)', categoria: 'Calçados', checked: false, essencial: true },
      { id: 9, item: 'Sandálias para descanso', categoria: 'Calçados', checked: false, essencial: true },
      { id: 10, item: 'Meias de caminhada (6 pares)', categoria: 'Roupas', checked: false, essencial: true },
      { id: 11, item: 'Camisas dry-fit (4 unidades)', categoria: 'Roupas', checked: false, essencial: true },
      { id: 12, item: 'Calças de caminhada (2 unidades)', categoria: 'Roupas', checked: false, essencial: true },
      { id: 13, item: 'Casaco impermeável', categoria: 'Roupas', checked: false, essencial: true },
      { id: 14, item: 'Roupa íntima (6 peças)', categoria: 'Roupas', checked: false, essencial: true },
      { id: 15, item: 'Band-aid para bolhas', categoria: 'Medicamentos', checked: false, essencial: true },
      { id: 16, item: 'Ibuprofeno', categoria: 'Medicamentos', checked: false, essencial: true },
      { id: 17, item: 'Protetor solar FPS 50+', categoria: 'Medicamentos', checked: false, essencial: true },
      { id: 18, item: 'Mochila 35-40L', categoria: 'Equipamentos', checked: false, essencial: true },
      { id: 19, item: false, essencial: true },
      { id: 18, item: 'Mochila 35-40L', categoria: 'Equipamentos', checked: false, essencial: true },
      { id: 19, item: 'Bastão de caminhada', categoria: 'Equipamentos', checked: false, essencial: true },
      { id: 20, item: 'Saco de dormir (se necessário)', categoria: 'Equipamentos', checked: false, essencial: false },
      { id: 21, item: 'Garrafa de água 1L', categoria: 'Equipamentos', checked: false, essencial: true },
      { id: 22, item: 'Adaptador de tomada europeu', categoria: 'Verificar em Portugal', checked: false, essencial: false },
      { id: 23, item: 'Chip de celular local', categoria: 'Verificar em Portugal', checked: false, essencial: false },
      { id: 24, item: 'Comida para trilha', categoria: 'Verificar em Portugal', checked: false, essencial: false },
    ]);

    const [customItem, setCustomItem] = useState('');
    const [customCategory, setCustomCategory] = useState('Outros');

    const categorias = ['Documentos', 'Roupas', 'Calçados', 'Medicamentos', 'Equipamentos', 'Verificar em Portugal', 'Outros'];

    const addCustomItem = () => {
      if (customItem.trim()) {
        const newItem = {
          id: Date.now(),
          item: customItem.trim(),
          categoria: customCategory,
          checked: false,
          essencial: false
        };
        setChecklist([...checklist, newItem]);
        setCustomItem('');
      }
    };

    const removeItem = (id) => {
      setChecklist(checklist.filter(item => item.id !== id));
    };

    const toggleItem = (id) => {
      setChecklist(checklist.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    };

    const getCurrentLocationIndex = () => {
      return caminhoPortugues.findIndex(local => local.cidade === currentLocation);
    };

    const getNextLocation = () => {
      const currentIndex = getCurrentLocationIndex();
      if (currentIndex >= 0 && currentIndex < caminhoPortugues.length - 1) {
        return caminhoPortugues[currentIndex + 1];
      }
      return null;
    };

    const calculateTimeToNext = (distance) => {
      return Math.round((distance / walkingSpeed) * 60); // em minutos
    };

    const formatTime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
    };

    // Nova variável para a reflexão atual, usando .find() para mais segurança
    const currentReflection = reflexoesEspirituais.find(r => r.dia === currentDay);

    const renderRoteiro = () => {
      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Caminho Português Central - Santiago de Compostela
              </CardTitle>
              <CardDescription>
                Roteiro oficial para 7 peregrinos • 14 a 23 de setembro de 2025 • 229km total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium">Velocidade média: {walkingSpeed} km/h</p>
                <p className="text-blue-700 text-sm">Use o seletor abaixo para ajustar sua velocidade e ver os tempos estimados</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Velocidade de caminhada (km/h):</label>
                <Select value={walkingSpeed.toString()} onValueChange={(value) => setWalkingSpeed(Number(value))}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 km/h (lento)</SelectItem>
                    <SelectItem value="4">4 km/h (moderado)</SelectItem>
                    <SelectItem value="5">5 km/h (normal)</SelectItem>
                    <SelectItem value="6">6 km/h (rápido)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {caminhoPortugues.map((etapa, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">Dia {etapa.dia} - {etapa.data}</h3>
                          <p className="text-gray-600">{etapa.cidade} → {etapa.destino}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">{etapa.distancia} km</Badge>
                          <p className="text-sm text-gray-500">
                            Tempo estimado: {formatTime(calculateTimeToNext(etapa.distancia))}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Hospedagem atual:</p>
                          <p className="text-sm">{etapa.hospedagem}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Próxima hospedagem:</p>
                          <p className="text-sm">{etapa.destinoHospedagem}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    };

    const renderChecklist = () => {
      const groupedItems = categorias.reduce((acc, categoria) => {
        acc[categoria] = checklist.filter(item => item.categoria === categoria);
        return acc;
      }, {});

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Lista Personalizada - 7 Peregrinos
              </CardTitle>
              <CardDescription>
                Marque os itens conforme forem sendo preparados. Itens essenciais estão marcados com ⭐
              </CardDescription>
            </CardHeader>
          </Card>

          {categorias.map(categoria => {
            const items = groupedItems[categoria];
            if (items.length === 0) return null;
            
            const checkedCount = items.filter(item => item.checked).length;
            const totalCount = items.length;
            
            return (
              <Card key={categoria}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{categoria}</CardTitle>
                    <span className="text-sm text-gray-600">
                      {checkedCount}/{totalCount} concluídos
                    </span>
                  </div>
                  <Progress value={(checkedCount / totalCount) * 100} className="w-full" />
                </CardHeader>
                <CardContent className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleItem(item.id)}
                          className={`w-6 h-6 p-0 rounded border-2 ${
                            item.checked 
                              ? 'bg-green-500 border-green-500 text-white hover:bg-green-600' 
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {item.checked && <Check size={12} />}
                        </Button>
                        <span className={`${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {item.essencial && '⭐'} {item.item}
                        </span>
                      </div>
                      {!item.essencial && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">➕ Adicionar Item Personalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={customItem}
                  onChange={(e) => setCustomItem(e.target.value)}
                  placeholder="Digite o item..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                />
                <Select value={customCategory} onValueChange={setCustomCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addCustomItem}>
                  <Plus size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    };

    const renderCalculadora = () => {
      const currentIndex = getCurrentLocationIndex();
      const nextLocation = getNextLocation();
      
      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Calculadora de Tempo e Distância
              </CardTitle>
              <CardDescription>
                Calcule o tempo estimado para chegar ao próximo destino
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Onde você está agora?</label>
                <Select value={currentLocation} onValueChange={setCurrentLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua localização atual" />
                  </SelectTrigger>
                  <SelectContent>
                    {caminhoPortugues.map((local, index) => (
                      <SelectItem key={index} value={local.cidade}>
                        {local.cidade} (Dia {local.dia})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {nextLocation && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-800 mb-3">📍 Próximo Destino</h3>
                    <div className="space-y-2">
                      <p><strong>Destino:</strong> {nextLocation.destino}</p>
                      <p><strong>Hospedagem:</strong> {nextLocation.destinoHospedagem}</p>
                      <p><strong>Distância:</strong> {nextLocation.distancia} km</p>
                      <p><strong>Tempo estimado:</strong> {formatTime(calculateTimeToNext(nextLocation.distancia))}</p>
                      <p><strong>Data prevista:</strong> {nextLocation.data}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentLocation && !nextLocation && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">🎉 Parabéns!</h3>
                    <p className="text-blue-700">Você chegou a Santiago de Compostela! Sua jornada foi concluída com sucesso.</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Estatísticas da Jornada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">229</p>
                  <p className="text-sm text-blue-800">km total</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">10</p>
                  <p className="text-sm text-green-800">dias</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{formatTime(calculateTimeToNext(229))}</p>
                  <p className="text-sm text-purple-800">tempo total</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">{(229/10).toFixed(1)}</p>
                  <p className="text-sm text-amber-800">km/dia médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🚶‍♂️ Assistente Santiago de Compostela
            </h1>
            <p className="text-gray-600">
              Seu companheiro personalizado para a peregrinação ao Caminho Português Central
            </p>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-auto sm:h-9">
              <TabsTrigger value="roteiro" className="flex items-center gap-2">
                <MapPin size={16} />
                Roteiro
              </TabsTrigger>
              <TabsTrigger value="checklist" className="flex items-center gap-2">
                <Package size={16} />
                Lista de Itens
              </TabsTrigger>
              <TabsTrigger value="espiritual" className="flex items-center gap-2">
                <Heart size={16} />
                Jornada Espiritual
              </TabsTrigger>
              <TabsTrigger value="calculadora" className="flex items-center gap-2">
                <Clock size={16} />
                Calculadora
              </TabsTrigger>
            </TabsList>

            <TabsContent value="roteiro" className="mt-6">
              {renderRoteiro()}
            </TabsContent>

            <TabsContent value="checklist" className="mt-6">
              {renderChecklist()}
            </TabsContent>

            <TabsContent value="espiritual" className="p-4 sm:p-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Heart /> Jornada Espiritual Diária</CardTitle>
                  <CardDescription>Reflexões e práticas para nutrir sua alma durante o Caminho.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={(value) => setCurrentDay(Number(value))} value={String(currentDay)}>
                    <SelectTrigger className="w-full mb-4">
                      <SelectValue placeholder="Selecione o Dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {reflexoesEspirituais.map(ref => (
                        <SelectItem key={ref.dia} value={String(ref.dia)}>Dia {ref.dia} - {ref.titulo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {currentReflection ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-green-700">Dia {currentReflection.dia} - {currentReflection.titulo}</h3>
                      
                      <div>
                        <h4 className="font-semibold">📖 Reflexão Bíblica:</h4>
                        <p>{currentReflection.biblico}</p>
                        <p className="text-sm text-gray-600"><strong>Tema:</strong> {currentReflection.temaBiblico}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">🌿 Sabedoria Druídica:</h4>
                        <p>{currentReflection.druidico}</p>
                        <p className="text-sm text-gray-600"><strong>Conexão:</strong> {currentReflection.conexaoDruidica}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">✨ Um Curso em Milagres:</h4>
                        <p>{currentReflection.cursoMilagres}</p>
                        <p className="text-sm text-gray-600"><strong>Aplicação:</strong> {currentReflection.aplicacaoCursoMilagres}</p>
                      </div>

                      {currentReflection.diarioMago && (
                        <div>
                          <h4 className="font-semibold">🧙‍♂️ O Diário de um Mago:</h4>
                          <p><strong>Ensinamento:</strong> {currentReflection.diarioMago.ensinamento}</p>
                          <p><strong>Símbolo:</strong> {currentReflection.diarioMago.simbolo}</p>
                          <p><strong>Prática:</strong> {currentReflection.diarioMago.pratica}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold">💭 Reflexão Geral:</h4>
                        <p>{currentReflection.reflexao}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">🙏 Prática Diária:</h4>
                        <p>{currentReflection.praticaDiaria}</p>
                      </div>
                    </div>
                  ) : (
                    <p>Selecione um dia para ver a reflexão espiritual.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculadora" className="mt-6">
              {renderCalculadora()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  function App() {
    return (
      <div>
        <SantiagoAssistant />
      </div>
    );
  }

  export default SantiagoAssistant;