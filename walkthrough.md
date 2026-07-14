# Walkthrough: Transição para Node.js & Alwaysdata MySQL

Concluímos com sucesso a transição da aplicação estática baseada em `localStorage` para uma aplicação web dinâmica suportada por um servidor **Node.js (Express)** e conectada remotamente à base de dados MySQL no **Alwaysdata**, além de implementar novas funcionalidades de administração, afiliados e identidade de marca.

---

## Novas Funcionalidades e Melhorias Efetuadas

### 1. Documentos e Ficheiros Consolidados 📁
* Fundiu-se a visualização do comprovativo de pagamento e dos ficheiros adicionais do pedido num único modal inteligente **"Ver Ficheiros"**, simplificando o fluxo do painel administrativo.

### 2. Integração de Formulários Completa (Detalhes do Pedido) 📝
* **Banco de Dados:** Adicionada a coluna `detalhes` (tipo `LONGTEXT`) na tabela `orders`.
* **Frontend:** A submissão do formulário (`submitOrder`) agora lê e agrupa automaticamente todos os campos específicos preenchidos pelo cliente (ex: tema, curso, orientador, prazo, páginas).
* **Painel Admin:** Adicionado o botão **"📝 Detalhes"** que abre um modal estilizado com toda a informação estruturada do formulário do cliente.

### 3. Sistema de Notificações para Afiliados 🔔
* **Admin:** Nova secção de envio de notificações onde se pode definir o título, a mensagem, o destinatário (todos ou um afiliado específico) e a categoria (Geral, 🎉 Promoção, 🆕 Novidade, 🎁 Oferta, 📦 Novo Produto).
* **Afiliado:** Menu lateral com um badge dinâmico de contagem de notificações não lidas e uma aba de Notificações com design personalizado para cada categoria, permitindo marcá-las como lidas.

### 4. Ranking de Afiliados e Gestão de Fotos 🏆
* **Ranking:** Aba de afiliados agora conta com o **"🏆 Ranking dos Melhores Afiliados"**, listando o Top 10 por total de indicações pagas, faturação acumulada e comissões ganhas.
* **Fotos de Perfil:** Adicionada a funcionalidade **"📥 Descarregar Foto"** que gera blobs de download para que o admin guarde as fotos de perfil dos afiliados diretamente no seu sistema.

### 5. Identidade de Marca Vetorial (SVG Inline) 🎨
* Redesenho dos logótipos oficiais em formatos vetoriais de alta definição (`assets/logo-icon.svg` e `assets/logo-full.svg`).
* Inclusão do código SVG *inline* no `index.html` para assegurar compatibilidade absoluta em qualquer navegador, evitando cache quebrada e falhas de renderização.

### 6. Persistência Permanente de Ficheiros e Fotos (MySQL LONGBLOB) 💾 [NOVO]
* **Problema Resolvido:** O Railway possui armazenamento efêmero (os ficheiros locais em `/uploads` eram eliminados a cada nova versão ou reinício do servidor).
* **Solução:** 
  * Criada a tabela `stored_files` na base de dados persistente MySQL (Alwaysdata) com coluna `LONGBLOB`.
  * Toda nova foto de perfil, comprovativo de pagamento e ficheiro anexado é guardado automaticamente na base de dados de forma segura.
  * Criada rota de fallback `GET /uploads/:filename` que, caso o ficheiro não exista fisicamente no disco do contentor do Railway, o recupera automaticamente da base de dados Alwaysdata, grava-o em cache de disco local e serve-o ao utilizador sem qualquer quebra.
* **Edição de Perfil de Afiliado:** Implementado o modal **"✏️ Editar Perfil"** no painel de afiliado com rota de atualização que permite atualizar dados cadastrais e trocar/submeter a foto de perfil.

### 7. Monitorização de Tráfego e Visitas em Tempo Real 📈 [NOVO]
* **Visitas Únicas reais:** Implementada a geração de `visitor_id` no localStorage do cliente, garantindo contagens reais e auditadas de utilizadores únicos.
* **Tempo Real:** Painel administrativo apresenta no topo o número exato de utilizadores ativos que acederam ao site nos últimos 15 minutos (com badge com efeito pulse verde).
* **Agregações por Período:** Monitorização de tráfego por períodos: *Hoje, Últimos 7 Dias, Este Mês e Este Ano*.
* **Taxa de Conversão e Métricas:** Exibe dados de quantos entraram no site, quantos apenas visitaram, quantos fizeram pedidos e quantos avaliaram, além de calcular a taxa de conversão real.
* **Histórico de Tendência:** Tabela com histórico detalhado de visitas, pedidos e conversão dia-a-dia dos últimos 7 dias.

### 8. Painel de Administração Segregado e Privado 🔒 [NOVO]
* **Segurança:** Todo o código HTML, CSS específico e lógica Javascript administrativa foram **completamente removidos** da página pública [index.html](file:///C:/Users/calei/Documents/GitHub/visao_capital/index.html).
* **Link Privado:** Criado o ficheiro [admin.html](file:///C:/Users/calei/Documents/GitHub/visao_capital/admin.html) que serve como o ecrã privado de login e gestão do administrador. O acesso agora faz-se de forma oculta através de `https://visao-capital.vercel.app/admin.html`.
* **Sincronização Absoluta:** Ambos os ficheiros comunicam com a mesma API no Railway e base de dados no Alwaysdata, mantendo as alterações em tempo real perfeitamente integradas.

### 9. Links de Divulgação de Produtos/Serviços de Afiliado (Sem Códigos Manuais) 📦 [NOVO]
* **Geração Automática de Links:** Aba **"Produtos"** adicionada ao menu lateral do afiliado, listando todos os serviços do site com os respetivos links únicos contendo o ID do afiliado (ex: `https://visao-capital.vercel.app/?ref=AF1783602073462&service=service_id`).
* **Botão Copiar Inteligente:** Incluído botão de cópia instantânea com feedback visual de sucesso temporário ("✅ Link Copiado!").
* **Detecção Automática e Redirecionamento:** Quando o utilizador acede com o link de indicação, o site guarda de forma invisível a referência do afiliado (ID) no `localStorage` e abre automaticamente o formulário do serviço de destino.
* **Envio e Resolução Inteligente:** O formulário de solicitação de serviço descarta totalmente o campo do código de afiliado para o cliente final. Na submissão, a API da base de dados resolve o ID recebido para o código de vendas correspondente do afiliado de forma dinâmica, mantendo as estatísticas e comissões sincronizadas de forma invisível e segura.

---

## Como Executar Localmente

### 1. Instalar as dependências
```bash
npm install
```

### 2. Criar ou Reinicializar a Base de Dados
Para recriar as tabelas ou reinicializar os dados padrão se necessário:
```bash
node schema.js
```

### 3. Iniciar o Servidor
```bash
npm start
```
O site estará acessível no browser em `http://localhost:3000`.
