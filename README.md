# Aplicativo de planejamento de caminho de cobertura para VANTS

Este aplicativo é voltado para planejamento de caminho de cobertura de Veículos Aéreos não Tripulados e monitoramento de lavouras. Permite a criação de conta, cadastro de plantação e planeja o caminho de cobertura da área delimitada pelo usuário (somente áreas em formato de polígono convexo). Possui integração com banco de dados para salvar informações e manter um histórico.


## 🚀 Funcionalidades

- [ ] Multiusuário
- [ ] Cadastro e login de usuários
- [ ] Cadastro de plantações
- [ ] Planejamento de caminho de cobertura de áreas (polígono convexo)
- [ ] Armazenamento de caminho de cobertura 
- [ ] Exibição e histórico de informações de plantações e voo


## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **JavaScript** - Linguagem de programação
- **React Navigation** - Navegação entre telas
- **React Native CLI** - Plataforma de desenvolvimento
- **Redux - Thunk** - Gerenciamento de estados globais
- **Axios** - Requisições HTTP
- **Geolib** - Funções geoespaciais
- **React Native Maps** - Geração e manipulação do mapa
- **Maps SDK** - API Google Maps para renderização do mapa


## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### API para acesso às funcionalidades:
- [API](https://github.com/Giik4/api_projeto)

### Chave própia para uso da API do Google Maps:
- [Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-BR)

### Para desenvolvimento Android e emulação de dispositivo:
- [Android Studio](https://developer.android.com/studio)


## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
```

2. Acesse a pasta do projeto:
```bash
cd nome-do-projeto
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Insira a chave da API em android/app/src/main/AndroidManifest.xml:
```xml
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="SUA_CHAVE_DA_API" />
```


5. Siga o README da API e execute-a em segundo plano


## 🏃‍♂️ Como executar

### Usando Expo:
```bash
npx expo start
```

### Usando React Native CLI:

Android:
```bash
npx react-native run-android
```

### Metro Bundler:
```bash
npx react-native start
```


## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── redux/               # Estados globais
├── geoUtils/            # Funções geoespaciais
├── screens/             # Telas do aplicativo
├── services/            # Serviços e APIs
```


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Giovanni Siervo**
- GitHub: [@Giik4](https://github.com/Giik4)
