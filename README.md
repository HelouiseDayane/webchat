Esse exemplo de sistema consiste em um webchat, para atendimento, sem nenhuma senha pois atende ao publico no geral, bastante simples e sem muitos filtros a nivel didático para uma Breve explicação

É necessário instalação previamente de composer, mysql e node.js na máquina que pretende vizualizar o projeto.
Baixe o projeto.

Em seguida para emular é necessário digitar no terminal (cmd) no local onde foi feito o download deste arquivo.
na pasta webchat_helouise: php artisan serve e na pasta front: npm start. para execução do back-end e front-end.

Foi feito o back-end para ser consumido através de API em PHP e framework Laravel, portanto compatível com qualquer técnologia de front-end, porém escolhi React sem nenhuma predileção.

As Variáveis do sistema para consumo são:
Conversa:
            'id' => $this->id,
            'titulo' => $this->titulo,
            'mensagens' =>MensagemResource::collection($this->mensagens),
            'create_at' =>$this->create_at,
            'update_at' =>$this->updated_at,

Mensagem:
            'id'=>$this->id,
            'conversa_id'=>$this->conversa_id,
            'conteudo' => $this->conteudo,
            'create_at' =>$this->create_at,
            'update_at' =>$this->updated_at,

Ambos com o crud pronto também.

O sistema consiste nas telas:
NovaConversa;
Mensagens;
Conversas;
AreaAtendente;

Desta forma, o usuario entrará a partir da pagina Nova Conversa, o usuário digitará o titulo (pergunta, reclamação,elogio) deixei titulo para ficar abrangente, em seguida Clicar no botão ao lado que levará 
a Mensagens, e lá o usuário poderá entrar em contato com um atendente.
Na Area do atendente, não exibido na tela, o Atendente, terá a lista de atendimento, clicará no titulo e lá o mesmo poderá interagir com o cliente, tanto para o usuario quanto para o atendente terá a opção de 
finalizar atedendimento, para o atendente será ocultado na lista de atendimentos, o atendimento já finalizado podendo escolher outros atendimentos na lista que ainda nao foram atendidos.
Em Conversas, você verá uma lista de conversas, solicitadas por titulo e ao cicar no titulo, ele abrirá um modal com as mensagens realizadas naquele atendimento.
(observação: caso não seja direcionado por NovaConversa, a pagina Mensagem irá vim desativada, pois é necessário um id do titulo que é salvo quando insere um titulo na pagina Nova conversa).

Fico à disposição para esclarecimentos futuros.

Atencionsamente,
Helouise Dayane 
helouisedayane@gmail.com
