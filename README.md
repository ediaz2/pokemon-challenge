# pokemon

Vista previa de los pokemons [enlace](https://pokemon-ediaz.netlify.app/)

## Requerimientos

- [Node.js](https://nodejs.org/en/) (version 14 o posterior)
- [Npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Instalación

- Instalación de las dependencias

```bash
yarn install # o npm install
```

- Ejecución del proyecto

```bash
yarn serve # o npm run serve
```

- Ejecución de los tests

```bash
yarn test # o npm run test
```

## Librerías / frameworks

- [TailwindCSS](https://tailwindcss.com/)

Escogi este framework por que permite un rapido maquetado y una facilidad de personalización; tambien por que es usando en la web de global66 o uno similar (windicss, unocss, etc).

- vue-snotify
  Agregue la liberia para poder informar al usuario que copio correctamente el texto al portapapeles.
  Tambien hubiera sido valido agregar un efecto de scala al boton de copiar pero opte por snotify para poder experimentar.

## Proceso de desarrollo

### 1. Creación del proyecto

- Inicie con la creacion con `vue-cli`, adicione tailwindcss.
- Modifique el eslintrc. y agregue .prettierrc. para que vscode pueda aplicar los cambios.
- Mofique la rutas para `jest`, para asi tener los archivos de testing al mismo nivel que los archivos de desarrollo.

## 2. Creación de los componentes base y form

- Identifique los componentes base que se van a utilizar.
- Cree los componentes base.
- Decidi importar los componentes con el nombre en base a la ruta, esto permite una facil migracion a nuxt con el autoimport.
- Estos componentes no tiene logica de negocio (nada de vuex), solo son plantillas para crear los componentes que se van a utilizar.

## 3. Store

- Primero cree los servicos que me permitan conectame a la api de pokemon.
- Asi el store tiene la logica para gestinar el estado de los componentes.

## 4. Creación de los componentes de la aplicación

- Cree los componentes en la carpeta `src/components/pokemons`, que corresponden al nombre de la ruta.
- Estos componentes tendran logica de negocio, ya que se van a utilizar en la aplicación.

## 5. Testing

- Cree los tests al final por priorizar una aplicación funcional.

## 6. Despliegue

- Opte por usar el servicio de `netlify` al ser solo frontend.
