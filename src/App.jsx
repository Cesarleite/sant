import React, { useState } from 'react';
import { MapPin, Clock, Package, Hotel, Plus, Trash2, Check, Navigation, Calendar, Heart, BookOpen, Mountain, Compass, Phone, Map } from 'lucide-react';
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
// DADOS CENTRALIZADOS DA JORNADA (BASEADO NO DOCUMENTO DE RESERVAS)
// ===================================================================================

const roteiroCompleto = [
  {
    dia: 1,
    data: '14/09/2025',
    pontoPartida: 'Porto',
    pontoChegada: 'Vairão / Fajozes',
    distancia: 25.4,
    dificuldade: 'Média',
    tempoEstimado: '7-8 horas',
    detalhes: 'Saída urbana e desafiadora do Porto, que gradualmente se transforma em paisagens rurais tranquilas. O dia testa a resistência inicial, mas a chegada ao albergue é recompensadora e imersiva no espírito peregrino.',
    pontosCarimbo: 'Sé do Porto (início), igrejas e cafés ao longo do caminho, Albergue de Vairão.'
  },
  {
    dia: 2,
    data: '15/09/2025',
    pontoPartida: 'Vairão / Fajozes',
    pontoChegada: 'Barcelos',
    distancia: 19.1,
    dificuldade: 'Fácil',
    tempoEstimado: '4-5 horas',
    detalhes: 'Etapa mais curta e muito agradável, passando por pontes medievais como a de Zameiro. O percurso é maioritariamente rural, culminando na chegada à vibrante cidade de Barcelos, famosa pela lenda do Galo.',
    pontosCarimbo: 'Albergues, cafés em vilarejos como Pedra Furada, Igreja Matriz de Barcelos.'
  },
  {
    dia: 3,
    data: '16/09/2025',
    pontoPartida: 'Barcelos',
    pontoChegada: 'Vitorino dos Piães',
    distancia: 23.2,
    dificuldade: 'Moderada',
    tempoEstimado: '5-6 horas',
    detalhes: 'Um dia de belas paisagens rurais, com campos e vinhedos. O caminho é tranquilo, com algumas subidas e descidas suaves, preparando o corpo para os desafios seguintes.',
    pontosCarimbo: 'Igrejas locais, cafés e pequenos comércios nos vilarejos.'
  },
  {
    dia: 4,
    data: '17/09/2025',
    pontoPartida: 'Vitorino dos Piães',
    pontoChegada: 'Ponte de Lima',
    distancia: 11.8,
    dificuldade: 'Fácil',
    tempoEstimado: '2-3 horas',
    detalhes: 'Etapa curta para chegar a uma das vilas mais bonitas de Portugal. Aproveite para chegar cedo, descansar e explorar o incrível centro histórico e a famosa ponte romana/medieval sobre o Rio Lima.',
    pontosCarimbo: 'Capelas no caminho, Posto de Turismo e albergues em Ponte de Lima.'
  },
  {
    dia: 5,
    data: '18/09/2025',
    pontoPartida: 'Ponte de Lima',
    pontoChegada: 'Rubiães',
    distancia: 18.3,
    dificuldade: 'Difícil',
    tempoEstimado: '5-6 horas',
    detalhes: 'A etapa "rainha" do Caminho. Inclui a subida íngreme ao Alto da Portela Grande de Labruja. É um desafio físico significativo, mas a vista e a sensação de superação são inesquecíveis.',
    pontosCarimbo: 'Cafés na base da subida, cruz no topo da serra, albergue em Rubiães.'
  },
  {
    dia: 6,
    data: '19/09/2025',
    pontoPartida: 'Rubiães',
    pontoChegada: 'O Porriño (Espanha)',
    distancia: 21.5,
    dificuldade: 'Fácil',
    tempoEstimado: '5-6 horas',
    detalhes: 'Dia da travessia para a Espanha. O caminho leva à cidade-fortaleza de Valença. Ao cruzar a ponte sobre o Rio Minho, você chega em Tui. Lembre-se de adiantar o relógio em 1 hora!',
    pontosCarimbo: 'Catedral de Tui (altamente recomendado), albergues e cafés.'
  },
  {
    dia: 7,
    data: '20/09/2025',
    pontoPartida: 'O Porriño',
    pontoChegada: 'Arcade / Pontevedra',
    distancia: 24.0,
    dificuldade: 'Fácil',
    tempoEstimado: '5-6 horas',
    detalhes: 'A partir daqui, você está oficialmente nos últimos 100km. O trecho inicial pode passar por uma zona industrial (há desvios). A chegada em Arcade, famosa pelas ostras, e depois em Pontevedra, é um grande marco.',
    pontosCarimbo: 'Cafés em Mos, igrejas no caminho, albergues em Redondela e Pontevedra.'
  },
  {
    dia: 8,
    data: '21/09/2025',
    pontoPartida: 'Arcade / Pontevedra',
    pontoChegada: 'Briallos / Caldas de Reis',
    distancia: 22.0,
    dificuldade: 'Fácil',
    tempoEstimado: '5-6 horas',
    detalhes: 'Um dia tranquilo, caminhando por bosques e áreas rurais. O destino é Caldas de Reis, uma cidade termal, perfeita para relaxar os pés nas fontes de água quente públicas.',
    pontosCarimbo: 'Igrejas e bares no caminho, albergues em Caldas de Reis.'
  },
  {
    dia: 9,
    data: '22/09/2025',
    pontoPartida: 'Briallos / Caldas de Reis',
    pontoChegada: 'Padrón',
    distancia: 19.1,
    dificuldade: 'Fácil',
    tempoEstimado: '4-5 horas',
    detalhes: 'Etapa curta e sem grandes dificuldades. Padrón é uma cidade de imensa importância na tradição jacobina, onde o corpo do apóstolo Tiago teria aportado. A ansiedade pela chegada começa a aumentar.',
    pontosCarimbo: 'Igreja de Santiago em Padrón, albergues e cafés.'
  },
  {
    dia: 10,
    data: '23/09/2025',
    pontoPartida: 'Padrón',
    pontoChegada: 'Santiago de Compostela',
    distancia: 25.2,
    dificuldade: 'Moderada',
    tempoEstimado: '6-7 horas',
    detalhes: 'O último dia! A emoção toma conta. A entrada em Santiago é urbana, mas a recompensa é a chegada à majestosa Praça do Obradoiro e a visão da Catedral. É um momento de profunda emoção e realização.',
    pontosCarimbo: 'Igrejas nos subúrbios de Santiago, Oficina do Peregrino (carimbo final).'
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

// ===================================================================================
// COMPONENTE PRINCIPAL
// ===================================================================================

const SantiagoAssistant = () => {
  const [currentTab, setCurrentTab] = useState('roteiro');
  const [currentLocation, setCurrentLocation] = useState('');
  const [walkingSpeed, setWalkingSpeed] = useState(4); // km/h como padrão moderado

  const calculateTimeToNext = (distance) => {
    if (!distance || walkingSpeed <= 0) return 0;
    return Math.round((distance / walkingSpeed) * 60); // em minutos
  };

  const formatTime = (minutes) => {
    if (minutes <= 0) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
  };

  // ABA ROTEIRO
  const renderRoteiro = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mountain className="h-5 w-5" /> Caminho Português Central</CardTitle>
          <CardDescription>Roteiro detalhado de 10 dias, baseado nas suas reservas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {roteiroCompleto.map((etapa) => (
            <Card key={etapa.dia} className="border-l-4 border-green-500 overflow-hidden">
              <CardHeader className="bg-green-50/50 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Dia {etapa.dia}: {etapa.etapa}</CardTitle>
                    <CardDescription>{etapa.data}</CardDescription>
                  </div>
                  <Badge variant="secondary">{etapa.distancia} km</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm text-gray-700">{etapa.detalhes}</p>
                <div className="text-xs p-3 bg-gray-50 rounded-md">
                  <p><strong>Dificuldade:</strong> {etapa.dificuldade}</p>
                  <p><strong>Tempo Total Estimado:</strong> {etapa.tempoEstimado}</p>
                  <p><strong>Pontos para Carimbo:</strong> {etapa.pontosCarimbo}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // ABA CALCULADORA
  const renderCalculadora = () => {
    const currentIndex = roteiroCompleto.findIndex(etapa => etapa.pontoPartida === currentLocation);
    const currentEtapa = currentIndex !== -1 ? roteiroCompleto[currentIndex] : null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Compass className="h-5 w-5" /> Calculadora de Etapa</CardTitle>
            <CardDescription>Selecione seu ponto de partida para ver os detalhes da próxima caminhada.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Velocidade de caminhada:</label>
                <Select value={walkingSpeed.toString()} onValueChange={(value) => setWalkingSpeed(Number(value))}>
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 km/h (Lento/Passeio)</SelectItem>
                    <SelectItem value="4">4 km/h (Moderado/Constante)</SelectItem>
                    <SelectItem value="5">5 km/h (Rápido/Experiente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Onde você está agora?</label>
                <Select value={currentLocation} onValueChange={setCurrentLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione sua localização atual..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roteiroCompleto.map((etapa) => (
                      <SelectItem key={etapa.dia} value={etapa.pontoPartida}>
                        {etapa.pontoPartida} (Início do Dia {etapa.dia})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {currentEtapa ? (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">Sua Próxima Etapa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-blue-900">
                  <p><strong>De:</strong> {currentEtapa.pontoPartida}</p>
                  <p><strong>Para:</strong> {currentEtapa.pontoChegada}</p>
                  <p><strong>Distância:</strong> {currentEtapa.distancia} km</p>
                  <p><strong>Tempo de Caminhada (puro):</strong> {formatTime(calculateTimeToNext(currentEtapa.distancia))} (a {walkingSpeed} km/h)</p>
                  <p><strong>Data Prevista:</strong> {currentEtapa.data}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>Selecione um ponto de partida para ver os detalhes.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // ABA RESERVAS
  const renderReservas = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Hotel className="h-5 w-5" /> Suas Reservas de Hospedagem</CardTitle>
          <CardDescription>Lista de todas as suas paradas confirmadas. Clique no endereço para abrir no mapa.</CardDescription>
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
                  <Badge variant="outline" className="border-purple-300 text-purple-800">Dia {index + 1}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={14} className="text-gray-600" />
                  <a href={`tel:${reserva.telefone}`} className="text-gray-800 hover:underline">{reserva.telefone}</a>
                </div>
                <div className="flex items-start gap-2">
                  <Map size={14} className="text-gray-600 mt-1" />
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(reserva.endereco )}`} 
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
  // RENDERIZAÇÃO PRINCIPAL E ABAS
  // ===================================================================================

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🚶‍♂️ Assistente do Caminho de Santiago
          </h1>
          <p className="text-gray-600">
            Seu guia personalizado para a jornada ao longo do Caminho Português Central.
          </p>
        </header>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-10">
            <TabsTrigger value="roteiro" className="flex items-center gap-2"><MapPin size={16} />Roteiro</TabsTrigger>
            <TabsTrigger value="calculadora" className="flex items-center gap-2"><Clock size={16} />Calculadora</TabsTrigger>
            <TabsTrigger value="reservas" className="flex items-center gap-2"><Hotel size={16} />Reservas</TabsTrigger>
            <TabsTrigger value="espiritual" className="flex items-center gap-2"><Heart size={16} />Jornada Espiritual</TabsTrigger>
          </TabsList>

          <TabsContent value="roteiro" className="mt-6">{renderRoteiro()}</TabsContent>
          <TabsContent value="calculadora" className="mt-6">{renderCalculadora()}</TabsContent>
          <TabsContent value="reservas" className="mt-6">{renderReservas()}</TabsContent>
          <TabsContent value="espiritual" className="mt-6">
            {/* O conteúdo da Jornada Espiritual pode ser adicionado aqui depois, se desejar */}
            <Card>
              <CardHeader>
                <CardTitle>Jornada Espiritual</CardTitle>
                <CardDescription>Em breve, suas reflexões diárias aqui.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Esta seção conterá as reflexões diárias para cada etapa da sua jornada.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// A função App que exporta o componente principal
function App() {
  return (
    <div>
      <SantiagoAssistant />
    </div>
  );
}

export default App;
