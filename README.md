# aws-serverless-swapi-nodejs

Reto tecnico, esta aplicacion contiene las APIs basado en los servicios de Star Wars API, para ello se uso lo siguiente NodeJS v18, DynamoDB, Gherkin, Jest, Cucumber, y para la documentacion se uso OpenAPI **people.yml**

## Getting Started

Se implemento las APIs basado en People de SWAPI integrado con DynamoDB:

* POST - https://apiGateway/dev/people
* PATCH - https://apiGateway/dev/people/{id}
* DELETE - https://apiGateway/dev/people/{id}
* GET - https://apiGateway/dev/people/{id}

Integrado con API SWAPI, para obtener la lista de people:

* GET - https://apiGateway/dev/people

### Installing

Para iniciar use el comando:

```bash
npm install
```

### Testing

Para ejecutar las pruebas use el comando:

```bash
npm run test
```

### Deploy

Para desplegar las funciones con serverles use el comando:

```bash
npm run deploy
```

### Undeploy

Para desplegar las funciones con serverles use el comando:

```bash
npm run deploy
```