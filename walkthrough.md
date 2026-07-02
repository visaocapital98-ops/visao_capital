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
