// Exercícios padrão disponíveis para todos os usuários
export const exerciciosPadrao = [
  {
    id: "padrao-1",
    nome: "Corrida estacionária",
    tipoExercicio: "cardio",
    nivelForca: 4,
    caloriasPorMinuto: 8,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/corrida-447724.jpg",
    descricao: "Simula a corrida no lugar, elevando os joelhos rapidamente para trabalhar o sistema cardiorrespiratório e melhorar o condicionamento físico.",
    isPublico: true
  },
  {
    id: "padrao-2",
    nome: "Polichinelos",
    tipoExercicio: "cardio",
    nivelForca: 4,
    caloriasPorMinuto: 10,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440212.jpg",
    descricao: "Em pé, salte abrindo pernas e levantando os braços acima da cabeça, depois volte à posição inicial, repetindo de forma contínua para aumentar a frequência cardíaca.",
    isPublico: true
  },
  {
    id: "padrao-3",
    nome: "Pular corda",
    tipoExercicio: "cardio",
    nivelForca: 5,
    caloriasPorMinuto: 12,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "Segure uma corda com as duas mãos e salte repetidamente, passando a corda sob os pés, trabalhando o coração, as pernas e a coordenação motora.",
    isPublico: true
  },
  {
    id: "padrao-4",
    nome: "Burpees",
    tipoExercicio: "cardio",
    nivelForca: 5,
    caloriasPorMinuto: 12,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/02/agachamento-sumo.jpg?quality=95&strip=info&w=1024&crop=1",
    descricao: "Inicie em posição de agachamento, coloque as mãos no chão e estenda as pernas atrás em uma prancha, execute uma flexão, depois salte puxando as pernas de volta ao peito e termine com um salto ereto.",
    isPublico: true
  },
  {
    id: "padrao-5",
    nome: "Mountain Climbers",
    tipoExercicio: "cardio",
    nivelForca: 4,
    caloriasPorMinuto: 10,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Na posição de prancha com braços estendidos, leve alternadamente cada joelho em direção ao peito de forma dinâmica, mantendo o abdômen contraído para trabalhar o core e o sistema cardiovascular.",
    isPublico: true
  },
  {
    id: "padrao-6",
    nome: "High knees (Elevação de joelhos)",
    tipoExercicio: "cardio",
    nivelForca: 4,
    caloriasPorMinuto: 9,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/corrida-447724.jpg",
    descricao: "Em pé no mesmo lugar, levante os joelhos em direção ao peito alternadamente, mantendo o tronco ereto e contraindo o abdômen. Aumenta a frequência cardíaca e trabalha pernas e abdômen.",
    isPublico: true
  },
  {
    id: "padrao-7",
    nome: "Agachamento com salto",
    tipoExercicio: "força",
    nivelForca: 5,
    caloriasPorMinuto: 10,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/06/agachamento-salto-180-graus.gif?quality=95&w=1024&crop=1",
    descricao: "Agache como se fosse sentar em uma cadeira invisível e, ao subir, dê um salto explosivo para cima, aterrissando suavemente em outro agachamento. Esse movimento combina força e explosão muscular nas pernas.",
    isPublico: true
  },
  {
    id: "padrao-8",
    nome: "Agachamento sumô",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 7,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/02/agachamento-sumo.jpg?quality=95&strip=info&w=1024&crop=1",
    descricao: "Em pé, com pernas afastadas além da largura dos ombros e pés apontados para fora, agache mantendo o tronco ereto. Esse exercício fortalece coxas internas, glúteos e melhora a estabilidade.",
    isPublico: true
  },
  {
    id: "padrao-9",
    nome: "Agachamento com halteres",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 8,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "Segurando um halter em cada mão ao lado do corpo, agache flexionando joelhos até 90°, mantenha o peito ereto e volte à posição inicial. Trabalha quadríceps, glúteos e core.",
    isPublico: true
  },
  {
    id: "padrao-10",
    nome: "Agachamento isométrico (cadeirinha)",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 5,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/02/ciclo1_cadeirinha.jpg?quality=95&strip=info&w=1024&crop=1",
    descricao: "Encostado em uma parede, deslize lentamente até os joelhos formarem um ângulo de 90°, como se estivesse sentado numa cadeira invisível. Segure a posição por tempo determinado para fortalecer quadríceps.",
    isPublico: true
  },
  {
    id: "padrao-11",
    nome: "Agachamento pistol assistido (na fita)",
    tipoExercicio: "força",
    nivelForca: 5,
    caloriasPorMinuto: 9,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2016/08/3_exerc1.jpg?quality=95&strip=info&w=1024",
    descricao: "Com auxílio de uma fita de suspensão (TRX) ou suporte, segure as alças, estenda uma perna à frente do corpo e agache profundamente sobre a outra, mantendo o tronco alinhado. Fortalece pernas de forma unilateral.",
    isPublico: true
  },
  {
    id: "padrao-12",
    nome: "Avanço (Lunge) alternado",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 6,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-afundo-e-realizado-com-uma-perna-na-frente-e-outra-atras-imagem-maridav--shutterstock-o1belmav9g.jpg",
    descricao: "Em pé, dê um passo à frente com uma perna e flexione ambos os joelhos até o da frente formar 90°, sem deixar o joelho de trás tocar o chão. Retorne à posição inicial e repita com a outra perna.",
    isPublico: true
  },
  {
    id: "padrao-13",
    nome: "Afundo cruzado",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 6,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/06/afundo-cruzado.gif?quality=95&w=1024",
    descricao: "Dê um passo atrás cruzando a perna de trás diagonalmente e agache até o joelho quase tocar o chão. Este movimento trabalha glúteos e a parte interna das coxas, alternando o lado de cada repetição.",
    isPublico: true
  },
  {
    id: "padrao-14",
    nome: "Afundo com joelhada",
    tipoExercicio: "força",
    nivelForca: 5,
    caloriasPorMinuto: 8,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/06/afundo-joelhada-alta.gif?quality=95&w=1024",
    descricao: "A partir do afundo tradicional, ao retornar eleve o joelho de trás em direção ao peito. Esse salto de joelho adiciona intensidade ao exercício e envolve o abdômen de forma dinâmica.",
    isPublico: true
  },
  {
    id: "padrao-15",
    nome: "Deslocamento lateral (com miniband)",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 6,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2016/08/7_exerc1.jpg?quality=95&strip=info&w=1024",
    descricao: "Com uma miniband elástica logo acima dos joelhos, adote posição de agachamento e dê passos laterais mantendo a tensão da banda. Fortalece quadríceps e glúteos e melhora a estabilidade lateral.",
    isPublico: true
  },
  {
    id: "padrao-16",
    nome: "Flexão de braços (push-up)",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 8,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/flexao-440191.jpg",
    descricao: "De bruços, apoie as mãos no chão à largura dos ombros e estenda os braços levantando o tronco. Abaixe controladamente até 90° e volte a subir, mantendo o corpo reto durante todo o movimento.",
    isPublico: true
  },
  {
    id: "padrao-17",
    nome: "Flexão de braços com apoio no joelho",
    tipoExercicio: "força",
    nivelForca: 3,
    caloriasPorMinuto: 6,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/flexao-440191.jpg",
    descricao: "Semelhante à flexão tradicional, mas com os joelhos apoiados no chão. Reduz a carga nos braços, facilitando a execução e permitindo fortalecer peito e tríceps de forma progressiva.",
    isPublico: true
  },
  {
    id: "padrao-18",
    nome: "Mergulho no banco (tríceps dips)",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 5,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de--triceps-447781.jpg",
    descricao: "Sente-se à beira de um banco ou cadeira e apoie as mãos ao lado dos quadris. Estenda as pernas à frente e abaixe o corpo flexionando os cotovelos, depois estenda os braços, focando no tríceps.",
    isPublico: true
  },
  {
    id: "padrao-19",
    nome: "Prancha isométrica",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 3,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "De bruços, apoie antebraços e pontas dos pés no chão, erga o quadril alinhando ombros, quadril e pés. Mantenha o corpo reto e contraia o abdômen por tempo determinado.",
    isPublico: true
  },
  {
    id: "padrao-20",
    nome: "Prancha rotativa",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 4,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "Na posição de prancha alta, gire o tronco para um lado elevando o braço em direção ao teto e volte, depois repita do outro lado. Trabalha os oblíquos e a parte lateral do core.",
    isPublico: true
  },
  {
    id: "padrao-21",
    nome: "Crunch abdominal",
    tipoExercicio: "abdominal",
    nivelForca: 3,
    caloriasPorMinuto: 4,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/02/ciclo1_cadeirinha.jpg?quality=95&strip=info&w=1024&crop=1",
    descricao: "Deite-se de costas, joelhos dobrados e mãos atrás da cabeça. Eleve o tronco em direção aos joelhos, contraindo o abdômen, e desça controladamente. Trabalha principalmente o reto abdominal.",
    isPublico: true
  },
  {
    id: "padrao-22",
    nome: "Abdominal bicicleta",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 6,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "De costas, eleve as pernas em ângulo de 90° e simule pedalar no ar, levando o cotovelo oposto em direção ao joelho. Alternar os lados trabalha abdômen inferior e oblíquos.",
    isPublico: true
  },
  {
    id: "padrao-23",
    nome: "Prancha lateral",
    tipoExercicio: "abdominal",
    nivelForca: 3,
    caloriasPorMinuto: 3,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "De lado, apoie um antebraço no chão alinhando o cotovelo ao ombro e eleve o quadril, mantendo o corpo reto. Segure a posição para fortalecer oblíquos e lateral do core.",
    isPublico: true
  },
  {
    id: "padrao-24",
    nome: "Super-Homem",
    tipoExercicio: "força",
    nivelForca: 3,
    caloriasPorMinuto: 4,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Deite-se de barriga para baixo, estenda os braços à frente e pernas atrás. Eleve simultaneamente braços e pernas alguns centímetros do chão, contraindo glúteos e lombares.",
    isPublico: true
  },
  {
    id: "padrao-25",
    nome: "Elevação de quadril (ponte)",
    tipoExercicio: "força",
    nivelForca: 3,
    caloriasPorMinuto: 3,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "De costas, joelhos dobrados e pés apoiados no chão, eleve o quadril até formar uma linha reta do joelho ao ombro, contraindo os glúteos. Abaixe lentamente e repita.",
    isPublico: true
  },
  {
    id: "padrao-26",
    nome: "Elevação de pernas",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 5,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Deitado de costas, mãos ao lado do corpo, levante ambas as pernas retas até 90° e baixe controladamente sem encostar no chão. Fortalece o abdômen inferior.",
    isPublico: true
  },
  {
    id: "padrao-27",
    nome: "Torção Russa (Russian Twist)",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 4,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Sentado, tronco levemente reclinado e pés elevados, gire o tronco de um lado para o outro tocando as mãos no chão. Trabalha oblíquos e estabilidade do core.",
    isPublico: true
  },
  {
    id: "padrao-28",
    nome: "Flexão de braços diamante",
    tipoExercicio: "força",
    nivelForca: 5,
    caloriasPorMinuto: 8,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/flexao-440191.jpg",
    descricao: "Semelhante à flexão comum, mas com as mãos formando um triângulo sob o peito. Essa variação enfatiza mais o tríceps e a parte interna do peitoral.",
    isPublico: true
  },
  {
    id: "padrao-29",
    nome: "Elevação lateral de halteres",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 5,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "Em pé, segure um halter em cada mão ao lado do corpo. Eleve os braços lateralmente até a linha dos ombros, com cotovelos levemente flexionados. Trabalha deltoides e trapézio.",
    isPublico: true
  },
  {
    id: "padrao-30",
    nome: "Calf Raise (elevação de panturrilha)",
    tipoExercicio: "força",
    nivelForca: 2,
    caloriasPorMinuto: 2,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "Em pé, eleve-se lentamente na ponta dos pés e abaixe de volta. Fortalece músculos da panturrilha. Pode ser feito com apoio para estabilidade.",
    isPublico: true
  },
  {
    id: "padrao-31",
    nome: "Prancha lateral alternada",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 4,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "Faça prancha lateral de um lado, retorne à posição de prancha alta e faça do outro lado. Alternar reforça oblíquos e desafia o equilíbrio.",
    isPublico: true
  },
  {
    id: "padrao-32",
    nome: "Bird-Dog",
    tipoExercicio: "equilíbrio",
    nivelForca: 3,
    caloriasPorMinuto: 3,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Em posição de quatro apoios, estenda simultaneamente o braço direito à frente e a perna esquerda atrás, mantendo o tronco estável. Alterne os lados. Fortalece core e melhora o equilíbrio.",
    isPublico: true
  },
  {
    id: "padrao-33",
    nome: "Hand Walk",
    tipoExercicio: "equilíbrio",
    nivelForca: 4,
    caloriasPorMinuto: 7,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "A partir da posição de prancha, caminhe com as mãos para frente aumentando a distância em cada passo, e depois retorne. Trabalha ombros, core e coordenação motora.",
    isPublico: true
  },
  {
    id: "padrao-34",
    nome: "Mountain climber cruzado",
    tipoExercicio: "cardio",
    nivelForca: 5,
    caloriasPorMinuto: 10,
    imagem: "https://network.grupoabril.com.br/wp-content/uploads/sites/2/2017/02/ciclo1_agachamento-sumo.jpg?quality=95&strip=info&w=1024&crop=1",
    descricao: "Similar ao mountain climber tradicional, mas levando o joelho em direção ao cotovelo oposto em cada repetição. Aumenta o trabalho no core e nos oblíquos.",
    isPublico: true
  },
  {
    id: "padrao-35",
    nome: "Skater jump",
    tipoExercicio: "cardio",
    nivelForca: 4,
    caloriasPorMinuto: 9,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Em um impulso lateral, salte de um pé para o outro como um patinador, cruzando a perna de trás por trás da outra. Trabalha pernas, glúteos e melhora agilidade.",
    isPublico: true
  },
  {
    id: "padrao-36",
    nome: "Ponte com elevação de perna",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 4,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Deitado de costas, execute a ponte normal e, ao elevar o quadril, levante uma perna estendida para o teto. Abaixe a perna, depois desça o quadril. Troque as pernas.",
    isPublico: true
  },
  {
    id: "padrao-37",
    nome: "Prancha com toque no ombro",
    tipoExercicio: "abdominal",
    nivelForca: 4,
    caloriasPorMinuto: 4,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "Em posição de prancha alta, leve uma mão para tocar o ombro oposto, retornando em seguida. Alterne as mãos. Desafia estabilidade dos ombros e do core.",
    isPublico: true
  },
  {
    id: "padrao-38",
    nome: "Alongamento do gato (Cat Stretch)",
    tipoExercicio: "flexibilidade",
    nivelForca: 1,
    caloriasPorMinuto: 1,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Ajoelhado em quatro apoios, arqueie as costas para cima, como um gato, e depois alongue para baixo, mantendo o abdômen apoiado entre os braços. Melhora a mobilidade da coluna lombar.",
    isPublico: true
  },
  {
    id: "padrao-39",
    nome: "Alongamento do peitoral na parede",
    tipoExercicio: "flexibilidade",
    nivelForca: 1,
    caloriasPorMinuto: 1,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "De lado, apoie o antebraço em um batente de porta e gire lentamente o corpo para longe do braço estendido. Alongando o peitoral e o ombro, mantenha por 30 segundos cada lado.",
    isPublico: true
  },
  {
    id: "padrao-40",
    nome: "Alongamento de quadríceps em pé",
    tipoExercicio: "flexibilidade",
    nivelForca: 1,
    caloriasPorMinuto: 1,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "Em pé, flexione um joelho trazendo o calcanhar até o glúteo e segure o pé com a mão para alongar a parte frontal da coxa. Mantenha os quadris alinhados e segure 20-30 segundos.",
    isPublico: true
  },
  {
    id: "padrao-41",
    nome: "Marcha do urso lateral (Bear Crawl lateral)",
    tipoExercicio: "equilíbrio",
    nivelForca: 5,
    caloriasPorMinuto: 8,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/exercicio-fisico-440210.jpg",
    descricao: "Na posição de prancha alta, mova mãos e pés lateralmente mantendo os quadris baixos, como um urso andando de lado. Trabalha core, ombros e coordenação.",
    isPublico: true
  },
  {
    id: "padrao-42",
    nome: "Postura da árvore (Árvore)",
    tipoExercicio: "equilíbrio",
    nivelForca: 2,
    caloriasPorMinuto: 2,
    imagem: "https://midias.agazeta.com.br/2024/08/12/edicaseo-agachamento-com-halter-deve-ser-realizado-com-os-pes-afastados-na-largura-do-quadril-imagem-lunamarina--shutterstock-soxgqum7ts.jpg",
    descricao: "Fique em pé e coloque a planta de um pé na parte interna da outra perna, próximo ao joelho. Una as palmas das mãos acima da cabeça. Fortalece tornozelos e melhora o equilíbrio.",
    isPublico: true
  },
  {
    id: "padrao-43",
    nome: "Alongamento do isquiotibial sentado",
    tipoExercicio: "flexibilidade",
    nivelForca: 1,
    caloriasPorMinuto: 1,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Sentado, estenda uma perna à frente e incline o tronco sobre a perna estendida mantendo o joelho reto. Segure 20-30 segundos para alongar a parte posterior da coxa.",
    isPublico: true
  },
  {
    id: "padrao-44",
    nome: "Alongamento de ombro com braço cruzado",
    tipoExercicio: "flexibilidade",
    nivelForca: 1,
    caloriasPorMinuto: 1,
    imagem: "https://midias.agazeta.com.br/2021/03/29/816x461/exercicio-de-abdominal-447798.jpg",
    descricao: "Estenda um braço à frente do peito e, com o outro braço, puxe o cotovelo esticado em direção oposta ao peito. Mantenha o ombro relaxado para alongar o deltoide posterior.",
    isPublico: true
  },
  {
    id: "padrao-45",
    nome: "Agachamento no step (Step-up)",
    tipoExercicio: "força",
    nivelForca: 4,
    caloriasPorMinuto: 7,
    imagem: "https://midias.agazeta.com.br/2021/03/17/816x461/agachamento-440193.jpg",
    descricao: "Suba em um degrau ou plataforma com uma perna de cada vez, estendendo o quadril no topo do movimento. Abaixe controladamente e repita alternando as pernas. Trabalha glúteos e coxas.",
    isPublico: true
  }
]; 