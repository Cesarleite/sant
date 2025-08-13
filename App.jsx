import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Package, Hotel, Plus, Trash2, Check, Navigation, Calendar, Heart, BookOpen, Mountain, Compass, Phone, Map, Download } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import './App.css';
import './index.css';

// ===================================================================================
// DADOS CENTRALIZADOS DA JORNADA
// ===================================================================================

const roteiroCompleto = [
  {
    dia: 1,
    data: "14/09",
    titulo: "Porto a Vairão",
    pontoPartida: "The Passenger Hostel (Porto)",
    pontoChegada: "A Casa da Estrela (Vairão)",
    distancia: 25.5,
    tempoEstimado: "6-7 horas",
    dificuldade: "Moderada",
    clima: "16°C - 26°C",
    descricao: "Este é o dia de partida, onde a jornada física e interior começa. O trajeto o levará do coração pulsante do Porto até a serenidade de um antigo mosteiro.",
    marcosImportantes: [
      "Sé Catedral do Porto (marco zero)",
      "Mosteiro de Leça do Balio",
      "Mosteiro de São Salvador de Vairão"
    ],
    pontosCarimbo: [
      "Sé Catedral do Porto",
      "Mosteiro de Leça do Balio",
      "A Casa da Estrela"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/The+Passenger+Hostel,+Pra%C3%A7a+de+Almeida+Garrett,+Porto/A+Casa+da+Estrela,+R.+Central+de+Vair%C3%A3o+100,+Vair%C3%A3o/@41.2290425,-8.6830583,12z",
    visaoEspiritual: {
      crista: "Jornada de fé, superando o 'deserto' urbano para alcançar o refúgio espiritual.",
      natural: "Transição da energia da pedra e do rio para a energia da terra fértil e do campo.",
      simbolica: "Ritual de deixar o 'mundo profano' para entrar no espaço sagrado do Caminho."
    },
    hospedagemAtual: {
      nome: "The Passenger Hostel",
      endereco: "Praça de Almeida Garrett, Porto",
      telefone: "+351 222 024 000"
    },
    proximaHospedagem: {
      nome: "A Casa da Estrela",
      endereco: "R. Central de Vairão 100, Vairão",
      telefone: "+351 252 248 159"
    }
  },
  {
    dia: 2,
    data: "15/09",
    titulo: "Vairão a Barcelos",
    pontoPartida: "A Casa da Estrela (Vairão)",
    pontoChegada: "Bagoeira Hotel Restaurante (Barcelos)",
    distancia: 26.6,
    tempoEstimado: "8-9 horas",
    dificuldade: "Difícil",
    clima: "14°C - 25°C",
    descricao: "Este é um dia de profunda imersão no Caminho. Será a sua primeira etapa verdadeiramente longa, um teste de resistência que o levará por paisagens rurais deslumbrantes.",
    marcosImportantes: [
      "Ponte D. Zameiro (sobre o Rio Ave)",
      "Igreja de São Pedro de Rates",
      "Ponte Medieval de Barcelos"
    ],
    pontosCarimbo: [
      "Igreja de São Pedro de Rates",
      "Cafés em Pedra Furada",
      "Igreja Matriz de Barcelos"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/A+Casa+da+Estrela,+R.+Central+de+Vair%C3%A3o+100,+Vair%C3%A3o/Hotel+Bagoeira,+Avenida+Doutor+Sid%C3%B3nio+Pais,+Barcelos/@41.423712,-8.7504067,11z",
    visaoEspiritual: {
      crista: "Jornada de perseverança e fé, conectando-se com a história de São Pedro de Rates e o milagre do Galo de Barcelos.",
      natural: "Imersão na energia da terra, da água (Rio Ave) e dos locais de poder ancestral como Rates.",
      simbolica: "O esforço físico como meditação. A Lenda do Galo como arquétipo da fé que manifesta o impossível."
    },
    hospedagemAtual: {
      nome: "A Casa da Estrela",
      endereco: "R. Central de Vairão 100, Vairão",
      telefone: "+351 252 248 159"
    },
    proximaHospedagem: {
      nome: "Bagoeira Hotel Restaurante",
      endereco: "Avenida Doutor Sidónio Pais, Barcelos",
      telefone: "+351 253 809 500"
    }
  },
  {
    dia: 3,
    data: "16/09",
    titulo: "Barcelos a Vitorino dos Piães",
    pontoPartida: "Bagoeira Hotel Restaurante (Barcelos)",
    pontoChegada: "Casa dos Barros (Vitorino dos Piães)",
    distancia: 16,
    tempoEstimado: "5-6 horas",
    dificuldade: "Moderada",
    clima: "14°C - 24°C",
    descricao: "Após a longa jornada do dia anterior, este terceiro dia oferece uma caminhada mais curta e agradável, atravessando uma das paisagens mais bonitas do Caminho Português.",
    marcosImportantes: [
      "Lugar da Lameira (Lenda das Almas)",
      "Ponte das Tábuas",
      "Ponte de Fêlpas (sobre o Rio Neiva)"
    ],
    pontosCarimbo: [
      "Igrejas locais",
      "Cafés nos vilarejos",
      "Casa dos Barros"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Hotel+Bagoeira,+Avenida+Doutor+Sid%C3%B3nio+Pais,+Barcelos/Casa+dos+Barros,+R.+de+Barros+35,+Vitorino+dos+Pi%C3%A3es/@41.602012,-8.6999997,12z",
    visaoEspiritual: {
      crista: "Etapa de contemplação e oração, com a travessia do Rio Neiva como um batismo simbólico.",
      natural: "Conexão profunda com a paisagem rural do Minho, honrando a água do Rio Neiva.",
      simbolica: "O Rio Neiva como um portal para uma nova fase da jornada. Um dia de introspecção."
    },
    hospedagemAtual: {
      nome: "Bagoeira Hotel Restaurante",
      endereco: "Avenida Doutor Sidónio Pais, Barcelos",
      telefone: "+351 253 809 500"
    },
    proximaHospedagem: {
      nome: "Casa dos Barros",
      endereco: "R. de Barros 35, Vitorino dos Piães",
      telefone: "+351 258 741 371"
    }
  },
  {
    dia: 4,
    data: "17/09",
    titulo: "Vitorino dos Piães a Ponte de Lima",
    pontoPartida: "Casa dos Barros (Vitorino dos Piães)",
    pontoChegada: "Pousada de Juventude de Ponte de Lima",
    distancia: 17,
    tempoEstimado: "2.5-3.5 horas",
    dificuldade: "Fácil",
    clima: "14°C - 24°C",
    descricao: "Este é um dia de recompensa. Uma caminhada curta que culmina na chegada a Ponte de Lima, uma vila medieval espetacular, famosa por sua ponte romana.",
    marcosImportantes: [
      "Alto da Portela",
      "Descida para o vale do Rio Lima",
      "Ponte Medieval e Romana de Ponte de Lima"
    ],
    pontosCarimbo: [
      "Capelas no caminho",
      "Posto de Turismo de Ponte de Lima",
      "Pousada de Juventude"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Casa+dos+Barros,+R.+de+Barros+35,+Vitorino+dos+Pi%C3%A3es/Pousada+de+Juventude+de+Ponte+de+Lima,+Rua+Papa+Jo%C3%A3o+XXIII,+Ponte+de+Lima/@41.7181286,-8.6433067,12z",
    visaoEspiritual: {
      crista: "Um dia de gratidão, com a chegada a uma vila rica em patrimônio religioso para oração e descanso.",
      natural: "Conexão com a energia do vale e do Rio Lima, um lugar onde natureza e história se encontram.",
      simbolica: "Cruzar a ponte como um ato de superação do medo (Lenda do Rio Lethes) e de avanço consciente na jornada."
    },
    hospedagemAtual: {
      nome: "Casa dos Barros",
      endereco: "R. de Barros 35, Vitorino dos Piães",
      telefone: "+351 258 741 371"
    },
    proximaHospedagem: {
      nome: "Pousada de Juventude de Ponte de Lima",
      endereco: "Rua Papa João XXIII, Ponte de Lima",
      telefone: "+351 258 943 797"
    }
  },
  {
    dia: 5,
    data: "18/09",
    titulo: "Ponte de Lima a Rubiães",
    pontoPartida: "Pousada de Juventude de Ponte de Lima",
    pontoChegada: "Repouso do Peregrino (Rubiães)",
    distancia: 17,
    tempoEstimado: "4.5-6 horas",
    dificuldade: "Difícil",
    clima: "14°C - 24°C",
    descricao: "Este é o dia da grande subida, um teste de determinação e força. A etapa o levará através da serra da Labruja até a pequena e acolhedora freguesia de Rubiães.",
    marcosImportantes: [
      "Início da subida (Codeçal)",
      "Alto da Labruja",
      "Cruz dos Franceses (Cruz dos Mortos)"
    ],
    pontosCarimbo: [
      "Cafés na base da subida (Codeçal)",
      "Cruz no topo da serra",
      "Repouso do Peregrino"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Pousada+de+Juventude+de+Ponte+de+Lima,+Rua+Papa+Jo%C3%A3o+XXIII,+Ponte+de+Lima/O+Repouso+do+Peregrino,+Lugar+de+Gontomil,+Rubi%C3%A3es/@41.8219576,-8.6433067,12z",
    visaoEspiritual: {
      crista: "A subida da Labruja é a 'via sacra' do Caminho Português. Um teste de fé e perseverança.",
      natural: "Este dia é sobre a montanha. Um diálogo direto com a energia da pedra, da terra e da altitude.",
      simbolica: "A Labruja é o grande arquétipo do desafio na jornada do herói. A superação de uma nova consciência."
    },
    hospedagemAtual: {
      nome: "Pousada de Juventude de Ponte de Lima",
      endereco: "Rua Papa João XXIII, Ponte de Lima",
      telefone: "+351 258 943 797"
    },
    proximaHospedagem: {
      nome: "Repouso do Peregrino",
      endereco: "Lugar de Gontomil, Rubiães",
      telefone: "+351 251 825 504"
    }
  },
  {
    dia: 6,
    data: "19/09",
    titulo: "Rubiães a O Porriño (Espanha)",
    pontoPartida: "Repouso do Peregrino (Rubiães)",
    pontoChegada: "Casucho da Peregrina (O Porriño)",
    distancia: 19.1,
    tempoEstimado: "4.5-5.5 horas",
    dificuldade: "Moderada",
    clima: "15°C - 25°C",
    descricao: "Este é um dia de transição e celebração. Você deixará Portugal para trás e entrará na Galiza, a terra do Apóstolo.",
    marcosImportantes: [
      "Fortaleza de Valença",
      "Travessia do Rio Minho",
      "Catedral de Tui (Espanha)"
    ],
    pontosCarimbo: [
      "Fortaleza de Valença",
      "Catedral de Tui (primeiro carimbo espanhol)",
      "Casucho da Peregrina"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/O+Repouso+do+Peregrino,+Lugar+de+Gontomil,+Rubiães/Casucho+da+Peregrina,+Rúa+Ramón+González,+O+Porriño,+Espanha/@41.979178,-8.6749997,12z",
    visaoEspiritual: {
      crista: "A universalidade da fé, cruzando o 'Jordão' (Rio Minho) para entrar na terra do Apóstolo.",
      natural: "Conexão com a energia do Rio Minho e a sutil mudança de paisagem ao entrar na Galiza.",
      simbolica: "A travessia da ponte como um portal, deixando o familiar para abraçar o novo."
    },
    hospedagemAtual: {
      nome: "Repouso do Peregrino",
      endereco: "Lugar de Gontomil, Rubiães",
      telefone: "+351 251 825 504"
    },
    proximaHospedagem: {
      nome: "Casucho da Peregrina",
      endereco: "Rúa Ramón González, O Porriño, Espanha",
      telefone: "+34 986 339 234"
    }
  },
  {
    dia: 7,
    data: "20/09",
    titulo: "O Porriño a Pontevedra",
    pontoPartida: "Casucho da Peregrina (O Porriño)",
    pontoChegada: "Acolá Sport Albergue (Pontevedra)",
    distancia: 32,
    tempoEstimado: "7.5-9 horas",
    dificuldade: "Difícil",
    clima: "15°C - 24°C",
    descricao: "Este é um dia de superação e beleza. Você enfrentará uma subida desafiadora e passará por Redondela, onde os Caminhos Central e da Costa se unem.",
    marcosImportantes: [
      "Subida ao Alto de Inxertado (Mos)",
      "Redondela (união dos Caminhos)",
      "Ponte Sampaio",
      "Subida da Canicouva"
    ],
    pontosCarimbo: [
      "Cafés em Mos",
      "Igreja de Santiago em Redondela",
      "Igreja da Virgem Peregrina (Pontevedra)"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Casucho+da+Peregrina,+Rúa+Ramón+González,+O+Porriño,+Espanha/Acolá+Sport+Hostel,+Rúa+Arcebispo+Malo,+Pontevedra,+Espanha/@42.245833,-8.683333,12z",
    visaoEspiritual: {
      crista: "Jornada de penitência e comunhão, culminando na cidade da Virgem Peregrina.",
      natural: "Diálogo entre a energia da montanha (Mos, Canicouva) e a energia do mar (Ria de Vigo).",
      simbolica: "A superação de grandes desafios e a convergência de caminhos em um único propósito."
    },
    hospedagemAtual: {
      nome: "Casucho da Peregrina",
      endereco: "Rúa Ramón González, O Porriño, Espanha",
      telefone: "+34 986 339 234"
    },
    proximaHospedagem: {
      nome: "Acolá Sport Albergue",
      endereco: "Rúa Arcebispo Malo, Pontevedra, Espanha",
      telefone: "+34 986 851 859"
    }
  },
  {
    dia: 8,
    data: "21/09",
    titulo: "Pontevedra a Caldas de Reis",
    pontoPartida: "Acolá Sport Albergue (Pontevedra)",
    pontoChegada: "Villa Termal Caldas de Reis",
    distancia: 22,
    tempoEstimado: "5-6 horas",
    dificuldade: "Moderada",
    clima: "15°C - 24°C",
    descricao: "Um dia de recuperação após a longa etapa anterior. O caminho o leva através de paisagens rurais até as famosas termas de Caldas de Reis.",
    marcosImportantes: [
      "Saída de Pontevedra",
      "Barro",
      "Ponte Romana de Caldas de Reis"
    ],
    pontosCarimbo: [
      "Igreja de Santa María de Barro",
      "Termas de Caldas de Reis",
      "Villa Termal"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Pontevedra/Caldas+de+Reis",
    visaoEspiritual: {
      crista: "Um dia de purificação e cura, conectando-se com as águas termais sagradas.",
      natural: "Conexão com a energia curativa das águas termais e a paisagem rural galega.",
      simbolica: "As termas como símbolo de renovação e preparação para a etapa final."
    },
    hospedagemAtual: {
      nome: "Acolá Sport Albergue",
      endereco: "Rúa Arcebispo Malo, Pontevedra, Espanha",
      telefone: "+34 986 851 859"
    },
    proximaHospedagem: {
      nome: "Villa Termal Caldas de Reis",
      endereco: "Avenida Balneario, Caldas de Reis, Espanha",
      telefone: "+34 986 540 000"
    }
  },
  {
    dia: 9,
    data: "22/09",
    titulo: "Caldas de Reis a Padrón",
    pontoPartida: "Villa Termal Caldas de Reis",
    pontoChegada: "Casa Rural Rústica (Padrón)",
    distancia: 19,
    tempoEstimado: "4.5-5.5 horas",
    dificuldade: "Moderada",
    clima: "15°C - 23°C",
    descricao: "Penúltimo dia da jornada. O caminho o leva até Padrón, onde segundo a tradição, chegou o corpo do Apóstolo Santiago.",
    marcosImportantes: [
      "Valga",
      "Pontecesures",
      "Igreja de Santiago de Padrón"
    ],
    pontosCarimbo: [
      "Igreja de Valga",
      "Ponte de Pontecesures",
      "Igreja de Santiago de Padrón"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Caldas+de+Reis/Padrón",
    visaoEspiritual: {
      crista: "Chegada ao local sagrado onde desembarcou o corpo do Apóstolo Santiago.",
      natural: "Conexão com o rio Ulla e a energia das terras sagradas de Santiago.",
      simbolica: "Padrón como o portal final antes da chegada à Catedral de Santiago."
    },
    hospedagemAtual: {
      nome: "Villa Termal Caldas de Reis",
      endereco: "Avenida Balneario, Caldas de Reis, Espanha",
      telefone: "+34 986 540 000"
    },
    proximaHospedagem: {
      nome: "Casa Rural Rústica",
      endereco: "Rúa Dolores, Padrón, Espanha",
      telefone: "+34 981 810 200"
    }
  },
  {
    dia: 10,
    data: "23/09",
    titulo: "Padrón a Santiago de Compostela",
    pontoPartida: "Casa Rural Rústica (Padrón)",
    pontoChegada: "Catedral de Santiago de Compostela",
    distancia: 25,
    tempoEstimado: "6-7 horas",
    dificuldade: "Moderada",
    clima: "14°C - 22°C",
    descricao: "O dia final! A chegada à Catedral de Santiago de Compostela, o objetivo de toda a jornada. Um momento de profunda emoção e realização espiritual.",
    marcosImportantes: [
      "Escravitude",
      "Rúa de Francos",
      "Catedral de Santiago de Compostela",
      "Praça do Obradoiro"
    ],
    pontosCarimbo: [
      "Últimas igrejas no caminho",
      "Catedral de Santiago",
      "Escritório do Peregrino (Compostela)"
    ],
    linkGoogleMaps: "https://www.google.com/maps/dir/Padrón/Santiago+de+Compostela",
    visaoEspiritual: {
      crista: "A chegada ao túmulo do Apóstolo Santiago. Momento de profunda gratidão e renovação espiritual.",
      natural: "Conexão final com a energia sagrada de Santiago, o 'campo da estrela'.",
      simbolica: "A conclusão da jornada exterior e o início de uma nova jornada interior transformada."
    },
    hospedagemAtual: {
      nome: "Casa Rural Rústica",
      endereco: "Rúa Dolores, Padrón, Espanha",
      telefone: "+34 981 810 200"
    },
    proximaHospedagem: {
      nome: "Catedral de Santiago de Compostela",
      endereco: "Praça do Obradoiro, Santiago de Compostela",
      telefone: "Meta Final - Buen Camino!"
    }
  }
];

const reservasHoteis = [
  { data: '14/09/2025', local: 'Vairão / Fajozes', nome: 'A Casa da Estrela', endereco: 'Rua das Póvoas 25, 4485-086 Fajozes, Portugal', telefone: '+351 934 473 861' },
  { data: '15/09/2025', local: 'Barcelos', nome: 'Bagoeira Hotel Restaurante', endereco: 'Av. Dr. Sidónio Pais 495, 4750-333 Barcelos, Portugal', telefone: '+351 253 809 500' },
  { data: '16/09/2025', local: 'Vitorino dos Piães', nome: 'Casa dos Barros', endereco: 'Rua de Vilhadiz 362, 4990-812 Vitorino dos Piães, Portugal', telefone: '+351 924 076 250' },
  { data: '17/09/2025', local: 'Ponte de Lima', nome: 'Pousada De Juventude', endereco: 'Rua Papa João Paulo II, 4990-062 Ponte de Lima, Portugal', telefone: '+351 258 751 321' },
  { data: '18/09/2025', local: 'Rubiães', nome: 'Repouso do Peregrino', endereco: 'Estrada de S. Pedro de Rubiães, Nº 2192, 4940-691 Paredes de Coura, Portugal', telefone: '+351 911 136 984' },
  { data: '19/09/2025', local: 'O Porriño', nome: 'Casucho da Peregrina', endereco: 'Rua Antonio Palacios 52 Bajo, 36400, O Porriño, Espanha', telefone: '+34 628 63 59 47' },
  { data: '20/09/2025', local: 'Arcade / Pontevedra', nome: 'Acolá Sport Albergue', endereco: 'Rúa Arcebispo Malvar 11, 36002 Pontevedra, Espanha', telefone: '+34 678 68 07 58' },
  { data: '21/09/2025', local: 'Briallos / Caldas de Reis', nome: 'Pensión As Burgas', endereco: 'Rúa Xoan Fuentes Echevarria, 21, 4 A 36650 Caldas de Reis, Espanha', telefone: '+34 615 033 297' },
  { data: '22/09/2025', local: 'Padrón', nome: 'Ecorooms Bed & Breakfast', endereco: '19 Rúa Travesía Campo da Feira, 15900 Padrón, Espanha', telefone: '+34 686 55 26 18' },
  { data: '23/09/2025', local: 'Santiago', nome: 'Casa Diocesana VIA LUCIS', endereco: 'Rúa de José María Suárez Núñez, 1, 15705 Santiago de Compostela, Espanha', telefone: '+34 981 59 22 28' }
];

// Lista completa de checklist
const checklistCompleta = [
  { id: 1, item: 'Minancura ou pomada para o dia', categoria: 'Medicamentos', checked: false, essencial: true },
  { id: 2, item: 'Talco antisséptico', categoria: 'Medicamentos', checked: false, essencial: true },
  { id: 3, item: 'Passaporte', categoria: 'Documentos', checked: false, essencial: true },
  { id: 4, item: 'Credencial do Peregrino', categoria: 'Documentos', checked: false, essencial: true },
  { id: 5, item: 'Cartão de crédito internacional', categoria: 'Documentos', checked: false, essencial: true },
  { id: 6, item: 'Euros em espécie', categoria: 'Documentos', checked: false, essencial: true },
  { id: 7, item: 'Seguro viagem', categoria: 'Documentos', checked: false, essencial: true },
  { id: 8, item: 'Botas de caminhada (já amaciadas)', categoria: 'Calçados', checked: false, essencial: true },
  { id: 9, item: 'Sandálias para descanso', categoria: 'Calçados', checked: false, essencial: true },
  { id: 10, item: 'Meias de caminhada (3 pares)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 11, item: 'Camisetas dry-poliester ou fit (2 a 4 unidades)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 12, item: 'Camiseta de manga longa (1 unidade)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 13, item: 'Calças de caminhada (2 unidades)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 14, item: 'Jaqueta corta vento e impermeável (1 unidade)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 15, item: 'Boné ou chapéu para proteção solar (1 unidade)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 16, item: 'Gorro leve (1 unidade)', categoria: 'Roupas', checked: false, essencial: false },
  { id: 17, item: 'Roupa íntima (6 peças)', categoria: 'Roupas', checked: false, essencial: true },
  { id: 18, item: 'Band-aid para bolhas', categoria: 'Medicamentos', checked: false, essencial: true },
  { id: 19, item: 'Ibuprofeno', categoria: 'Medicamentos', checked: false, essencial: true },
  { id: 20, item: 'Protetor solar FPS 50+', categoria: 'Medicamentos', checked: false, essencial: true },
  { id: 21, item: 'Mochila 35-40L', categoria: 'Equipamentos', checked: false, essencial: true },
  { id: 22, item: 'Capa Protetora de Chuva', categoria: 'Equipamentos', checked: false, essencial: true },
  { id: 23, item: 'Bastão de caminhada', categoria: 'Equipamentos', checked: false, essencial: false },
  { id: 24, item: 'Saco de dormir (se necessário)', categoria: 'Equipamentos', checked: false, essencial: false },
  { id: 25, item: 'Garrafa de água 1L', categoria: 'Equipamentos', checked: false, essencial: true },
  { id: 26, item: 'Adaptador de tomada europeu', categoria: 'Verificar em Portugal', checked: false, essencial: false },
  { id: 27, item: 'Chip de celular local', categoria: 'Verificar em Portugal', checked: false, essencial: false },
  { id: 28, item: 'Comida para trilha', categoria: 'Verificar em Portugal', checked: false, essencial: false },
  { id: 29, item: 'Par de luvas leves', categoria: 'Roupas', checked: false, essencial: false },
  { id: 30, item: 'Sabonete', categoria: 'Higiene Pessoal', checked: false, essencial: false },
  { id: 31, item: 'Shampoo', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 32, item: 'Escova de dente', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 33, item: 'Creme Dental', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 34, item: 'Fio Dental', categoria: 'Higiene Pessoal', checked: false, essencial: false },
  { id: 35, item: 'Desodorante pequeno', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 36, item: 'Protetor solar', categoria: 'Higiene Pessoal', checked: false, essencial: false },
  { id: 37, item: 'Protetor labial', categoria: 'Higiene Pessoal', checked: false, essencial: false },
  { id: 38, item: 'Papel higiênico ou lenço umedecido', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 39, item: 'Toalha de secagem rápida', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 40, item: 'Pente ou escova de cabelo', categoria: 'Higiene Pessoal', checked: false, essencial: false },
  { id: 41, item: 'Hidratante para pés e corpo', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 42, item: 'Fone de ouvidos', categoria: 'Equipamentos', checked: false, essencial: false },
  { id: 43, item: 'Power bank ou placa solar leve', categoria: 'Equipamentos', checked: false, essencial: false },
  { id: 44, item: 'Fita adesiva esportiva ou esparadrapo', categoria: 'Higiene Pessoal', checked: false, essencial: false },
  { id: 45, item: 'Repelente de insetos', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 46, item: 'Gel ou pomada para dores musculares', categoria: 'Higiene Pessoal', checked: false, essencial: true },
  { id: 47, item: 'Sacos estanques ou ziploc', categoria: 'Outros', checked: false, essencial: false },
  { id: 48, item: 'Corda ou elástico para pendurar roupas para secar', categoria: 'Outros', checked: false, essencial: false },
  { id: 49, item: 'Grampos ou alfinetes para pendurar roupas na mochila', categoria: 'Outros', checked: false, essencial: false },
  { id: 50, item: 'Tampão de ouvido para a noite', categoria: 'Outros', checked: false, essencial: false },
  { id: 51, item: 'Máscara de dormir', categoria: 'Outros', checked: false, essencial: false },
  { id: 52, item: 'Lanterna pequena ou headlamp', categoria: 'Equipamentos', checked: false, essencial: true },
  { id: 53, item: 'Carregador de celular', categoria: 'Equipamentos', checked: false, essencial: true }
];

// Reflexões espirituais completas
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

// ===================================================================================
// COMPONENTE PRINCIPAL
// ===================================================================================

const SantiagoAssistant = () => {
  const [currentTab, setCurrentTab] = useState('roteiro');
  const [currentLocation, setCurrentLocation] = useState('');
  const [walkingSpeed, setWalkingSpeed] = useState(4);
  const [currentDay, setCurrentDay] = useState(1);
  const [checklist, setChecklist] = useState(() => {
    // Carregar do localStorage ou usar lista completa
    const saved = localStorage.getItem('santiago-checklist');
    return saved ? JSON.parse(saved) : checklistCompleta;
  });
  const [customItem, setCustomItem] = useState('');
  const [customCategory, setCustomCategory] = useState('Outros');

  const categorias = ['Documentos', 'Roupas', 'Calçados', 'Medicamentos', 'Equipamentos', 'Higiene Pessoal', 'Verificar em Portugal', 'Outros'];

  // Salvar no localStorage sempre que o checklist mudar
  useEffect(() => {
    localStorage.setItem('santiago-checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Funções utilitárias
  const calculateTimeToNext = (distance) => {
    if (!distance || walkingSpeed <= 0) return 0;
    return Math.round((distance / walkingSpeed) * 60);
  };

  const formatTime = (minutes) => {
    if (minutes <= 0) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
  };

  // Funções do checklist
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

  // Função para exportar para Excel
  const exportToExcel = () => {
    // Criar dados para o Excel
    const excelData = checklist.map(item => ({
      'Item': item.item,
      'Categoria': item.categoria,
      'Essencial': item.essencial ? 'Sim' : 'Não',
      'Concluído': item.checked ? 'Sim' : 'Não',
      'Status': item.checked ? '✅' : '⏳'
    }));

    // Criar estatísticas
    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => item.checked).length;
    const essentialItems = checklist.filter(item => item.essencial).length;
    const completedEssential = checklist.filter(item => item.essencial && item.checked).length;

    const statsData = [
      { 'Estatística': 'Total de Itens', 'Valor': totalItems },
      { 'Estatística': 'Itens Concluídos', 'Valor': completedItems },
      { 'Estatística': 'Progresso Geral', 'Valor': `${Math.round((completedItems / totalItems) * 100)}%` },
      { 'Estatística': 'Itens Essenciais', 'Valor': essentialItems },
      { 'Estatística': 'Essenciais Concluídos', 'Valor': completedEssential },
      { 'Estatística': 'Progresso Essenciais', 'Valor': `${Math.round((completedEssential / essentialItems) * 100)}%` }
    ];

    // Criar conteúdo CSV
    const csvContent = [
      // Cabeçalho das estatísticas
      'ESTATÍSTICAS DA LISTA - CAMINHO DE SANTIAGO',
      '',
      'Estatística,Valor',
      ...statsData.map(row => `${row.Estatística},${row.Valor}`),
      '',
      '',
      // Cabeçalho dos itens
      'LISTA COMPLETA DE ITENS',
      '',
      'Item,Categoria,Essencial,Concluído,Status',
      ...excelData.map(row => `"${row.Item}",${row.Categoria},${row.Essencial},${row.Concluído},${row.Status}`)
    ].join('\n');

    // Criar e baixar arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `lista-santiago-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para resetar lista
  const resetChecklist = () => {
    if (confirm('Tem certeza que deseja resetar toda a lista? Esta ação não pode ser desfeita.')) {
      setChecklist(checklistCompleta);
      localStorage.removeItem('santiago-checklist');
    }
  };

  // ===================================================================================
  // RENDERIZAÇÃO DAS ABAS
  // ===================================================================================

  const renderRoteiroCalculadora = () => {
    const currentIndex = roteiroCompleto.findIndex(etapa => etapa.pontoPartida.includes(currentLocation));
    const currentEtapa = currentIndex >= 0 ? roteiroCompleto[currentIndex] : roteiroCompleto[0];
    const nextEtapa = currentIndex >= 0 && currentIndex < roteiroCompleto.length - 1 ? roteiroCompleto[currentIndex + 1] : null;

    const calcularTempo = (distancia, velocidade) => {
      const tempo = distancia / velocidade;
      const horas = Math.floor(tempo);
      const minutos = Math.round((tempo - horas) * 60);
      return `${horas}h${minutos > 0 ? ` ${minutos}min` : ''}`;
    };

    const getDificuldadeColor = (dificuldade) => {
      switch (dificuldade) {
        case 'Fácil': return 'bg-green-100 text-green-800 border-green-200';
        case 'Moderada': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Difícil': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    return (
      <div className="space-y-6">
        {/* Calculadora de Tempo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              Calculadora de Tempo & Roteiro
            </CardTitle>
            <CardDescription>
              Calcule o tempo de caminhada baseado na sua velocidade e explore informações detalhadas de cada etapa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Localização Atual</label>
                <Select onValueChange={setCurrentLocation} value={currentLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua localização" />
                  </SelectTrigger>
                  <SelectContent>
                    {roteiroCompleto.map(etapa => (
                      <SelectItem key={etapa.dia} value={etapa.pontoPartida.split('(')[0].trim()}>
                        Dia {etapa.dia} - {etapa.pontoPartida.split('(')[0].trim()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Velocidade de Caminhada</label>
                <Select onValueChange={(value) => setWalkingSpeed(Number(value))} value={String(walkingSpeed)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 km/h (Ritmo Lento)</SelectItem>
                    <SelectItem value="4">4 km/h (Ritmo Moderado)</SelectItem>
                    <SelectItem value="5">5 km/h (Ritmo Rápido)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Informações da Etapa Atual */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Dia {currentEtapa.dia} - {currentEtapa.data}
                </h3>
                <Badge className={`${getDificuldadeColor(currentEtapa.dificuldade)} border`}>
                  {currentEtapa.dificuldade}
                </Badge>
              </div>
              
              <h4 className="text-lg font-medium text-blue-800 mb-3">{currentEtapa.titulo}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    <strong>Distância:</strong> {currentEtapa.distancia} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    <strong>Tempo Calculado:</strong> {calcularTempo(currentEtapa.distancia, walkingSpeed)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    <strong>Clima:</strong> {currentEtapa.clima}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{currentEtapa.descricao}</p>

              {/* Marcos Importantes */}
              {currentEtapa.marcosImportantes && (
                <div className="mb-4">
                  <h5 className="font-medium text-blue-800 mb-2">📍 Marcos Importantes:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {currentEtapa.marcosImportantes.map((marco, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {marco}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pontos de Carimbo */}
              {currentEtapa.pontosCarimbo && (
                <div className="mb-4">
                  <h5 className="font-medium text-blue-800 mb-2">🏷️ Pontos para Carimbo:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {currentEtapa.pontosCarimbo.map((ponto, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {ponto}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link Google Maps */}
              {currentEtapa.linkGoogleMaps && (
                <div className="mb-4">
                  <a 
                    href={currentEtapa.linkGoogleMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Map className="h-4 w-4" />
                    Ver Trajeto no Google Maps
                  </a>
                </div>
              )}

              {/* Visões Espirituais */}
              {currentEtapa.visaoEspiritual && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white/70 rounded-lg p-3 border border-blue-100">
                    <h6 className="font-medium text-blue-800 mb-1">✝️ Visão Cristã</h6>
                    <p className="text-xs text-gray-600">{currentEtapa.visaoEspiritual.crista}</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-green-100">
                    <h6 className="font-medium text-green-800 mb-1">🌿 Visão Natural</h6>
                    <p className="text-xs text-gray-600">{currentEtapa.visaoEspiritual.natural}</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-purple-100">
                    <h6 className="font-medium text-purple-800 mb-1">🔮 Visão Simbólica</h6>
                    <p className="text-xs text-gray-600">{currentEtapa.visaoEspiritual.simbolica}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Hospedagens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="border-green-200">
                <CardHeader className="bg-green-50/50 pb-3">
                  <CardTitle className="text-green-800 text-sm flex items-center gap-2">
                    <Hotel className="h-4 w-4" />
                    Hospedagem Atual
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <h4 className="font-medium text-green-900">{currentEtapa.hospedagemAtual.nome}</h4>
                  <p className="text-sm text-gray-600 mb-2">{currentEtapa.hospedagemAtual.endereco}</p>
                  <a 
                    href={`tel:${currentEtapa.hospedagemAtual.telefone}`}
                    className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
                  >
                    <Phone className="h-3 w-3" />
                    {currentEtapa.hospedagemAtual.telefone}
                  </a>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50/50 pb-3">
                  <CardTitle className="text-blue-800 text-sm flex items-center gap-2">
                    <Hotel className="h-4 w-4" />
                    Próxima Hospedagem
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <h4 className="font-medium text-blue-900">{currentEtapa.proximaHospedagem.nome}</h4>
                  <p className="text-sm text-gray-600 mb-2">{currentEtapa.proximaHospedagem.endereco}</p>
                  <a 
                    href={`tel:${currentEtapa.proximaHospedagem.telefone}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Phone className="h-3 w-3" />
                    {currentEtapa.proximaHospedagem.telefone}
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Estatísticas Gerais */}
            <Card className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800 text-lg">📊 Estatísticas da Jornada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {roteiroCompleto.reduce((acc, etapa) => acc + etapa.distancia, 0)} km
                    </div>
                    <div className="text-sm text-gray-600">Distância Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">10</div>
                    <div className="text-sm text-gray-600">Dias de Caminhada</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {calcularTempo(roteiroCompleto.reduce((acc, etapa) => acc + etapa.distancia, 0), walkingSpeed)}
                    </div>
                    <div className="text-sm text-gray-600">Tempo Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(roteiroCompleto.reduce((acc, etapa) => acc + etapa.distancia, 0) / 10 * 10) / 10} km
                    </div>
                    <div className="text-sm text-gray-600">Média por Dia</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderListaItens = () => {
    const groupedItems = categorias.reduce((acc, categoria) => {
      acc[categoria] = checklist.filter(item => item.categoria === categoria);
      return acc;
    }, {});

    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => item.checked).length;
    const essentialItems = checklist.filter(item => item.essencial).length;
    const completedEssential = checklist.filter(item => item.essencial && item.checked).length;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Lista Personalizada - 7 Peregrinos
                </CardTitle>
                <CardDescription>
                  Marque os itens conforme forem sendo preparados. Itens essenciais estão marcados com ⭐
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={exportToExcel} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Excel
                </Button>
                <Button onClick={resetChecklist} variant="outline" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Resetar
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Estatísticas Gerais */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">📊 Estatísticas do Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">{completedItems}</p>
                <p className="text-sm text-blue-800">de {totalItems} itens</p>
                <p className="text-xs text-gray-600">Progresso Geral</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-green-600">{Math.round((completedItems / totalItems) * 100)}%</p>
                <p className="text-sm text-green-800">Concluído</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-orange-600">{completedEssential}</p>
                <p className="text-sm text-orange-800">de {essentialItems} essenciais</p>
                <p className="text-xs text-gray-600">Itens Críticos</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-purple-600">{Math.round((completedEssential / essentialItems) * 100)}%</p>
                <p className="text-sm text-purple-800">Essenciais OK</p>
                <p className="text-xs text-gray-600">Prioridade</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso Geral</span>
                <span>{completedItems}/{totalItems}</span>
              </div>
              <Progress value={(completedItems / totalItems) * 100} className="w-full h-3" />
            </div>
          </CardContent>
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
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                placeholder="Digite o item..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
              />
              <Select value={customCategory} onValueChange={setCustomCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addCustomItem} className="w-full md:w-auto">
                <Plus size={16} />
                <span className="ml-2 md:hidden">Adicionar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderJornadaEspiritual = () => {
    const currentReflection = reflexoesEspirituais.find(r => r.dia === currentDay);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Jornada Espiritual Diária
            </CardTitle>
            <CardDescription>
              Reflexões e práticas para nutrir sua alma durante o Caminho.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => setCurrentDay(Number(value))} value={String(currentDay)}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Selecione o Dia" />
              </SelectTrigger>
              <SelectContent>
                {reflexoesEspirituais.map(ref => (
                  <SelectItem key={ref.dia} value={String(ref.dia)}>
                    Dia {ref.dia} - {ref.titulo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentReflection ? (
              <div className="space-y-6">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    Dia {currentReflection.dia} - {currentReflection.titulo}
                  </h3>
                </div>
                
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="bg-blue-50/50">
                    <CardTitle className="text-blue-800 flex items-center gap-2">
                      📖 Reflexão Bíblica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="font-medium mb-2">{currentReflection.biblico}</p>
                    <p className="text-sm text-gray-700">
                      <strong>Tema:</strong> {currentReflection.temaBiblico}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="bg-green-50/50">
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      🌿 Sabedoria Druídica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-2">{currentReflection.druidico}</p>
                    <p className="text-sm text-gray-700">
                      <strong>Conexão:</strong> {currentReflection.conexaoDruidica}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="bg-purple-50/50">
                    <CardTitle className="text-purple-800 flex items-center gap-2">
                      ✨ Um Curso em Milagres
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="font-medium mb-2">{currentReflection.cursoMilagres}</p>
                    <p className="text-sm text-gray-700">
                      <strong>Aplicação:</strong> {currentReflection.aplicacaoCursoMilagres}
                    </p>
                  </CardContent>
                </Card>

                {currentReflection.diarioMago && (
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="bg-orange-50/50">
                      <CardTitle className="text-orange-800 flex items-center gap-2">
                        🧙‍♂️ O Diário de um Mago
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="mb-1"><strong>Ensinamento:</strong> {currentReflection.diarioMago.ensinamento}</p>
                      <p className="mb-1"><strong>Símbolo:</strong> {currentReflection.diarioMago.simbolo}</p>
                      <p><strong>Prática:</strong> {currentReflection.diarioMago.pratica}</p>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-l-4 border-l-indigo-500">
                  <CardHeader className="bg-indigo-50/50">
                    <CardTitle className="text-indigo-800 flex items-center gap-2">
                      💭 Reflexão Geral
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p>{currentReflection.reflexao}</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-rose-500">
                  <CardHeader className="bg-rose-50/50">
                    <CardTitle className="text-rose-800 flex items-center gap-2">
                      🙏 Prática Diária
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p>{currentReflection.praticaDiaria}</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>Selecione um dia para ver a reflexão espiritual.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderReservas = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5" />
            Suas Reservas de Hospedagem
          </CardTitle>
          <CardDescription>
            Lista de todas as suas paradas confirmadas. Clique no endereço para abrir no mapa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reservasHoteis.map((reserva, index) => (
            <Card key={index} className="border-l-4 border-purple-500">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-purple-700 font-semibold">{reserva.data}</p>
                    <CardTitle className="text-lg">{reserva.nome}</CardTitle>
                    <CardDescription>{reserva.local}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-purple-300 text-purple-800">
                    Dia {index + 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={14} className="text-gray-600" />
                  <a href={`tel:${reserva.telefone}`} className="text-gray-800 hover:underline">
                    {reserva.telefone}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Map size={14} className="text-gray-600 mt-1" />
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(reserva.endereco)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-blue-600 hover:underline"
                  >
                    {reserva.endereco}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // ===================================================================================
  // RENDERIZAÇÃO PRINCIPAL
  // ===================================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">🚶‍♂️</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Assistente do Caminho de Santiago
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seu guia personalizado para a jornada ao longo do Caminho Português Central. 
            Organize sua lista, acompanhe o roteiro e nutra sua alma com reflexões espirituais.
          </p>
        </header>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto bg-white/80 backdrop-blur-sm border shadow-lg rounded-xl p-1">
              <TabsTrigger 
                value="roteiro" 
                className="flex items-center gap-2 text-xs md:text-sm px-2 md:px-4 py-2 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200"
              >
                <MapPin size={16} />
                <span className="hidden sm:inline">Roteiro & Calculadora</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lista" 
                className="flex items-center gap-2 text-xs md:text-sm px-2 md:px-4 py-2 rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-200"
              >
                <Package size={16} />
                <span className="hidden sm:inline">Lista</span>
              </TabsTrigger>
              <TabsTrigger 
                value="espiritual" 
                className="flex items-center gap-2 text-xs md:text-sm px-2 md:px-4 py-2 rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all duration-200"
              >
                <Heart size={16} />
                <span className="hidden sm:inline">Espiritual</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reservas" 
                className="flex items-center gap-2 text-xs md:text-sm px-2 md:px-4 py-2 rounded-lg data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all duration-200"
              >
                <Hotel size={16} />
                <span className="hidden sm:inline">Reservas</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="animate-in fade-in-50 duration-300">
            <TabsContent value="roteiro" className="mt-6">
              {renderRoteiroCalculadora()}
            </TabsContent>

            <TabsContent value="lista" className="mt-6">
              {renderListaItens()}
            </TabsContent>

            <TabsContent value="espiritual" className="mt-6">
              {renderJornadaEspiritual()}
            </TabsContent>

            <TabsContent value="reservas" className="mt-6">
              {renderReservas()}
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <div className="border-t border-gray-200 pt-6">
            <p>✨ Buen Camino! Que sua jornada seja abençoada ✨</p>
            <p className="mt-2">Criado com ❤️ para os peregrinos do Caminho Português Central</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <SantiagoAssistant />
    </div>
  );
}

export default SantiagoAssistant;

